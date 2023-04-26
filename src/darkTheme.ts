import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette:{
      primary:{
        main: '#76bcff',
        light: '#000',
        dark: '#fff',
        contrastText: '#fff',
      },
      secondary:{
        main: '#c3e1ff',
        light: '#eaf5ff',
        dark: '#2896ff',
        contrastText: '#b6bbbf',
      },
      success:{
        main:'#51D451',
        light:'#E5FFE5',
        dark:'#5AA769'
      },
  },
  typography:{fontFamily:['Quicksand'].join(','),}

})

export default darkTheme


