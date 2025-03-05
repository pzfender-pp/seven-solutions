import { useEffect, useState } from "react";
import { ITodoItem } from "./interfaces/todoList";
import TodoItem from "./components/TodoItem";
import useTodoList from "./hooks/useTodoList";
import TodoTypeColumn from "./components/TodoTypeColumn";
import moment from "moment";

function App() {
    const { todoList, addTodoList, removeTodoList } = useTodoList();
    const [updatedList, setUpdatedList] = useState<ITodoItem[]>([]);
    const [fruitTypeList, setFruitTypeList] = useState<ITodoItem[]>([]);
    const [vegetableTypeList, setVegetableTypeList] = useState<ITodoItem[]>([]);

    const handleRemoveTodoList = (item: ITodoItem, type: string) => {
        const newItem = { ...item, expiredTimestamp: moment().add(5, "second") };

        removeTodoList(newItem);
        setUpdatedList((prev) => [...prev, newItem]);

        if (type === "Fruit") {
            setFruitTypeList((prev) => [...prev, newItem]);
        }

        if (type === "Vegetable") {
            setVegetableTypeList((prev) => [...prev, newItem]);
        }
    };

    const handleItemClick = (item: ITodoItem, type: string) => {
        addTodoList(item);
        setUpdatedList((prev) => prev.filter((update) => update.name !== item.name));

        if (type === "Fruit") {
            setFruitTypeList((prev) => prev.filter((fruit) => fruit.name !== item.name));
        }

        if (type === "Vegetable") {
            setVegetableTypeList((prev) => prev.filter((vege) => vege.name !== item.name));
        }
    };

    useEffect(() => {
        if (updatedList.length === 0) return;

        const now = moment();
        const timeouts: ReturnType<typeof setTimeout>[] = [];

        updatedList.forEach((item) => {
            const delay = item && item.expiredTimestamp ? item.expiredTimestamp.diff(now, "millisecond") : 0;

            const timeoutId = setTimeout(() => {
                handleItemClick(item, item.type);
                setUpdatedList((prev) => prev.filter((i) => i.name !== item.name));
            }, Math.max(delay, 0));

            timeouts.push(timeoutId);
        });

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [updatedList]);

    return (
        <main className="grid grid-cols-3 gap-4 p-6 w-full h-screen overflow-hidden max-w-[1000px] mx-auto">
            <div className="w-full min-h-[calc(100vh-48px)] flex flex-col gap-2 overflow-auto items-start">
                {todoList.length > 0 &&
                    todoList.map((todo) => (
                        <TodoItem key={todo.name} type={todo.type} name={todo.name} onClick={handleRemoveTodoList} />
                    ))}
            </div>
            <TodoTypeColumn title="Fruit">
                {fruitTypeList.length > 0 &&
                    fruitTypeList.map((fruit) => (
                        <TodoItem key={fruit.name} type={fruit.type} name={fruit.name} onClick={handleItemClick} />
                    ))}
            </TodoTypeColumn>
            <TodoTypeColumn title="Vegetable">
                {vegetableTypeList.length > 0 &&
                    vegetableTypeList.map((vege) => (
                        <TodoItem key={vege.name} type={vege.type} name={vege.name} onClick={handleItemClick} />
                    ))}
            </TodoTypeColumn>
        </main>
    );
}

export default App;
