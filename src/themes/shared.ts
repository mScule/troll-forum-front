import { ThemeOptions } from "@mui/material";
import { blue, green, red, yellow } from "@mui/material/colors";

const shared: ThemeOptions = {
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        info: {
            light: blue[500],
            main: blue[500],
            dark: blue[500],
        },
        success: {
            light: green[500],
            main: green[500],
            dark: green[500],
        },
        warning: {
            light: yellow[500],
            main: yellow[500],
            dark: yellow[500],
        },
        error: {
            light: red[500],
            main: red[500],
            dark: red[500],
        },
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            }
        },
    }
}

export default shared;
