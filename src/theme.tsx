import {
    createTheme,
    PaletteColorOptions,
    PaletteColor,
} from '@mui/material/styles';
import { grey, blue, red } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Palette {
        usrBubble: PaletteColor;
        oppBubble: PaletteColor;
    }
    interface PaletteOptions {
        usrBubble?: PaletteColorOptions;
        oppBubble?: PaletteColorOptions;
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#211f2c',
            contrastText: grey[50],
        },
        secondary: {
            main: '#252331',
            contrastText: grey[700],
        },
        oppBubble: {
            main: red[800],
            contrastText: '#ffffff',
        },
        usrBubble: {
            main: blue[700],
            contrastText: '#ffffff',
        },
        background: {
            default: '#0c0c10',
        },
    },
});

export default theme;
