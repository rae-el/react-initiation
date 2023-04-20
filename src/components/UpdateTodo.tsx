import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { FC, FormEvent, SetStateAction, useContext, useDeferredValue, useEffect, useRef, useState } from "react"
import theme from "../theme"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import { ThisTodo, TodoContextType } from "../@types/Todo"
import { UserItem } from "../@types/User"
import { TodoContext } from "../context/todoContext"
import DeleteDialog from "./ui/DeleteDialog"
import DeleteAlert from "./ui/DeleteAlert"
import IconButton from "@mui/material/IconButton"
import DeleteOutline from '@mui/icons-material/DeleteOutline'

type Props ={
    todoId: number | null
}

const UpdateTodo: FC<Props> = ({todoId}) => {
  const {userList, thisTodo, handleDeleteDialog, deleteDialogOpen} = useContext(TodoContext) as TodoContextType
  const [showUsers, setShowUsers] = useState<UserItem[]>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [taskName, setTaskName] = useState('')
  const [selectedCompletion, setSelectedCompletion] = useState('')
  const [stringId, setStringId] = useState('')
  const [ogUser, setOgUser] = useState('')
  const [ogName, setOgName] = useState('')
  const [ogCompletion, setOgCompletion] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState('')

  let userItems : UserItem[] = [{id: '0', details: 'No assigned user'}]

  useEffect(() => {
    userList?.map((user) => (userItems?.push({id:user.id, details: `${user.id} - ${user.attributes["first-name"]} ${user.attributes["last-name"]}`})))
    setShowUsers(userItems)
    if (thisTodo != null){
      setOgName(thisTodo.name)
      setOgCompletion(thisTodo.isComplete ? 'Yes' : 'No')
      let potentialOgUser = showUsers?.filter(i => i.id == thisTodo.userId)
      setOgUser(potentialOgUser[0].details)
      setStringId(thisTodo.id)
    }
    setDeleteId(stringId)
    setTaskName(ogName)
    setSelectedCompletion(ogCompletion)
    setSelectedUser(ogUser)})

  
  const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select user')
    const {target:{value}, }= event;setSelectedUser(value)
    //console.log(key)
  }

  const handleSelectCompletion = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select completion')
    const {target:{value}, }= event;setSelectedCompletion(value)
    //console.log(key)
  }

  const navigateToHome = () => {
    navigate('/');
  }

  const handleUpdateTodo = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const updatedCompletion = selectedCompletion ? true : false
    const thisId = todoId as unknown as string
    if(taskName != ''){
      const updatedTodo : ThisTodo = {id:thisId, isComplete:updatedCompletion, name: taskName, userId:selectedUser}
    }
  }

  const handleDelete = (id: string) => {
    console.log(`handleDelete of ${id}`)
    console.log('Dialog open '+deleteDialogOpen)
    setDeleteId(id)
    handleDeleteDialog()
    console.log('Dialog open '+deleteDialogOpen)
  }

  return (
    <ThemeProvider theme={theme}>
        {/* edit form values to reflect api */}
        <Box
        sx={{
            width:'90%',
            margin: '5%',
            position: 'fixed',
            top: 100,
          }}>
          <Typography variant='h3'>
            Edit Task {stringId}
          </Typography>
          <form autoComplete="off" onSubmit={(e) => handleUpdateTodo(e)}>
          <FormControl>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='Task'
                labelPlacement='start'
                control={<FormControl><TextField value={taskName} sx={{marginLeft:6.5, marginTop:1, marginBottom:1}}></TextField></FormControl>}/></Box>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='User' 
                labelPlacement='start'
                control={<FormControl><Select label='User'
                            value= {selectedUser}
                            onChange={handleSelectUser}
                            ref={inputComponent}
                            renderValue={(value) => value ? value : <em>Select User</em>}
                            sx={{marginLeft:6.5, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
                      {showUsers?.map((user) => (<MenuItem key={user.id} value={user.details}>{user.details}</MenuItem>))}
                    </Select></FormControl>}/></Box>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='Completed' 
                labelPlacement='start'
                control={<FormControl><Select label='Completed'
                    value={selectedCompletion}
                    onChange={handleSelectCompletion}
                    sx={{marginLeft:1, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
                      <MenuItem value={'No'}>No</MenuItem>
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                    </Select></FormControl>}/></Box>
                    <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}><Button onClick={() => handleDelete(deleteId)} variant='outlined' sx={{color:theme.palette.primary.contrastText, marginBottom:3, borderColor:theme.palette.primary.contrastText, width:100}}><DeleteOutline/> Delete </Button></Box>
            <Button variant='contained' type='submit' sx={{color:theme.palette.primary.light}}>Save</Button>
            <Button onClick={navigateToHome}>Cancel</Button>
          </FormControl>
          </form>
          <DeleteDialog id={deleteId}></DeleteDialog>
        </Box>
    </ThemeProvider>
  )
}

export default UpdateTodo
