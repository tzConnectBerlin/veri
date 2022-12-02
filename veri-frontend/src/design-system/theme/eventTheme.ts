import { extendTheme, theme as base, ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const styles = {
  global: (props: StyleFunctionProps) => ({
    'html, body, #__next': {
      w: 'full',
    },
    body: {
      bg: mode('#FFF', '#000')(props),
    },
  }),
};

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const eventTheme = extendTheme({
  styles,
  config,
  fonts: {
    heading: `'ocr-b', ${base.fonts?.heading}`,
    body: `'ocr-b', ${base.fonts?.body}`,
  },
});
export default eventTheme;
