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
import { TodoService } from '../../Server/services/ToDos/TodoService';
import { TodoObject } from '../../Server/server';




export default function TodosTable() {
  const todoService = new TodoService();
  const [todoList, setTodoList] = React.useState<Array<TodoObject>>([]);

  React.useEffect(() => {
    todoService.getTodos().then((value) => setTodoList(value))
    //todoService.fetchTodos()
  })

  return (
    <ThemeProvider theme={theme}>
    <TableContainer 
    component={Paper}
    className='todos-table-container'
    >
      <Table aria-label="todos table" className='todos-table'>
        <TableHead className='todos-table-header'
        sx={{backgroundColor:theme.palette.primary.main,
        fontVariant:'small-caps',width:'100%'}}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo) => (
            <TableRow
              key={todo.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{todo.name}</TableCell>
              <TableCell>{todo.user}</TableCell>
              <TableCell>{todo.isComplete ? <TaskAlt/> : <RadioButtonUnchecked/>}</TableCell>
              <TableCell>
                <Button sx={{color:theme.palette.primary.contrastText}}><DeleteOutline/></Button>
                <Button sx={{color:theme.palette.primary.contrastText}}><Edit/></Button>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></ThemeProvider>
  );
}