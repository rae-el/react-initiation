import { Box, FormControl, FormControlLabel, MenuItem, MenuItemClassKey, Select, SelectChangeEvent, Switch, TextField } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import TaskAlt from '@mui/icons-material/TaskAlt'
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import Edit from '@mui/icons-material/Edit'
import theme from '../../theme';
import Button from '@mui/material/Button';
import { TodoService } from '../../Server/services/ToDos/TodoService';
import { TodoObject, UserAttributes } from '../../Server/server';
import { UserService } from '../../Server/services/Users/UserService';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { UserObject } from '../../Server/server';
import Header from '../../components/ui/Header';
import { Link, useNavigate } from 'react-router-dom';
import DeleteAlert from '../../components/ui/DeleteAlert';



function Home() {
  const userService = new UserService()
  const todoService = new TodoService()
  const [userList, setUserList] = useState<Array<UserObject>>([])
  const [todoList, setTodoList] = useState<Array<TodoObject>>([])
  const [todoListCompleted, setTodoListCompleted] = useState<Array<TodoObject>>([])
  const [completedTodos, setTodosCompletedState] = useState(false)
  const changeCompletedState = () => setTodosCompletedState(!completedTodos)
  const [showTodos, setShowTodos] = useState<Array<TodoObject>>([])
  const [selectedUser, setSelectedUser] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  
  useEffect(() => {
    userService.getUsers().then((value) => setUserList(value))
    todoService.getTodos().then((value) => setTodoList(value))
    todoService.getTodosByComplete().then((value) => setTodoListCompleted(value))
    if (completedTodos){
      //throwing because todoListCompleted is null
      //how to check and handle empty array
      setShowTodos(todoListCompleted)
    }else{-
      setShowTodos(todoList)
    }
  })

  function getUserName(id: number){
    let username = ''
    for(let i=0; i<userList.length; i++){
      if(userList[i].id == id){
        username = userList[i].attributes["first-name"] + " " + userList[i].attributes["last-name"]
       return username
      }
    }
  }

  const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select user')
    const {target:{value}, }= event;setSelectedUser(value)
    //console.log(key)
  }

  const handleDelete = () => {
    return (<DeleteAlert/>)
  }

  function filterForCompleted(id: number){
    for (var todoItem of todoList){
      if (todoItem.isComplete){
        todoListCompleted.push(todoItem)
      }
    }
  }

  const navigateToAdd = () => {
    navigate('/add');
  }

  const navigateToEdit = () => {
    navigate('/edit');
  }




  return (
    <ThemeProvider theme={theme}>
        {/* edit form values to reflect api */}
        <Header/>
        <Box
        sx={{
            width:'90%',
            margin: '5%',
            position: 'fixed',
            top: 100,
          }}>
        <FormControl>
            <Box
            sx={{
                width:'100%',
              }}>
            <FormControlLabel
                control={<TextField label='Test Project' inputMode='text' variant='filled' disabled sx={{width:'20', marginLeft:6, marginBottom:1, marginTop:1}}/>}
                label="Project"
                labelPlacement='start'
                /></Box>
            <Box
            sx={{
                width:'100%',
              }}>
            <FormControlLabel
                control={
                    <Select label='User'
                            value= {selectedUser}
                            onChange={handleSelectUser}
                            ref={inputComponent}
                            renderValue={(value) => value ? value : <em>Select User</em>}
                            sx={{marginLeft:8, marginBottom:1, marginTop:1, minWidth:'220px !important'}}>
                      {/**user.attributes.get("first-name") solves implicit get error but does not function on web? */}
                      {userList.map((user) => (<MenuItem key={user.id} value={user.attributes["first-name"] +" "+ user.attributes["last-name"]}>{user.attributes["first-name"] +" "+ user.attributes["last-name"]}</MenuItem>))}
                    </Select>
                }
                label="User"
                labelPlacement='start'/></Box>
            <Box
            sx={{
                width:'100%',
              }}>
            <FormControlLabel
                control={
                    <Switch 
                        //checked = {true}
                        onChange={changeCompletedState}
                        sx={{marginLeft:1, marginBottom:1, marginTop:1}}/>}
                label="Completed"
                labelPlacement='start' /></Box>
            <TableContainer 
            component={Paper}
            className='todos-table-container'
            sx={{height:400, width:'100%'}}
            >
              <Table aria-label="todos table">
                <TableHead className='todos-table-header'
                sx={{backgroundColor:theme.palette.primary.main,
                fontVariant:'small-caps',width:"150%",position:'sticky',top:0, zIndex:1}}>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Completed</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody overflow-y="scroll" sx={{height:'max-content'}}>
                  { todoList.map((todo) => (
                    <TableRow
                      key={todo.id}
                      //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{todo.name}</TableCell>
                      <TableCell>{getUserName(todo.user)}</TableCell>
                      <TableCell><Button key={todo.id} sx={{color:theme.palette.primary.contrastText}}>{todo.isComplete ? <TaskAlt/> : <RadioButtonUnchecked/>}</Button></TableCell>
                      <TableCell><Button onClick={navigateToEdit} key={todo.id} sx={{color:theme.palette.primary.contrastText}}><Edit/></Button></TableCell>
                      <TableCell><Button onClick={handleDelete} key={todo.id} sx={{color:theme.palette.primary.contrastText}}><DeleteOutline/></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={navigateToAdd} variant='contained' sx={{color:theme.palette.primary.light}}>Add Task</Button>
        </FormControl></Box>
    </ThemeProvider>
  )
}

export default Home
