import React, { Suspense } from "react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import { theme, ColorModeScript } from "@chakra-ui/react";

export const decorators = [
  (Story) => (
    <Suspense fallback="Loading...">
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <MemoryRouter>
          <CSSReset />
          <Story />
        </MemoryRouter>
      </ChakraProvider>
    </Suspense>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  chakra: {
    theme,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
