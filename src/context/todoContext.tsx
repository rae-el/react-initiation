import { TodoContextType, TodoObject } from "../@types/Todo";
import { FC, ReactNode, useState, createContext } from "react";
import { TodoService } from "../Server/services/ToDos/TodoService";

export const TodoContext = createContext<TodoContextType | null>(null);

type Props = {children?: ReactNode}

const TodoProvider: FC<Props> = ({children}) => {
    const todoService = new TodoService()
    const [todoList, setTodoList] = useState<TodoObject[]>([])
    const [todo, setTodo] = useState<TodoObject | null>(null)
    const [deleteSuccess, setDeleteSuccess] = useState('')
    const [updateSuccess, setUpdateSuccess] = useState('')
    const [createSuccess, setCreateSuccess] = useState('')
    todoService.getTodos().then((value) => setTodoList(value))

    const getThisTodo = (id: string) => {
        todoService.getTodoById(id).then((value) => setTodo(value))
    }
    const deleteThisTodo = (id: number) => {
        todoService.deleteTodo(id).then((value) => setDeleteSuccess(value))
    }
    const updateThisTodo = (todo: TodoObject) => {
        todoService.updateTodo(todo).then((value) => setUpdateSuccess(value))
    }
    const createThisTodo = (todo: TodoObject) => {
        todoService.createTodo(todo).then((value) => setCreateSuccess(value))
    }

    return <TodoContext.Provider value={{todoList, todo, getThisTodo, deleteThisTodo, updateThisTodo, createThisTodo}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider