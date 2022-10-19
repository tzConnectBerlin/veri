import { defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: StyleFunctionProps) => ({
    'html, body, #__next': {
      w: 'full',
    },
    body: {
      bg: mode('#FFF', '#000')(props),
      color: '#000',
    },
  }),
};

const colors = {
  primary: {
    main: '#805AD5',
    50: '#FAF5FF',
    100: '#E9D8FD',
    200: '#D6BCFA',
    300: '#B794F4',
    400: '#9F7AEA',
    500: '#805AD5',
    600: '#6B46C1',
    700: '#553C9A',
    800: '#44337A',
    900: '#322659',
  },
};

const Badge = defineStyleConfig({
  baseStyle: {
    textTransform: 'normal',
    fontWeight: 'normal',
    padding: '4px 8px',
    borderRadius: '6px',
  },
  variants: {
    draft: {
      bg: 'pink.100',
      color: 'pink.600',
    },
    created: {
      bg: 'yellow.100',
      color: 'yellow.600',
    },
    minting: {
      bg: 'teal.100',
      color: 'teal.600',
    },
    minted: {
      bg: 'cyan.100',
      color: 'cyan.600',
    },
  },
});

const theme = extendTheme({
  styles,
  colors,
  components: {
    Badge,
  },
});
export default theme;
