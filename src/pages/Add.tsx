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



function Add() {
  const userService = new UserService()
  const [userList, setUserList] = useState<Array<UserObject>>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedCompletion, setSelectedCompletion] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();
  
  useEffect(() => {
    userService.getUsers().then((value) => setUserList(value))
    //initialize based on passed task data
    setSelectedCompletion('No')
  },[])

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
            Add Task
          </Typography>
          <FormControl>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='Task'
                labelPlacement='start'
                control={<TextField sx={{marginLeft:6.5, marginTop:1, marginBottom:1}}></TextField>}/></Box>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='User' 
                labelPlacement='start'
                control={<Select label='User'
                            value= {selectedUser}
                            onChange={handleSelectUser}
                            ref={inputComponent}
                            renderValue={(value) => value ? value : <em>Select User</em>}
                            sx={{marginLeft:6.5, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
                      {/**user.attributes.get("first-name") solves implicit get error but does not function on web? */}
                      {userList.map((user) => (<MenuItem key={user.id} value={user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}>{user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}</MenuItem>))}
                    </Select>}/></Box>
            <Box sx={{width:'100%'}}>
                <FormControlLabel 
                label='Completed' 
                labelPlacement='start'
                control={<Select label='Completed'
                    value={selectedCompletion}
                    onChange={handleSelectCompletion}
                    sx={{marginLeft:1, marginTop:1, marginBottom:1, minWidth:'220px !important'}}
                            >
                      <MenuItem value={'No'}>No</MenuItem>
                      <MenuItem value={'Yes'}>Yes</MenuItem>
                    </Select>}/></Box>
            <Button variant='contained' sx={{color:theme.palette.primary.light}}>Add</Button>
            <Button onClick={navigateToHome}>Cancel</Button>
          </FormControl>
        </Box>
    </ThemeProvider>
  )
}

export default Add
