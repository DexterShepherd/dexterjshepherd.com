import "styled-components";
import { gray, blue, red, green } from "@radix-ui/colors";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: typeof gray & typeof blue & typeof red & typeof green & {};
  }
}
