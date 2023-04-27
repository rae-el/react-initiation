import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home/Home'
import NotFound from './components/pages/notfound/NotFound';
import TodoProvider from './context/todoContext';
import CreateTodo from './components/pages/create/CreateTodo';
import UpdateTodo from './components/pages/update/UpdateTodo';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { useEffect, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode, createTheme } from '@mui/material';
import customPaletteMode from './customPaletteMode';

function App() {

  const [mode, setMode] = useState<PaletteMode>('light')
  //theme
  const [darkMode, setDarkMode] = useState(false)

  

  useEffect(()=>{
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    setMode(darkMode ? 'dark' : 'light')
  })

  const theme = useMemo(() => createTheme(customPaletteMode(mode)), [mode])
  

  return (
  
    <BrowserRouter>
      <Routes>
        <Route index element={<TodoProvider><ThemeProvider theme={theme}><CssBaseline/><Home/></ThemeProvider></TodoProvider>}></Route>
        <Route path="create" element={<TodoProvider><ThemeProvider theme={theme}><CssBaseline/><CreateTodo/></ThemeProvider></TodoProvider>}></Route>
        <Route path="update/:id" element={<TodoProvider><ThemeProvider theme={theme}><CssBaseline/><UpdateTodo/></ThemeProvider></TodoProvider>}></Route>
        <Route path="*" element={<ThemeProvider theme={theme}><CssBaseline/><NotFound/></ThemeProvider>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
