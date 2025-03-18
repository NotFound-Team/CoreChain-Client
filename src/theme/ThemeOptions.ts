import { createTheme, PaletteOptions } from "@mui/material";

const ThemeOptions = (palette: PaletteOptions) => {
  return createTheme({
    palette: palette,
    cssVariables: true,
  });
};

export default ThemeOptions;