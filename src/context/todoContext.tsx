import { TodoContextType, TodoObject } from "../@types/Todo";
import {UserObject} from "../@types/User";
import { FC, ReactNode, useState, createContext } from "react";
import { TodoService } from "../Server/services/ToDos/TodoService";
import { UserService } from "../Server/services/Users/UserService";

export const TodoContext = createContext<TodoContextType | null>(null);

type Props = {children?: ReactNode}

const TodoProvider: FC<Props> = ({children}) => {
    //todos
    const todoService = new TodoService()
    const [todoList, setTodoList] = useState<TodoObject[]>([])
    const [userList, setUserList] = useState<UserObject[]>([])
    const [todo, setTodo] = useState<TodoObject | null>(null)
    todoService.getTodos().then((value) => setTodoList(value))
    //users
    const userService = new UserService()
    userService.getUsers().then((value) => setUserList(value))

    //todo methods
    const getThisTodo = (id: string) => {
        todoService.getTodoById(id).then((value) => setTodo(value))
    }
    const deleteThisTodo = (id: number) => {
        todoService.deleteTodo(id).then((value) => console.log(`Delete" ${value}`))
    }
    const updateThisTodo = (todo: TodoObject) => {
        todoService.updateTodo(todo).then((value) => console.log(`Update" ${value}`))
    }
    const createThisTodo = (todo: TodoObject) => {
        todoService.createTodo(todo).then((value) => console.log(`Create" ${value}`))
    }

    
    

    return <TodoContext.Provider value={{todoList, todo, getThisTodo, deleteThisTodo, updateThisTodo, createThisTodo, userList}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider