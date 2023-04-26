import { ThisTodo, TodoContextType, TodoObject } from "../@types/Todo";
import {UserObject, UserItem} from "../@types/User";
import { FC, ReactNode, useState, createContext, useEffect } from "react";
import { TodoService } from "../Server/services/ToDos/TodoService";
import { UserService } from "../Server/services/Users/UserService";
import { useNavigate } from "react-router-dom";

export const TodoContext = createContext<TodoContextType | null>(null);

type Props = {children?: ReactNode}

const TodoProvider: FC<Props> = ({children}) => {
    //navigation
    const navigate = useNavigate()
    //todos
    const todoService = new TodoService()
    const [todoList, setTodoList] = useState<TodoObject[]>([])
    const [showList, setShowList] = useState<TodoObject[]>([])
    
    const [thisTodo, setThisTodo] = useState<ThisTodo | null>(null)
    const [updatedTodo, setUpdatedTodo] = useState<ThisTodo | null>(null)
    const [updatedName, setUpdatedName] = useState<string>('')
    const [updatedUserId, setUpdatedUserId] = useState<string>('')
    const [updatedCompletion, setUpdatedCompletion] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')
     //users
    const userService = new UserService()
    const [userList, setUserList] = useState<UserObject[]>([])
    const [userMenuItems, setUserMenuItems] = useState<UserItem[] | []>([])
    //dialogs
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    //alerts
    const [deleteSuccessAlertOpen, setDeleteSuccessAlertOpen] = useState(false)
    const [deleteFailedAlertOpen, setDeleteFailedAlertOpen] = useState(false)
    const [createSuccessAlertOpen, setCreateSuccessAlertOpen] = useState(false)
    const [createFailedAlertOpen, setCreateFailedAlertOpen] = useState(false)
    const [updateSuccessAlertOpen, setUpdateSuccessAlertOpen] = useState(false)
    const [updateFailedAlertOpen, setUpdateFailedAlertOpen] = useState(false)
    //times
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [date, setDate] = useState<number>(0)
    const [dayString, setDayString] = useState<string>('')
    const [monthString, setMonthString] = useState<string>('')
    //device
    const [isMobile, setIsMobile] = useState(false)
    

    //run the api query
    useEffect(() => {
        todoService.getTodos().then((value) => setTodoList(value))
        todoService.getTodos().then((value) => setShowList(value))
        userService.getUsers().then((value) => setUserList(value))
        determineDevice()
        

        const interval = setInterval(() => {
            setHours(new Date().getHours())
            setMinutes(new Date().getMinutes())
            setDate(new Date().getDate())
            const day = new Date().getDay()
            const month = new Date().getMonth()
            const days : {[propKey: number] : string} = {1:'Mon', 2:'Tue', 3:'Wed', 4:'Thurs', 5:'Fri', 6:'Sat', 7:'Sun'}
            const fullDays:  {[propKey: number] : string} = {1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday', 7:'Sunday'}
            const months : {[propKey: number] : string} = {1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'June', 7:'Jul', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'Dec'}
            const fullMonths : {[propKey: number] : string} = {1:'January', 2:'February', 3:'March', 4:'April', 5:'May', 6:'June', 7:'July', 8:'August', 9:'September', 10:'October', 11:'November', 12:'December'}
            if (isMobile){
                setDayString(fullDays[day])
                setMonthString(fullMonths[month])
            }else{
                setDayString(days[day])
                setMonthString(months[month]) 
            }
        },  1000)
        return () => clearInterval(interval)
        }, [])

        useEffect(() =>{
            getUserItems()
        })

    const determineDevice = () =>{
        let device = navigator.userAgent
        console.log(device)
        let mobileRegex = [/(Android)(.+)(Mobile)/i, /BlackBerry/i, /iPhone|iPod/i, /Opera Mini/i, /IEMobile/i]
        setIsMobile(mobileRegex.some((b) => device.match(b)))
        console.log('Is Mobile? ' + isMobile)
    }

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
        todoService.updateTodo(todo).then((value) => updateAlert(value))
    }

    const createThisTodo = (todo: ThisTodo) => {
        todoService.createTodo(todo).then((value) => createAlert(value))   
    }

    const getTodos = () => {
        todoService.getTodos().then((value) => setTodoList(value))
        todoService.getTodos().then((value) => setShowList(value))
    }

    const getUserItems = () => {
        let userItems : UserItem[] = [{id: '0', details: 'No assigned user'}]
        userList?.map((user) => (userItems?.push({id:user.id, details: `${user.id} - ${user.attributes["first-name"]} ${user.attributes["last-name"]}`})))
        setUserMenuItems(userItems)
    }

    //delete dialog methods
    const handleDeleteDialog = () =>{
        setDeleteDialogOpen(!deleteDialogOpen)
    }

    const deleteAlert = (response: any) => {
        console.log(response)
        if (response == 200){
            setDeleteSuccessAlertOpen(true)
            setTimeout(()=>{
                setDeleteSuccessAlertOpen(false)
              }, 10000)
            getTodos()
        }else{
            console.log('delete unsuccessful ' + response)
            setDeleteFailedAlertOpen(true)
            setTimeout(()=>{
                setDeleteFailedAlertOpen(false)
              }, 10000)
        }
    }

    const updateAlert = (response: any) =>{
        console.log(response)
        if (response == 200){
            //navigate home
            navigate('/')
            //the get todos is throwing here?
            getTodos()
            setUpdateSuccessAlertOpen(true)
            setTimeout(()=>{
                setUpdateSuccessAlertOpen(false)
              }, 10000)
        }else{
            console.log('update unsuccessful ' + response)
            setUpdateFailedAlertOpen(true)
            setTimeout(()=>{
                setUpdateFailedAlertOpen(false)
              }, 10000)
        }
    }

    const createAlert = (response: any) => {
        console.log(response)
        if (response == 201){
            getTodos()
            setCreateSuccessAlertOpen(true)
            setTimeout(()=>{
                setCreateSuccessAlertOpen(false)
              }, 10000)
        }else{
            console.log('create unsuccessful ' + response)
            setCreateFailedAlertOpen(true)
            setTimeout(()=>{
                setCreateFailedAlertOpen(false)
              }, 10000)
        }
    }
    

    return <TodoContext.Provider value={{isMobile, todoList, showList, setShowList, getTodos, thisTodo, updatedTodo, setUpdatedTodo, updatedName, setUpdatedName, updatedUserId, setUpdatedUserId, updatedCompletion, setUpdatedCompletion, deleteId, setDeleteId, getThisTodo, deleteThisTodo, updateThisTodo, createThisTodo, userList, userMenuItems, deleteDialogOpen, handleDeleteDialog, deleteSuccessAlertOpen, setDeleteSuccessAlertOpen, deleteFailedAlertOpen, setDeleteFailedAlertOpen, createSuccessAlertOpen, setCreateSuccessAlertOpen, createFailedAlertOpen, setCreateFailedAlertOpen, updateSuccessAlertOpen, setUpdateSuccessAlertOpen, updateFailedAlertOpen, setUpdateFailedAlertOpen, hours, minutes, date, dayString, monthString}}>
        {children}
    </TodoContext.Provider>
}

export default TodoProvider