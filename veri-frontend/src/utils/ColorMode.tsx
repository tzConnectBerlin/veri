import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

export const ForceColorMode = (props: {
  children: JSX.Element;
  colorMode: 'dark' | 'light';
}) => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === props.colorMode) return;
    toggleColorMode();
  }, [colorMode, toggleColorMode, props.colorMode]);

  return props.children;
};
