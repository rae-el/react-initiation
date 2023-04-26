import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home'
import Add from './pages/Add';
import NotFound from './components/pages/notfound/NotFound';
import Edit from './pages/Edit';
import TodoProvider from './context/todoContext';
import CreateTodo from './components/pages/create/CreateTodo';
import UpdateTodo from './components/pages/update/UpdateTodo';

function App() {
  

  return (
  
    <BrowserRouter>
      <Routes>
        <Route index element={<TodoProvider><Home userList={[]} todoList={[]}/></TodoProvider>}></Route>
        <Route path="create" element={<TodoProvider><CreateTodo userList={[]}/></TodoProvider>}></Route>
        <Route path="update/:id" element={<TodoProvider><UpdateTodo userList={[]} todo={null}/></TodoProvider>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
    /*<ThemeProvider theme={theme}>
        <Home/>
    </ThemeProvider>*/
    //<TodoProvider></TodoProvider>
  )
}

export default App
