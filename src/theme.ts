import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from "@radix-ui/colors";
import { DefaultTheme } from "styled-components/dist/types";

// Create your theme
export const theme: DefaultTheme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
  },
} as const;

// Create your dark theme
export const darkTheme: DefaultTheme = {
  colors: {
    ...grayDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
};
