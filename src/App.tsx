import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home'
import NotFound from './components/pages/notfound/NotFound';
import TodoProvider from './context/todoContext';
import CreateTodo from './components/pages/create/CreateTodo';
import UpdateTodo from './components/pages/update/UpdateTodo';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';

function App() {
  

  return (
  
    <BrowserRouter>
      <Routes>
        <Route index element={<TodoProvider><ThemeProvider theme={theme}><Home/></ThemeProvider></TodoProvider>}></Route>
        <Route path="create" element={<TodoProvider><ThemeProvider theme={theme}><CreateTodo/></ThemeProvider></TodoProvider>}></Route>
        <Route path="update/:id" element={<TodoProvider><ThemeProvider theme={theme}><UpdateTodo/></ThemeProvider></TodoProvider>}></Route>
        <Route path="*" element={<ThemeProvider theme={theme}><NotFound/></ThemeProvider>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
