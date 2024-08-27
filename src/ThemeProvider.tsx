import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

type Props = { children: React.ReactNode };
function Provider(props: Props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}

export default Provider;
