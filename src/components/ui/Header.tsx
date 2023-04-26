import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import theme from '../../theme'
import { ThemeProvider } from '@mui/material/styles'
import { TodoContextType } from '../../@types/Todo'
import { useContext } from 'react'
import { TodoContext } from '../../context/todoContext'


function Header() {
  const {hours} = useContext(TodoContext) as TodoContextType


  return (
    <ThemeProvider theme={theme}>
      <Box 
      sx={{
        backgroundColor:theme.palette.primary.light,
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
          <Typography variant='h5' sx={{paddingLeft:3, color:theme.palette.primary.dark}}>
          plan your day, plan your tasks, plan your success.
          </Typography>
        </Box>
        
        
      </Box>
    </ThemeProvider>
  )
}

export default Header
