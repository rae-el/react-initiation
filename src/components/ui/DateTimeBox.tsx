import { useContext } from "react"
import { TodoContext } from "../../context/todoContext"
import { TodoContextType } from "../../@types/Todo"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import theme from "../../theme"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

function DateTimeBox () {
    const {isMobile, hours, minutes, date, dayString, monthString} = useContext(TodoContext) as TodoContextType


    return (
       
      <ThemeProvider theme={theme}>
         {isMobile ? 
            <Box sx={{width:'100%', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                    <Typography sx={{fontWeight:600, marginRight:1, marginLeft:2}}>{dayString}</Typography>
                    <Typography variant='h4' sx={{color:theme.palette.primary.dark, fontWeight:600, marginLeft:1, marginRight:1, marginBottom:1}}>{date}</Typography>
                    <Typography sx={{fontWeight:600, fontVariant:'small-caps',marginLeft:1, marginRight:1}}>{monthString}</Typography>
                    <Box sx={{display:'flex', justifyContent:'center', marginLeft:1}}>
                      <Typography >
                        {hours} : {minutes < 10 ? '0'+minutes : minutes}
                      </Typography>
                    </Box>
                  </Box>
                  : 
                  <Box sx={{width:'70px', display:'flex', alignItems:'center', flexDirection:'column', justifyItems:'center'}}>
                    <Typography sx={{fontWeight:600}}>{dayString}</Typography>
                    <Typography variant='h4' sx={{color:theme.palette.primary.dark, fontWeight:600}}>{date}</Typography>
                    <Typography sx={{fontWeight:600, fontVariant:'small-caps',}}>{monthString}</Typography>
                    <Box sx={{display:'flex'}}>
                      <Typography>
                        {hours} : {minutes < 10 ? '0'+minutes : minutes}
                      </Typography>
                    </Box>
                  </Box>}
      </ThemeProvider> 
    )
}

export default DateTimeBox