import styled from "styled-components";
import ThemeProvider from "./ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Root>
        <h1>Hello, I'm Dexter</h1>
      </Root>
    </ThemeProvider>
  );
}

const Root = styled.div`
  background: ${(props) => props.theme.colors.red2};
  color: ${(props) => props.theme.colors.red11};
  flex: 1;
`;

export default App;
