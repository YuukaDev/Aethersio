import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme/theme";
import { AetherProvider } from "../utils/StoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <AetherProvider>
      <ChakraProvider resetCSS theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AetherProvider>
  );
}

export default MyApp;
