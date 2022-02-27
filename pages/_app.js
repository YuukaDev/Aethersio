import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme/theme";
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
