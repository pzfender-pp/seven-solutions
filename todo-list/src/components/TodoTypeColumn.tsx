import { ReactNode } from "react";

interface TodoTypeColumnProps {
    title: string;
    children: ReactNode;
}

const TodoTypeColumn = (props: TodoTypeColumnProps) => {
    const { title, children } = props;

    return (
        <div className="border border-neutral-200">
            <div className="bg-slate-100 border-b border-slate-100 h-12 flex items-center justify-center font-bold">
                {title}
            </div>
            <div className="p-2 flex flex-col gap-2">{children}</div>
        </div>
    );
};
export default TodoTypeColumn;
