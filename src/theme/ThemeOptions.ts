// -- MUI --
import { PaletteOptions } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";

const rootElement = typeof document !== "undefined" ? document.getElementById("root") : null;

const ThemeOptions = (palette: PaletteOptions) => {
  return createTheme({
    palette: palette,
    cssVariables: true,
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiDialog: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
  });
};

export default ThemeOptions;
