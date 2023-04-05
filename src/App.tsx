import { ThemeProvider } from '@mui/material/styles'
import Header from './components/ui/Header'
import TodosForm from './pages/home/TodosForm'
import theme from './theme'
import { useRef } from 'react';

function App() {
  

  return (
    <ThemeProvider theme={theme}>
        <Header/>
        <TodosForm/>
    </ThemeProvider>
  )
}

export default App
