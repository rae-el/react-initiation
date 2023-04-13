import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import Add from './pages/Add';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import TodoProvider from './context/todoContext';

function App() {
  

  return (
  
    <BrowserRouter>
      <Routes>
        <Route index element={<TodoProvider><Home/></TodoProvider>}></Route>
        <Route path="add" element={<TodoProvider><Add/></TodoProvider>}></Route>
        <Route path="edit/:id" element={<TodoProvider><Edit/></TodoProvider>}></Route>
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
