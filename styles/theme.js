import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  lg: "62em",
});

const overrides = {
  ...chakraTheme,
  breakpoints,
};

const customTheme = extendTheme(overrides);

export default customTheme;
