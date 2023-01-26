import { useToast, UseToastOptions } from '@chakra-ui/react';

export const useToastMsg = (defaultOptions?: UseToastOptions) => {
  return useToast({
    position: defaultOptions?.position ?? 'bottom-right',
    ...defaultOptions,
  });
};
