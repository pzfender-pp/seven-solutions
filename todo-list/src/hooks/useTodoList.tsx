import { useState } from "react";
import { ITodoItem } from "../interfaces/todoList";
import _ from "lodash";

const initTodoList = [
    {
        type: "Fruit",
        name: "Apple",
    },
    {
        type: "Vegetable",
        name: "Broccoli",
    },
    {
        type: "Vegetable",
        name: "Mushroom",
    },
    {
        type: "Fruit",
        name: "Banana",
    },
    {
        type: "Vegetable",
        name: "Tomato",
    },
    {
        type: "Fruit",
        name: "Orange",
    },
    {
        type: "Fruit",
        name: "Mango",
    },
    {
        type: "Fruit",
        name: "Pineapple",
    },
    {
        type: "Vegetable",
        name: "Cucumber",
    },
    {
        type: "Fruit",
        name: "Watermelon",
    },
    {
        type: "Vegetable",
        name: "Carrot",
    },
];

const useTodoList = () => {
    const [todoList, setTodoList] = useState(initTodoList);

    const addTodoList = (item: ITodoItem) => {
        setTodoList((prev) => [...prev, item]);
    };

    const removeTodoList = (item: ITodoItem) => {
        setTodoList((prev) => prev.filter((todo) => todo.name !== item.name));
    };

    return { todoList, addTodoList, removeTodoList };
};

export default useTodoList;
