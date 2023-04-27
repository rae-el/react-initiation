import { PaletteMode } from "@mui/material";
import { amber, blue, deepOrange, grey } from "@mui/material/colors";

const customPaletteMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: blue[200],
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: grey[900],
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: grey[200],
            secondary: grey[500],
          },
        }),
  },
})

export default customPaletteMode
