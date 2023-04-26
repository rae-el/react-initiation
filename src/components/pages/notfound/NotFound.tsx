import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { useEffect } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import theme from "../../../theme"


function Add() {
  
  useEffect(() => {
  })


  return (
    <ThemeProvider theme={theme}>
        {/* edit form values to reflect api */}
        <Box
        sx={{
            width:'90%',
            margin: '5%',
            position: 'fixed',
            top: 100,
          }}>
            <Typography variant='h1'>
          Page Not Found
        </Typography>
       </Box>
    </ThemeProvider>
  )
}

export default Add
