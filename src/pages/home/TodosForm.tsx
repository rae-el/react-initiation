import { Box, Button, FormControl, FormControlLabel, MenuItem, Select, Switch, TextField, ThemeProvider } from '@mui/material'
import TodosTable from './TodosTable'
import theme from '../../theme'
import { UserService } from '../../Server/services/Users/UserService';
import React from 'react';
import { UserObject } from '../../Server/server';



function TodosForm() {
  const userService = new UserService();
  const [userList, setUserList] = React.useState<Array<UserObject>>([]);

  React.useEffect(() => {
    userService.getUsers().then((value) => setUserList(value))
  })


  return (
    <ThemeProvider theme={theme}>
        {/* edit form values to reflect api */}
        <Box
        sx={{
            width:'100%',
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
                control={
                    <TextField label='Project' inputMode='text' variant='filled' disabled sx={{width:'20', marginLeft:6, marginBottom:1, marginTop:1}}/>
                    }
                label="Project"
                labelPlacement='start'
                /></Box>
            <Box
            sx={{
                width:'100%',
              }}>
            <FormControlLabel
                control={
                    <Select label='User' sx={{marginLeft:8, marginBottom:1, marginTop:1, minWidth:20}}>
                      {userList.map((user) => (<MenuItem>{user.id}</MenuItem>))}
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
                        sx={{marginLeft:1, marginBottom:1, marginTop:1}}
                    />
                }
                label="Completed"
                labelPlacement='start' /></Box>
            <TodosTable/>
            <Button variant='contained' sx={{color:theme.palette.primary.light}}>Add Task</Button>
        </FormControl></Box>
    </ThemeProvider>
  )
}

export default TodosForm
