import { createTheme } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: 'GmarketSansMedium',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#f44336',
      dark: '#afafaf',
    },
    secondary: {
      main: '#f50057',
    },
  },
});
export default theme;
