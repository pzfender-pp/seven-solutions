import { ITodoItem } from "../interfaces/todoList";

interface TodoItemProps {
    type: string;
    name: string;
    onClick: (item: ITodoItem, type: string) => void;
}

const TodoItem = (props: TodoItemProps) => {
    const { type, name, onClick } = props;

    return (
        <div
            className="w-full border border-neutral-100 h-[50px] flex items-center justify-center hover:bg-neutral-100 cursor-pointer select-none"
            onClick={() => onClick({ type, name }, type)}
        >
            {name}
        </div>
    );
};
export default TodoItem;
