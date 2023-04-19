import { ThisTodo, TodoContextType, TodoObject } from "../@types/Todo";
import {UserObject} from "../@types/User";
import { FC, ReactNode, useState, createContext, useEffect } from "react";
import { TodoService } from "../Server/services/ToDos/TodoService";
import { UserService } from "../Server/services/Users/UserService";

export const TodoContext = createContext<TodoContextType | null>(null);

type Props = {children?: ReactNode}

const TodoProvider: FC<Props> = ({children}) => {
    //todos
    const todoService = new TodoService()
    const [todoList, setTodoList] = useState<TodoObject[]>([])
    const [showList, setShowList] = useState<TodoObject[]>([])
    const [userList, setUserList] = useState<UserObject[]>([])
    const [thisTodo, setThisTodo] = useState<ThisTodo | null>(null)
     //users
    const userService = new UserService()
    //dialogs
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    //alerts
    const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
    const [createSuccessAlertOpen, setCreateSuccessAlertOpen] = useState(false)

    //run the api query
    useEffect(() => {
        todoService.getTodos().then((value) => setTodoList(value))
        todoService.getTodos().then((value) => setShowList(value))
        userService.getUsers().then((value) => setUserList(value))
        }, [])

    //todo methods
    const getThisTodo = (id: string) => {
        todoService.getTodoById(id).then((value) => setThisTodo(value))
    }
    const deleteThisTodo = (id: string) => {
        todoService.deleteTodo(id).then((value) => console.log(`Delete" ${value}`))
        setDeleteDialogOpen(false)
    }
    const updateThisTodo = (todo: ThisTodo) => {
        todoService.updateTodo(todo).then((value) => console.log(`Update" ${value}`))
    }
    const createThisTodo = (todo: ThisTodo) => {
        todoService.createTodo(todo).then((value) => console.log(`Create" ${value}`))
    }
    const getTodos = () => {
        todoService.getTodos().then((value) => setTodoList(value))
        todoService.getTodos().then((value) => setShowList(value))
    }
    //delete dialog methods
    const handleDeleteDialog = () =>{
        setDeleteDialogOpen(!deleteDialogOpen)
    }
    

    return <TodoContext.Provider value={{todoList, showList, setShowList, getTodos, thisTodo, getThisTodo, deleteThisTodo, updateThisTodo, createThisTodo, userList, deleteDialogOpen, handleDeleteDialog, deleteAlertOpen, setDeleteAlertOpen, createSuccessAlertOpen, setCreateSuccessAlertOpen}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider