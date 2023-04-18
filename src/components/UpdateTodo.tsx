import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { FC, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import theme from "../theme"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { UserService } from "../Server/services/Users/UserService"
import { useNavigate, useParams } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import { TodoService } from "../Server/services/ToDos/TodoService"
import { TodoContextType } from "../@types/Todo"
import { UserItem } from "../@types/User"
import { TodoContext } from "../context/todoContext"

type Props ={
    todoId: number | null
}


const UpdateTodo: FC<Props> = ({todoId}) => {
  const {userList, todo} = useContext(TodoContext) as TodoContextType
  const [showUsers, setShowUsers] = useState<UserItem[]>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [taskName, setTaskName] = useState('')
  const [selectedCompletion, setSelectedCompletion] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  let userItems : UserItem[] = [{id: '0', details: 'No assigned user'}]

  
  useEffect(() => {
    userList?.map((user) => (userItems?.push({id:user.id, details: `${user.id} - ${user.attributes["first-name"]} ${user.attributes["last-name"]}`})))
    setShowUsers(userItems)
    
    if (todo != null){
    setTaskName(todo.name)
    setSelectedCompletion(todo.isComplete ? 'Yes' : 'No')
    let potentialSelectedUser = showUsers?.filter(i => i.id == todo.userId)
    setSelectedUser(potentialSelectedUser[0].details)
    }
})

  
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
            Edit Todo {todoId}
          </Typography>
          
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
            <Button variant='contained' sx={{color:theme.palette.primary.light}}>Save</Button>
            <Button onClick={navigateToHome}>Cancel</Button>
          </FormControl>
        
        </Box>
    </ThemeProvider>
  )
}

export default UpdateTodo
