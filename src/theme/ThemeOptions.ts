// -- MUI --
import { PaletteOptions } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";

const ThemeOptions = (palette: PaletteOptions) => {
  return createTheme({
    palette: palette,
    cssVariables: true,
  });
};

export default ThemeOptions;