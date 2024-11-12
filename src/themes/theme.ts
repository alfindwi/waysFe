import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'white',
        color: 'black',
      },
    },
  },
  colors: {

    button: {
      500: "#F74D4D", 
    },
  },
});

export default theme;
