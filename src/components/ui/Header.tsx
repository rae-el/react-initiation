import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { TodoContextType } from '../../@types/Todo'
import { useContext, useEffect, useMemo, useState } from 'react'
import { TodoContext } from '../../context/todoContext'
import { PaletteMode } from '@mui/material'
import customPaletteMode from '../../customPaletteMode'


function Header() {
  const {hours} = useContext(TodoContext) as TodoContextType

  const [mode, setMode] = useState<PaletteMode>('light')
  //theme
  const [darkMode, setDarkMode] = useState(false)

  

  useEffect(()=>{
    setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    setMode(darkMode ? 'dark' : 'light')
  })

  const theme = useMemo(() => createTheme(customPaletteMode(mode)), [mode])


  return (
    <ThemeProvider theme={theme}>
      <Box 
      sx={{
        top:0,
        margin: '5%',
        zIndex: 9,
        display:'flex',
        alignContent:'space-between',
        flexWrap:'wrap'
      }}>
        <Box>
          <Typography variant='h3'>
          {hours > 11 ? 'Good Afternoon,' : 'Good Morning,'}
          </Typography>
          <Typography variant='h5' sx={{paddingLeft:3, color:'#90c8ff'}}>
          plan your day, plan your tasks, plan your success.
          </Typography>
        </Box>
        
        
      </Box>
    </ThemeProvider>
  )
}

export default Header
