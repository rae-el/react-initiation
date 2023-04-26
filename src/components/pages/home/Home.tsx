import { Box, FormControl, FormControlLabel, IconButton, MenuItem, MenuItemClassKey, Select, SelectChangeEvent, Switch, TextField, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked'
import AddCircle from '@mui/icons-material/AddCircle'
import TaskAlt from '@mui/icons-material/TaskAlt'

import theme from '../../../theme';
import { FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../../context/todoContext';
import { TodoContextType, TodoObject } from '../../../@types/Todo';
import DeleteDialog from '../../ui/dialogs/DeleteDialog';
import DeleteSuccessAlert from '../../ui/alerts/DeleteSuccessAlert';


const Home = () => {
  const {userList, todoList, getThisTodo, showList, setShowList, hours, minutes, date, dayString, monthString} = useContext(TodoContext) as TodoContextType
  const [selectedUser, setSelectedUser] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  var [completedTodos, setCompletedTodos] = useState(false)



  function getUserName(id: string){
    let username = ''
    for(let i=0; i<userList.length; i++){
      if(userList[i].id == id){
        username = userList[i].attributes["first-name"] + " " + userList[i].attributes["last-name"]
        //username = userList[i].attributes.get('first-name') + " " + userList[i].attributes.get('last-name')
       return username
      }
    }
  }

  const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
    // get target
    const {target:{value}, }= event
    setSelectedUser(value)
    if (value != ''){
      const stringValue = value as String
      const userId = stringValue.charAt(0)

      //filter list based on user & completed state
      if (completedTodos){
        let filteredArray = todoList.filter(todo => todo.user == userId && todo.isComplete == true)
        setShowList(filteredArray)
      }else{
        let filteredArray = todoList.filter(todo => todo.user == userId)
        setShowList(filteredArray)
      }
    }else{
      //filter list based on user & completed state
      if (completedTodos){
        let filteredArray = todoList.filter(todo => todo.isComplete == true)
        setShowList(filteredArray)
      }else{
        setShowList(todoList)
      }
    }
  }



  const handleCompletedState = () => {
    //set completed state
    completedTodos = !completedTodos
    setCompletedTodos(completedTodos)

    if (completedTodos){
    if (selectedUser == ''){
      let filteredArray = todoList.filter(todo => todo.isComplete == true)
      setShowList(filteredArray)
    }else{
      const userId = selectedUser.charAt(0)
      let filteredArray = todoList.filter(todo => todo.isComplete == true && todo.user == userId)
      setShowList(filteredArray)
    }}else{
      if (selectedUser == ''){
        setShowList(todoList)
      }else{
        const userId = selectedUser.charAt(0)
        let filteredArray = todoList.filter(todo => todo.user == userId)
        setShowList(filteredArray)
      }
    }
  }


  const handleEdit = (todo: string) => {
    getThisTodo(todo)
    navigate(`/update/${todo}`);
  }

  const navigateToAdd = () => {
    navigate('/create');
  }


  return (
    <ThemeProvider theme={theme}>
        {/* edit form values to reflect api */}
        <Header/>
        
        <Box
        sx={{
            margin: '5%',
          }}>
          <Box sx={{display:'flex', flexWrap:'no-wrap', justifyContent:'space-between'}}>
            <Box sx={{
                display:'flex'
                }}>
              <FormControl>
                  <Box
                  sx={{
                      width:'100%',
                    }}>
                  <FormControlLabel
                      control={<TextField label='Test Project' inputMode='text' disabled sx={{width:'130px !important', marginLeft:6, marginBottom:'5px', marginTop:''}}/>}
                      label="Project"
                      labelPlacement='start'
                      sx={{color:theme.palette.primary.contrastText}}
                      />
                  </Box>
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
                                  sx={{marginLeft:8.1, marginBottom:'', marginTop:'', minWidth:'130px !important'}}>
                                    <MenuItem value=''> All users </MenuItem>
                            {userList.map((user) => (<MenuItem key={user.id} value={user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}>{user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}</MenuItem>))}
                            {/*userList.map((user) => (<MenuItem key={user.id} value={user.id+ ' - '+ user.attributes.get('first-name') +" "+ user.attributes.get('last-name')}>{user.id+ ' - '+ user.attributes.get('first-name') +" "+ user.attributes.get('last-name')}</MenuItem>))*/}
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
                              onChange={handleCompletedState}
                              sx={{marginLeft:1, marginBottom:1, marginTop:1}}/>}
                              label="Completed"
                              labelPlacement='start' />
                  </Box>
                  </FormControl>
                </Box>
                <Box>
                  <Box sx={{width:'70px', display:'flex', alignItems:'center', flexDirection:'column', justifyItems:'center'}}>
                    <Typography sx={{fontWeight:600}}>{dayString}</Typography>
                    <Typography variant='h4' sx={{color:theme.palette.primary.dark, fontWeight:600}}>{date}</Typography>
                    <Typography sx={{fontWeight:600, fontVariant:'small-caps',}}>{monthString}</Typography>
                    <Box sx={{display:'flex'}}>
                      <Typography >
                        {hours} : {minutes < 10 ? '0'+minutes : minutes}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            <Box 
            sx={{
                width:'100%',
                display: 'inline-flex',
                alignItems: 'center'
              }}>
              <IconButton onClick={navigateToAdd} sx={{color:theme.palette.primary.main, fontWeight:'bold', marginLeft:1}}><AddCircle/></IconButton>
              <Typography sx={{position: 'relative', fontWeight:600}}>add a new task</Typography>
            </Box>
            <DeleteSuccessAlert></DeleteSuccessAlert>
            <TableContainer 
            component={Paper}
            className='todos-table-container'
            sx={{width:'100%'}} >
              <Table aria-label="todos table">
                <TableHead className='todos-table-header'
                sx={{
                fontVariant:'small-caps',
                fontSize: '3rem !important',
                backgroundColor: theme.palette.secondary.light,
                position:'sticky',
                top:0,
                zIndex:1}}>
                  <TableRow >
                    <TableCell></TableCell>
                    <TableCell sx={{fontWeight:'700 !important', fontSize:'1.1rem'}}>Task</TableCell>
                    <TableCell sx={{fontWeight:'700 !important', fontSize:'1.1rem'}}>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{height:'max-content'}}>
                  { showList.length > 0 ? showList.map((todo) => (
                    <TableRow
                      key={todo.id}
                      hover={true}
                      onClick={() => handleEdit(todo.id)}
                      sx={{cursor:'pointer'}}
                      //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    ><TableCell>{todo.isComplete ? <TaskAlt sx={{color:theme.palette.success.main}}/> : <RadioButtonUnchecked sx={{color:theme.palette.secondary.contrastText}}/>}</TableCell>
                      <TableCell>{todo.name}</TableCell>
                      <TableCell>{getUserName(todo.user ?? '')}</TableCell>
                    </TableRow>
                  )): <TableRow></TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
                  

        
        </Box>
    </ThemeProvider>
  )
}

export default Home