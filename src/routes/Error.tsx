import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

export default function ErrorRoute() {
  const [count, setCount] = useState(5);
  useEffect(() => {
    const ref = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);
    return () => clearInterval(ref);
  }, []);

  return (
    <Container>
      <Hero>404</Hero>
      <p>
        I'm not sure what could have possibly happened for you to end up here.
      </p>
      <p>
        Sending you home in <strong>{count}</strong>.
      </p>
      {count < 1 && <Navigate to="/" />}
    </Container>
  );
}

const Hero = styled.h1`
  font-size: 2rem;
  font-style: italic;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
`;
