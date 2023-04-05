import { Box, Button, FormControl, FormControlLabel, MenuItem, Select, Switch, TextField, ThemeProvider } from '@mui/material'
import TodosTable from './TodosTable'
import theme from '../../theme'


function TodosForm() {

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
                    <TextField label='Project' inputMode='text' variant='filled' disabled sx={{width:'20', margin:'0.5em'}}/>
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
                    <Select label='User' sx={{width:'20', margin:'0.5em'}}>
                        <MenuItem>User 1</MenuItem>
                        <MenuItem>User 2</MenuItem>
                        <MenuItem>User 3</MenuItem>
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
                        checked = {false}
                        color='success'
                    />
                }
                label="Completed"
                labelPlacement='start' /></Box>
            <TodosTable/>
            <Button variant='contained' sx={{color:theme.palette.primary.contrastText}}>Add Task</Button>
        </FormControl></Box>
    </ThemeProvider>
  )
}

export default TodosForm
