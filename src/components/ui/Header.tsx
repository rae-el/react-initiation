import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import theme from '../../theme'
import { ThemeProvider } from '@mui/material/styles'


function Header() {
  const fullDate = new Date()
  const hours = fullDate.getHours()
  const minutes = fullDate.getMinutes()
  const date = fullDate.getDate()
  const day = fullDate.getDay()
  const month = fullDate.getMonth()
  const days : {[propKey: number] : string} = {1:'Mon', 2:'Tue', 3:'WED', 4:'Thurs', 5:'Fri', 6:'Sat', 7:'Sun'}
  const months : {[propKey: number] : string} = {1:'Jan', 2:'Feb', 3:'March', 4:'April', 5:'May', 6:'June', 7:'July', 8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov', 12:'December'}
  const dayString = days[day]
  const monthString =  months[month]

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
          {hours > 12 ? 'Good Afternoon,' : 'Good Morning,'}
          </Typography>
          <Typography variant='h5' sx={{paddingLeft:3, color:theme.palette.primary.dark}}>
          Plan your day, plan your tasks, plan your success.
          </Typography>
        </Box>
        
        
      </Box>
    </ThemeProvider>
  )
}

export default Header
