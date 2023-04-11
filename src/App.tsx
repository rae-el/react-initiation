import { ThemeProvider } from '@mui/material/styles'
import Header from './components/ui/Header'
import Home from './pages/home/Home'
import theme from './theme'
import { useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './pages/Add';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="add" element={<Add/>}></Route>
        <Route path="edit" element={<Edit/>}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
    /*<ThemeProvider theme={theme}>
        <Home/>
    </ThemeProvider>*/
  )
}

export default App
