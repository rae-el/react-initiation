import { FormEvent, SetStateAction, useContext, useRef, useState } from "react"
import { TodoContext } from "../../../context/todoContext"
import { ThisTodo, TodoContextType} from "../../../@types/Todo"
import theme from "../../../theme"
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
import { faker } from "@faker-js/faker"
import { UserObject } from "../../../@types/User"
import CreateSuccessAlert from "../../ui/alerts/CreateSuccessAlert"
import CreateFailedAlert from "../../ui/alerts/CreateFailedAlert"


const CreateTodo = () => {
  const {userList, createThisTodo, getTodos, setCreateSuccessAlertOpen} = useContext(TodoContext) as TodoContextType
    const navigate = useNavigate()
    const [formData, setFormData] = useState<ThisTodo | {}>()
    const [user, setUser] = useState('')
    const [task, setTask] = useState('')
    const [isCompleted, setIsCompleted] = useState('No')
    const inputComponent = useRef<HTMLInputElement>(null)
    const [taskError, setTaskError] = useState(false)
    const [userError, setUserError] = useState(false)
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
    const handleCreateTodo = (e:FormEvent, formData: ThisTodo | any) => {
        e.preventDefault();
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
      const addUser = user.charAt(0)
      let userObj : UserObject | undefined = undefined;
      userList.map((user) => user.id == addUser ? userObj = user : console.log('skip'))
      const addIsCompleted = isCompleted ? true : false
      const id = faker.datatype.number({ min: 15, max: 1000, precision: 1 }) as unknown as string
      if (userObj){
        const newTodo : ThisTodo = {id:id, isComplete : addIsCompleted, name : addTask, userId : addUser}
        createThisTodo(newTodo);
        //first check if actually successful
        setTask('')
        setUser('')
        setIsCompleted('No')
      }
    }
       
    };
    const navigateToHome = () => {
        navigate('/');
      };
    return (
        <>
            {/* edit form values to reflect api */}
            <Box
            sx={{
              width:'90%',
              margin: '5%',
              }}>
              <Typography variant='h4'>
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
                        onChange={e => setTask(e.target.value)} 
                        value={task}
                        error={taskError}
                        sx={{marginLeft:6.7, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
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
                                sx={{marginLeft:6.7, marginTop:1, marginBottom:1, minWidth:'220px !important'}}>
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
                <Button variant='contained' type='submit' sx={{color:'#fff'}}>Add</Button>
                <Button onClick={navigateToHome}>Back</Button>
              </FormControl>
              </form>
              <CreateSuccessAlert></CreateSuccessAlert>
              <CreateFailedAlert></CreateFailedAlert>
            </Box>
        </>
      );
}
export default CreateTodo;