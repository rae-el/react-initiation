import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { SetStateAction, useEffect, useRef, useState } from "react"
import theme from "../theme"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { UserService } from "../Server/services/Users/UserService"
import { UserObject } from "../Server/server"
import { useNavigate } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import { request } from "http"
import { Http2ServerRequest } from "http2"
import { TodoService } from "../Server/services/ToDos/TodoService"
import { faker } from "@faker-js/faker"



function Add() {
  const userService = new UserService()
  const todoService = new TodoService()
  const navigate = useNavigate()
  const [userList, setUserList] = useState<Array<UserObject>>([])
  const [task, setTask] = useState('')
  const [taskError, setTaskError] = useState(false)
  const [user, setUser] = useState('')
  const [userError, setUserError] = useState(false)
  const [isCompleted, setIsCompleted] = useState('No')
  const inputComponent = useRef<HTMLInputElement>(null)
  
  
  useEffect(() => {
    userService.getUsers().then((value) => setUserList(value))
    
  },[])

  const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
    const {target:{value}, }= event;setUser(value)
    //console.log(key)
  }

  const handleSelectCompletion = (event: SelectChangeEvent<SetStateAction<string>>) => {
    const {target:{value}, }= event;setIsCompleted(value)
    //console.log(key)
  }

  const handleAddTask = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setTaskError(false)
    setUserError(false)

    if(task == ''){
      setTaskError(true)
    }
    if(user == ''){
      setUserError(true)
    }
    if(task != '' && user != ''){
      //add task error catching
      const addTask = task
      const addUser = user.charAt(0) as unknown as number
      const addIsCompleted = isCompleted ? true : false
      const id = faker.datatype.number({ min: 15, max: 1000, precision: 1 })
      const addRequestBody = {'id': id, 'name':addTask, 'isComplete':addIsCompleted, 'user':addUser}
      const added = todoService.createTodo(addRequestBody)
      if (added != null){
        alert('Success')
        setTask('')
        setUser('')
        setIsCompleted('No')
      }
    }
    
    
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
            Add Task
          </Typography>
          <form autoComplete='off' onSubmit={handleAddTask}>
          <FormControl>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='Task'
                labelPlacement='start'
                control={<FormControl>
                  <TextField 
                    onChange={e => setTask(e.target.value)} 
                    value={task}
                    error={taskError}
                    sx={{marginLeft:6.5, marginTop:1, marginBottom:1}}>
                  </TextField>
                </FormControl>}/></Box>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='User' 
                labelPlacement='start'
                control={<FormControl><Select label='User'
                            value= {user}
                            onChange={handleSelectUser}
                            ref={inputComponent}
                            renderValue={(value) => value ? value : <em>Select User</em>}
                            sx={{marginLeft:6.5, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
                      {/**user.attributes.get("first-name") solves implicit get error but does not function on web? */}
                      {userList.map((user) => (<MenuItem key={user.id} value={user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}>{user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}</MenuItem>))}
                    </Select></FormControl>}/></Box>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='Completed' 
                labelPlacement='start'
                control={<FormControl><Select label='Completed'
                    value={isCompleted}
                    onChange={handleSelectCompletion}
                    sx={{marginLeft:1, marginTop:1, marginBottom:1, minWidth:'220px !important'}}
                            >
                      <MenuItem value={'No'}>No</MenuItem>
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                    </Select></FormControl>}/></Box>
            <Button variant='contained' type='submit' sx={{color:theme.palette.primary.light}}>Add</Button>
            <Button onClick={navigateToHome}>Cancel</Button>
          </FormControl>
          </form>
        </Box>
    </ThemeProvider>
  )
}

export default Add
