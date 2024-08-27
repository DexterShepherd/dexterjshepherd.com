import styled from "styled-components";

export default function Root() {
  return (
    <Container>
      <Hero>Dexter J Shepherd</Hero>
      <Subhead>I'm a software developer based in London, UK.</Subhead>
      <Body>
        I've spent my career working at startups and creative agencies, mostly
        on typescript, react, and frontend performance. Right now I work on the
        front end team at{" "}
        <a target="_blank" href="https://runwayml.com/">
          Runway
        </a>
        . I also spent some time teaching in the Digital Arts program at{" "}
        <a target="_blank" href="https://calarts.edu/">
          California Institute of the Arts
        </a>
        .
      </Body>
      <Body>
        You can find me on{" "}
        <a target="_blank" href="https://www.instagram.com/dexterwritescode">
          Instagram
        </a>
        ,{" "}
        <a target="_blank" href="https://www.linkedin.com/in/dexter-shepherd/">
          LinkedIn
        </a>
        ,{" "}
        <a target="_blank" href="https://twitter.com/dexter_shepherd">
          Twitter
        </a>
        , or{" "}
        <a target="_blank" href="https://github.com/DexterShepherd">
          Github
        </a>
        . I'm not seeking freelance work at the moment, but I don't mind people
        reaching out on any of those platforms with questions or just to say{" "}
        <em>hi</em>.
      </Body>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
`;

const Hero = styled.h1`
  font-size: 2rem;
  font-style: italic;
`;

const Subhead = styled.h3``;

const Body = styled.p``;
