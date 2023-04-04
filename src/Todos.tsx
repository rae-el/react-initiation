import { FormControl, FormLabel, MenuItem, Select, TextField } from '@mui/material'
import { DropdownIndicator } from 'react-select/dist/declarations/src/components/indicators'
import './Todos.css'

function Todos() {

  return (
    <div className="todos">
        <div className='todoHeaders'>
            <div className='projectSection'></div>
            <div className='userSection'></div>
            <div className='completedSection'>
                <div className='completedToggle'></div>
            </div>
        </div>
        <div className='todoForm'>
            <FormControl>
                <TextField label='Project' inputMode='text' variant='filled' disabled></TextField>
                <Select label='User'>
                    <MenuItem>User 1</MenuItem>
                    <MenuItem>User 2</MenuItem>
                    <MenuItem>User 3</MenuItem>
                </Select>
            </FormControl>
        </div>
    </div>
  )
}

export default Todos
