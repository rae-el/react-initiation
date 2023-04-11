import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { SetStateAction, useEffect, useRef, useState } from "react"
import theme from "../theme"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { UserService } from "../Server/services/Users/UserService"
import { UserObject } from "../Server/server"
import { useNavigate } from "react-router-dom"



function Add() {
  const userService = new UserService()
  const [userList, setUserList] = useState<Array<UserObject>>([])
  const [selectedUser, setSelectedUser] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  
  useEffect(() => {
    userService.getUsers().then((value) => setUserList(value))
  })

  const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select user')
    const {target:{value}, }= event;setSelectedUser(value)
    //console.log(key)
  }

  const handleSelectCompletion = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select completion')
    const {target:{value}, }= event;setSelectedUser(value)
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
            Add Todo
          </Typography>
          <FormControl>
            <FormLabel>Task</FormLabel>
            <TextField></TextField>
            <FormLabel>User</FormLabel>
            <Select label='User'
                            value= {selectedUser}
                            onChange={handleSelectUser}
                            ref={inputComponent}
                            renderValue={(value) => value ? value : <em>Select User</em>}>
                      {/**user.attributes.get("first-name") solves implicit get error but does not function on web? */}
                      {userList.map((user) => (<MenuItem key={user.id} value={user.attributes["first-name"] +" "+ user.attributes["last-name"]}>{user.attributes["first-name"] +" "+ user.attributes["last-name"]}</MenuItem>))}
                    </Select>
            <FormLabel>Completed</FormLabel>
            <Select label='Completed'
                            >
                      <MenuItem value={'No'}>No</MenuItem>
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                    </Select>
            <Button>Add</Button>
            <Button onClick={navigateToHome}>Cancel</Button>
          </FormControl>
        </Box>
    </ThemeProvider>
  )
}

export default Add
