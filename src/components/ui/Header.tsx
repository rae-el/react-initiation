import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import theme from '../../theme'
import { ThemeProvider } from '@mui/material/styles'


function Header() {

  return (
    <ThemeProvider theme={theme}>
      <Box 
      sx={{
        backgroundColor:theme.palette.primary.main,
        color:theme.palette.primary.light,
        position:'fixed',
        top:0,
        left: -1,
        width:'100%',
        zIndex: 9
      }}>
        <Typography variant='h1'sx={{paddingLeft:2}}>
          ToDo
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default Header
