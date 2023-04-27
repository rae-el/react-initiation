import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  
    palette:{
      primary:{
        main: '#76bcff',
        light: '#fff',
        dark: '#2896ff',
        contrastText: '#708090',
      },
      secondary:{
        main: '#c3e1ff',
        light: '#9ed1ff',
        dark: '#2896ff',
        contrastText: '#b6bbbf',
      },
      success:{
        main:'#51D451',
        light:'#99FF99',
        dark:'#5AA769'
      },
  },
  typography:{fontFamily:['Quicksand'].join(','),}

})

export default theme


