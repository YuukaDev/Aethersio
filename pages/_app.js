import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import customTheme from "../styles/theme";
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
