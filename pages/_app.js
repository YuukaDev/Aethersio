import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import customTheme from "../styles/theme";
import { ContextProvider } from "../context";
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ChakraProvider resetCSS theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  );
}

export default MyApp;
