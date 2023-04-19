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
import { FC, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/ui/Header';
import { useNavigate } from 'react-router-dom';
import DeleteDialog from '../../components/ui/DeleteDialog';
import { TodoContext } from '../../context/todoContext';
import { TodoContextType, TodoObject } from '../../@types/Todo';
import DeleteAlert from '../../components/ui/DeleteAlert';


const Home = () => {
  const {userList, todoList, handleDeleteDialog, deleteDialogOpen, getThisTodo, showList, setShowList} = useContext(TodoContext) as TodoContextType
  const [selectedUser, setSelectedUser] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  var [completedTodos, setCompletedTodos] = useState(false)
  const [deleteId, setDeleteId] = useState('')
  

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

  const handleDelete = (id: string) => {
    console.log(`handleDelete of ${id}`)
    console.log('Dialog open '+deleteDialogOpen)
    setDeleteId(id)
    handleDeleteDialog()
    console.log('Dialog open '+deleteDialogOpen)
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


  const handleEdit = (todo: TodoObject) => {
    getThisTodo(todo.id)
    console.log(todo.id)
    navigate(`/update/${todo.id}`);
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
                              <MenuItem value=''> Allow for all users </MenuItem>
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
                    <TableCell></TableCell>
                    <TableCell>Task</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody overflow-y="scroll" sx={{height:'max-content'}}>
                  { showList.length > 0 ? showList.map((todo) => (
                    <TableRow
                      key={todo.id}
                      //sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    ><TableCell>{todo.isComplete ? <TaskAlt/> : <RadioButtonUnchecked/>}</TableCell>
                      <TableCell>{todo.name}</TableCell>
                      <TableCell>{getUserName(todo.user ?? '')}</TableCell>
                      <TableCell><Button onClick={() => handleEdit(todo)} sx={{color:theme.palette.primary.contrastText}}><Edit/></Button></TableCell>
                      <TableCell><Button onClick={() => handleDelete(todo.id)} sx={{color:theme.palette.primary.contrastText}}><DeleteOutline/></Button></TableCell>
                    </TableRow>
                  )): <TableRow></TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={navigateToAdd} variant='contained' sx={{color:theme.palette.primary.light, marginTop:0.5}}>Add Task</Button>
        </FormControl>
        <DeleteDialog id={deleteId}></DeleteDialog>
        <DeleteAlert></DeleteAlert>
        </Box>
    </ThemeProvider>
  )
}

export default Home
