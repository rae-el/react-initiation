import { FC, FormEvent, SetStateAction, useContext, useRef, useState } from "react"
import { TodoContext } from "../context/todoContext"
import { TodoContextType } from "../@types/Todo"
import { TodoObject, UserObject } from "../Server/server"
import theme from "../theme"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import TextField from "@mui/material/TextField"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

type Props = {
    userList: UserObject[]
}

const CreateTodo: FC<Props> = ({userList}) => {
    const navigate = useNavigate()
    const { createThisTodo } = useContext(TodoContext) as TodoContextType
    const [formData, setFormData] = useState<TodoObject | {}>()
    const [user, setUser] = useState('')
    const [isCompleted, setIsCompleted] = useState('No')
    const inputComponent = useRef<HTMLInputElement>(null)
    const handleForm = (e:FormEvent<HTMLInputElement>): void => {
        setFormData({...formData,
        [e.currentTarget.id]: e.currentTarget.value,
    });
    };
    const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
        const {target:{value}, }= event;setUser(value)
        //console.log(key)
      }
    const handleSelectCompletion = (event: SelectChangeEvent<SetStateAction<string>>) => {
        const {target:{value}, }= event;setIsCompleted(value)
        //console.log(key)
      };
    const handleCreateTodo = (e:FormEvent, formData: TodoObject | any) => {
        e.preventDefault();
        createThisTodo(formData);
    };
    const navigateToHome = () => {
        navigate('/');
      };
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
              <form autoComplete='off' onSubmit={(e) => handleCreateTodo(e, formData)}>
              <FormControl>
                <Box sx={{width:'100%'}}>
                    <FormControlLabel 
                    label='Task'
                    labelPlacement='start'
                    control={<FormControl>
                      <TextField
                        sx={{marginLeft:6.5, marginTop:1, marginBottom:1}}>
                      </TextField>
                    </FormControl>}/></Box>
                <Box sx={{width:'100%'}}>
                    <FormControlLabel 
                    label='User' 
                    labelPlacement='start'
                    control={<FormControl>
                        <Select label='User'
                                value= {user}
                                onChange={handleSelectUser}
                                ref={inputComponent}
                                renderValue={(value) => value ? value : <em>Select User</em>}
                                sx={{marginLeft:6.5, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
                          {userList.map((user) => (<MenuItem key={user.id} value={user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}>{user.id+ ' - '+ user.attributes["first-name"] +" "+ user.attributes["last-name"]}</MenuItem>))}
                        </Select></FormControl>}/></Box>
                <Box sx={{width:'100%'}}>
                    <FormControlLabel 
                    label='Completed' 
                    labelPlacement='start'
                    control={<FormControl><Select 
                        label='Completed'
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
      );
}
export default CreateTodo;