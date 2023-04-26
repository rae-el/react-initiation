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
    const [updatedTodo, setUpdatedTodo] = useState<ThisTodo | null>(null)
    const [updatedName, setUpdatedName] = useState<string>('')
    const [updatedUserId, setUpdatedUserId] = useState<string>('')
    const [updatedCompletion, setUpdatedCompletion] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')
     //users
    const userService = new UserService()
    //dialogs
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    //alerts
    const [deleteSuccessAlertOpen, setDeleteSuccessAlertOpen] = useState(false)
    const [deleteFailedAlertOpen, setDeleteFailedAlertOpen] = useState(false)
    const [createSuccessAlertOpen, setCreateSuccessAlertOpen] = useState(false)
    const [createFailedAlertOpen, setCreateFailedAlertOpen] = useState(false)
    const [updateSuccessAlertOpen, setUpdateSuccessAlertOpen] = useState(false)
    //times
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [date, setDate] = useState<number>(0)
    const [dayString, setDayString] = useState<string>('')
    const [monthString, setMonthString] = useState<string>('')
    

    //run the api query
    useEffect(() => {
        todoService.getTodos().then((value) => setTodoList(value))
        todoService.getTodos().then((value) => setShowList(value))
        userService.getUsers().then((value) => setUserList(value))

        const interval = setInterval(() => {
            setHours(new Date().getHours())
            setMinutes(new Date().getMinutes())
            setDate(new Date().getDate())
            const day = new Date().getDay()
            const month = new Date().getMonth()
            const days : {[propKey: number] : string} = {1:'Mon', 2:'Tue', 3:'Wed', 4:'Thurs', 5:'Fri', 6:'Sat', 7:'Sun'}
            const months : {[propKey: number] : string} = {1:'Jan', 2:'Feb', 3:'March', 4:'April', 5:'May', 6:'June', 7:'July', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'December'}
            setDayString(days[day])
            setMonthString(months[month])
        },  1000)
        return () => clearInterval(interval)
        }, [])

    //todo methods
    const getThisTodo = (id: string) => {
        todoService.getTodoById(id).then((value) => {setThisTodo(value);
            setUpdatedName(value.name);
            setUpdatedCompletion(value.isComplete)
            setUpdatedUserId(value.userId)
            setDeleteId(value.id)
        })
    }
    const deleteThisTodo = (id: string) => {
        todoService.deleteTodo(id).then((value) => deleteAlert(value))
        setDeleteDialogOpen(false)
        //this is throwing
        //getTodos()
        //alert
        setDeleteSuccessAlertOpen(true)
    }
    const updateThisTodo = (todo: ThisTodo) => {
        todoService.updateTodo(todo).then((value) => console.log(`Update ${value}`))
        //this is throwing
        //getTodos()
        //alert
        setUpdateSuccessAlertOpen(true)
    }
    const createThisTodo = (todo: ThisTodo) => {
        todoService.createTodo(todo).then((value) => createAlert(value))
        
       
    }
    const getTodos = () => {
        todoService.getTodos().then((value) => setTodoList(value))
        todoService.getTodos().then((value) => setShowList(value))
    }
    //delete dialog methods
    const handleDeleteDialog = () =>{
        setDeleteDialogOpen(!deleteDialogOpen)
    }

    const deleteAlert = (response: any) => {
        console.log(response)
        if (response == 200){
            getTodos()
            setDeleteSuccessAlertOpen(true)
        }else{
            console.log('delete unsuccessful ' + response)
            setDeleteFailedAlertOpen(true)
        }
    }

    const createAlert = (response: any) => {
        console.log(response)
        if (response == 201){
            getTodos()
            setCreateSuccessAlertOpen(true)
        }else{
            console.log('create unsuccessful ' + response)
            setCreateFailedAlertOpen(true)
        }
    }
    

    return <TodoContext.Provider value={{todoList, showList, setShowList, getTodos, thisTodo, updatedTodo, setUpdatedTodo, updatedName, setUpdatedName, updatedUserId, setUpdatedUserId, updatedCompletion, setUpdatedCompletion, deleteId, setDeleteId, getThisTodo, deleteThisTodo, updateThisTodo, createThisTodo, userList, deleteDialogOpen, handleDeleteDialog, deleteSuccessAlertOpen, setDeleteSuccessAlertOpen, deleteFailedAlertOpen, setDeleteFailedAlertOpen, createSuccessAlertOpen, setCreateSuccessAlertOpen, createFailedAlertOpen, setCreateFailedAlertOpen, updateSuccessAlertOpen, setUpdateSuccessAlertOpen, hours, minutes, date, dayString, monthString}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider