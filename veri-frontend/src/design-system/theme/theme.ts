import {
  defineStyleConfig,
  extendTheme,
  theme as base,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: StyleFunctionProps) => ({
    'html, body, #__next': {
      w: 'full',
    },
    body: {
      bg: mode('#FFF', '#000')(props),
      color: 'gray.700',
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
    fontWeight: '500',
    fontsize: '14px',
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
const Button = defineStyleConfig({
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
    fonts: {
      heading: `'Inter-SemiBold', ${base.fonts?.heading}`,
      body: `'Inter-regular', ${base.fonts?.body}`,
    },
  },
  variants: {
    icon: {
      bg: 'transparent',
      height: 'auto',
      padding: 1,
      cursor: 'pointer',
      _hover: {
        bg: 'transparent',
      },
    },
    secondary: {
      bg: 'primary.50',
      color: 'primary.main',
      borderWidth: 1,
      borderColor: 'primary.100',
    },
    link: {
      fontWeight: 'normal',
    },
  },
});

const Input = defineStyleConfig({
  baseStyle: {
    field: {
      _readOnly: {
        border: 'none',
        padding: 0,
        height: 'auto',
      },
    },
  },
});

const Textarea = defineStyleConfig({
  baseStyle: {
    _readOnly: {
      border: 'none',
      padding: 0,
      height: 'auto',
      minHeight: 'unset',
      resize: 'none',
    },
  },
});
const Radio = defineStyleConfig({
  baseStyle: {
    control: {
      _readOnly: {
        display: 'none',
      },
    },
  },
});

const FormLabel = defineStyleConfig({
  baseStyle: {
    fontSize: '12px',
    fontWeight: 'bold',
    lineHeight: 1.33,
    letterSpacing: '0.6px',
    color: 'gray.600',
    textTransform: 'uppercase',
    span: {
      color: 'gray.600',
      marginLeft: '1px',
      marginBottom: '-2px',
    },
    _readOnly: {
      span: {
        display: 'none',
      },
    },
  },
});

const theme = extendTheme(
  {
    styles,
    colors,
    components: {
      Badge,
      Button,
      Input,
      Textarea,
      FormLabel,
      Radio,
    },
    fonts: {
      heading: `'Inter-SemiBold', ${base.fonts?.heading}`,
      body: `'Inter-regular', ${base.fonts?.body}`,
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);
export default theme;
