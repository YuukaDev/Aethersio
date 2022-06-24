import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "../theme/theme";
import { ShopProvider } from "../utils/StoreContext";

function MyApp({ Component, pageProps }) {
  return (
    <ShopProvider>
      <ChakraProvider resetCSS theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ShopProvider>
  );
}

export default MyApp;
