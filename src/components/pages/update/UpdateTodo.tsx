import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { FC, FormEvent, SetStateAction, useContext, useEffect, useRef, useState } from "react"
import theme from "../../../theme"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { useNavigate } from "react-router-dom"
import FormControlLabel from "@mui/material/FormControlLabel"
import { ThisTodo, TodoContextType } from "../../../@types/Todo"
import { UserItem } from "../../../@types/User"
import { TodoContext } from "../../../context/todoContext"
import DeleteDialog from "../../ui/dialogs/DeleteDialog"
import DeleteOutline from '@mui/icons-material/DeleteOutline'
import UpdateFailedAlert from "../../ui/alerts/UpdateFailedAlert"
import DeleteFailedAlert from "../../ui/alerts/DeleteFailedAlert"
import { CircularProgress } from "@mui/material"


type Props ={
    todoId: string | null
}

const UpdateTodo: FC<Props> = ({todoId}) => {
  const {handleDeleteDialog, deleteDialogOpen, deleteId, setDeleteId, updatedName, updatedUserId, updatedCompletion, setUpdatedName, setUpdatedUserId, setUpdatedCompletion, updateThisTodo, userMenuItems} = useContext(TodoContext) as TodoContextType
  const [showUsers, setShowUsers] = useState<UserItem[]>([])
  const [selectedUser, setSelectedUser] = useState('')
  const [taskName, setTaskName] = useState('')
  const [selectedCompletion, setSelectedCompletion] = useState('')
  const [stringId, setStringId] = useState('')
  const inputComponent = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  useEffect(() => {
      setShowUsers(userMenuItems)
      setSelectedCompletion(updatedCompletion ? 'Yes' : 'No')
      if(updatedName != ''){
        setTaskName(updatedName)
      }
      if(updatedUserId != ''){
        let potentialUser = showUsers?.filter(i => i.id == updatedUserId)
        setSelectedUser(potentialUser[0].details)
      }
    
})

  
  const handleSelectUser = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select user')
    const {target:{value}, }= event;setUpdatedUserId(value.toString().charAt(0))
    //console.log(key)
  }

  const handleSelectCompletion = (event: SelectChangeEvent<SetStateAction<string>>) => {
    console.log('handle select completion')
    const {target:{value}, }= event;setUpdatedCompletion(value ? true : false)
    //console.log(key)
  }

  const navigateToHome = () => {
    navigate('/');
  }

  const handleUpdateTodo = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(taskName != ''){
      const updatedTodo : ThisTodo = {id:deleteId, isComplete:updatedCompletion, name: taskName, userId:updatedUserId}
      updateThisTodo(updatedTodo)
      
    }
  }

  const handleDelete = (id: string) => {
    console.log(`handleDelete of ${id}`)
    console.log('Dialog open '+deleteDialogOpen)
    setDeleteId(id)
    handleDeleteDialog()
    console.log('Dialog open '+deleteDialogOpen)
  }

  return (
    <ThemeProvider theme={theme}>
        {/* edit form values to reflect api */}
        <Box
        sx={{
            width:'90%',
            margin: '5%',
          }}><Typography variant='h4'>
            Edit Task {stringId}
          </Typography>
            {updatedUserId == '' ? <CircularProgress/> : 
        
          <><form autoComplete="off" onSubmit={(e) => handleUpdateTodo(e)}>
            <FormControl>
              <Box sx={{ width: '100%' }}>
                <FormControlLabel
                  label='Task'
                  labelPlacement='start'
                  control={<FormControl><TextField value={taskName} onChange={e => setUpdatedName(e.target.value)} sx={{ marginLeft: 6.7, marginTop: 1, marginBottom: 1, minWidth: '220px !important' }}></TextField></FormControl>} /></Box>
              <Box sx={{ width: '100%' }}>
                <FormControlLabel
                  label='User'
                  labelPlacement='start'
                  control={<FormControl><Select label='User'
                    value={selectedUser}
                    onChange={handleSelectUser}
                    ref={inputComponent}
                    sx={{ marginLeft: 6.7, marginTop: 1, marginBottom: 1, minWidth: '220px !important' }}>
                    {showUsers ? showUsers?.map((user) => (<MenuItem key={user.id} value={user.details}>{user.details}</MenuItem>)) : <MenuItem></MenuItem>}
                  </Select></FormControl>} /></Box>
              <Box sx={{ width: '100%' }}>
                <FormControlLabel
                  label='Completed'
                  labelPlacement='start'
                  control={<FormControl><Select label='Completed'
                    value={selectedCompletion}
                    onChange={handleSelectCompletion}
                    sx={{ marginLeft: 1, marginTop: 1, marginBottom: 1, minWidth: '220px !important' }}>
                    <MenuItem value={'No'}>No</MenuItem>
                    <MenuItem value={'Yes'}>Yes</MenuItem>
                  </Select></FormControl>} /></Box>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}><Button onClick={() => handleDelete(deleteId)} variant='outlined' sx={{ color: theme.palette.primary.contrastText, marginBottom: 3, borderColor: theme.palette.primary.contrastText, width: 100 }}><DeleteOutline /> Delete </Button></Box>
              <Button variant='contained' type='submit' sx={{ color: theme.palette.primary.light }}>Save</Button>
              <Button onClick={navigateToHome}>Cancel</Button>
            </FormControl>
          </form><DeleteDialog></DeleteDialog><UpdateFailedAlert></UpdateFailedAlert><DeleteFailedAlert></DeleteFailedAlert></>}
        </Box>
    </ThemeProvider>
  )
}

export default UpdateTodo
