import styled from "styled-components";
import ThemeProvider from "./ThemeProvider";
import { Router } from "./Router";

function App() {
  return (
    <ThemeProvider>
      <Root>
        <Router />
      </Root>
    </ThemeProvider>
  );
}

const Root = styled.div`
  background: ${(props) => props.theme.colors.gray2};
  color: ${(props) => props.theme.colors.gray12};
  flex: 1;
`;

export default App;
