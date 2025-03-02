import { useEffect, useState } from "react";
import { ITodoItem } from "./interfaces/todoList";
import TodoItem from "./components/TodoItem";
import useTodoList from "./hooks/useTodoList";
import _ from "lodash";
import TodoTypeColumn from "./components/TodoTypeColumn";

function App() {
    const { todoList, addTodoList, removeTodoList } = useTodoList();
    const [updatedList, setUpdatedList] = useState<ITodoItem[]>([]);
    const [fruitTypeList, setFruitTypeList] = useState<ITodoItem[]>([]);
    const [vegetableTypeList, setVegetableTypeList] = useState<ITodoItem[]>([]);

    const handleRemoveTodoList = (item: ITodoItem, type: string) => {
        removeTodoList(item);
        setUpdatedList((prev) => [...prev, item]);

        if (type === "Fruit") {
            setFruitTypeList((prev) => [...prev, item]);
        }

        if (type === "Vegetable") {
            setVegetableTypeList((prev) => [...prev, item]);
        }
    };

    const handleItemClick = (item: ITodoItem, type: string) => {
        addTodoList(item);
        setUpdatedList((prev) => prev.filter((vege) => !_.isEqual(vege, item)));

        if (type === "Fruit") {
            setFruitTypeList((prev) => prev.filter((fruit) => !_.isEqual(fruit, item)));
        }

        if (type === "Vegetable") {
            setVegetableTypeList((prev) => prev.filter((vege) => !_.isEqual(vege, item)));
        }
    };

    useEffect(() => {
        let timerId: ReturnType<typeof setTimeout>;

        if (updatedList.length > 0) {
            timerId = setInterval(() => {
                const cloneUpdatedList = [...updatedList];
                const item = cloneUpdatedList.shift();

                if (item) {
                    handleItemClick(item, item.type);
                }
            }, 5000);
        }

        return () => clearInterval(timerId);
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
