import { PaletteMode } from "@mui/material";
import { blue } from "@mui/material/colors";

const customPaletteMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
        }
      : {
          // palette values for dark mode
        }),
  },
  typography:{fontFamily:['Quicksand'].join(','),}
})

export default customPaletteMode
