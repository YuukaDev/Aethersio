import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme/theme";
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
