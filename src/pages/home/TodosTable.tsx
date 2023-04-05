import * as React from 'react';
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

function getTodos(
  name: string,
  user: string,
  completed: boolean,
) {
  return { name, user, completed };
}

const rows = [
  getTodos('Task 1','Rachel',true,),
  getTodos('Task 2','Ron',false,),
];

export default function TodosTable() {
  return (
    <ThemeProvider theme={theme}>
    <TableContainer 
    component={Paper}
    className='todos-table-container'
    >
      <Table aria-label="todos table" className='todos-table'>
        <TableHead className='todos-table-header'
        sx={{backgroundColor:theme.palette.primary.main,
        fontVariant:'small-caps'}}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>{row.completed ? <TaskAlt/> : <RadioButtonUnchecked/>}</TableCell>
              <TableCell>
                <Button sx={{color:theme.palette.primary.contrastText, borderColor:theme.palette.primary.main}}><DeleteOutline/></Button>
                <Button sx={{color:theme.palette.primary.contrastText, border:'none'}}><Edit/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></ThemeProvider>
  );
}