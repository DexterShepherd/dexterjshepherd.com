import React, { useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'

const mobile = 'screen and (max-width: 767px)'

const HomepageContent = () => {
  const [page, setPage] = useState('hello')

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 200,
      transition: {
        staggerChildren: 0.05,
        type: 'spring',
        damping: 100,
        mass: 2
      }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        type: 'spring',
        damping: 100,
        mass: 2
      }
    }
  }

  const pageVariants = {
    hidden: {
      pointerEvents: 'none',
      transition: {
        staggerChildren: 0.05,
        type: 'spring',
        damping: 100,
        mass: 2
      }
    },
    visible: {
      pointerEvents: 'all',
      transition: {
        staggerChildren: 0.05,
        type: 'spring',
        damping: 100,
        mass: 2
      }
    }
  }

  const slideVariants = {
    hidden: {
      y: -400,
      transition: {
        type: 'spring',
        damping: 100,
        mass: 10,
        stiffness: 100
      }
    },
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        damping: 100,
        mass: 2
      }
    }
  }

  const navVariants = {
    unselected: {
      opacity: 0.6
    },
    selected: {
      opacity: 1
    }
  }
  return (
    <Container initial="hidden" animate="visible" variants={containerVariants}>
      <Slide>
        <Title variants={slideVariants}>Dexter J Shepherd</Title>
      </Slide>
      <Slide>
        <Paragraph variants={slideVariants}>
          <NavButton
            variants={navVariants}
            animate={page === 'hello' ? 'selected' : 'unselected'}
            onClick={() => setPage('hello')}
          >
            Hello.
          </NavButton>
          <NavButton
            variants={navVariants}
            animate={page == 'misc' ? 'selected' : 'unselected'}
            onClick={() => setPage('misc')}
          >
            Misc.
          </NavButton>
        </Paragraph>
      </Slide>
      <Page initial="hidden" animate={page === 'hello' ? 'visible' : 'hidden'} variants={pageVariants}>
        <Slide>
          <Paragraph variants={slideVariants}>
            I'm a <Underline>front end developer</Underline> and <Underline>graphics programmer</Underline> based in Los
            Angeles CA.
          </Paragraph>
        </Slide>

        <Slide>
          <Paragraph small variants={slideVariants}>
            I've spent the last 5 years working at startups with a few corporate clients thrown in here and there. I
            also teach in the Digital Arts program at{' '}
            <a target="_blank" href="https://calarts.edu/">
              California Institute of the Arts
            </a>
            .
          </Paragraph>
        </Slide>
        <Slide>
          <Paragraph small variants={slideVariants}>
            You can check out my creative projects on{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/dexterwritescode">
              Instagram
            </a>
            , see who I like to work with{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dexter-shepherd/">
              LinkedIn
            </a>{' '}
            and get a feel for my general vibe on{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/dexter_shepherd">
              Twitter
            </a>
            .
          </Paragraph>
        </Slide>
        <Slide>
          <Paragraph small variants={slideVariants}>
            I'm looking for new projects right now. Reach out on one of the platforms above, or send me an{' '}
            <a href="mailto:dexterjshepherd@gmail.com">email</a> if you're working on something interesting.
          </Paragraph>
        </Slide>
        <Slide>
          <Paragraph small variants={slideVariants}>
            The code for this website, along with most of my other projects, is available on{' '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/DexterShepherd">
              Github
            </a>{' '}
            if that's your kind of thing.
          </Paragraph>
        </Slide>
      </Page>
      <Page initial="hidden" animate={page === 'misc' ? 'visible' : 'hidden'} variants={pageVariants}>
        <Slide>
          <Paragraph variants={slideVariants}>
            This is a space for some miscellaneous projects I'm proud of, but don't fit on other platforms.
          </Paragraph>
        </Slide>
        <Slide>
          <Paragraph small variants={slideVariants}>
            Occasionally I work on websites for friends or hobby projects.
            <List>
              <Item>
                <span role="img" aria-label="a laptop computer">
                  💻
                </span>
                <a target="_blank" rel="noopener noreferrer" href="https://clickbecause.net">
                  Mike Leisz
                </a>
              </Item>
            </List>
          </Paragraph>
        </Slide>

        <Slide>
          <Paragraph small variants={slideVariants}>
            I also write and share tutorials from time to time.
            <List>
              <Item>
                <span role="img" aria-label="a word document">
                  📄
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://blog.kadenze.com/creative-technology/p5-js-crash-course-recreate-art-you-love/"
                >
                  p5.js Crash Course: Recreate Art You Love
                </a>
              </Item>
              <Item>
                <span role="img" aria-label="a word document">
                  📄
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://blog.kadenze.com/creative-technology/p5-js-crash-course-pumpkin-wave/"
                >
                  p5.js Crash Course II: Pumpkin wave
                </a>
              </Item>
            </List>
          </Paragraph>
        </Slide>

        <Slide>
          <Paragraph small variants={slideVariants}>
            I teach courses in web development and creative coding. Sometimes I get to speak at meet ups and the like.
            <List>
              <Item>
                <span role="img" aria-label="a person teaching">
                  👨🏼‍🏫
                </span>
                Calarts ICOM-101 - Media and Web Development
              </Item>
              <Item>
                <span role="img" aria-label="a person teaching">
                  👨🏼‍🏫
                </span>
                Calarts ICOM-201/202 - Introduction to Programming
              </Item>
              <Item>
                <span role="img" aria-label="a person teaching">
                  👨🏼‍🏫
                </span>
                Creative Coding Festival LA 2018 - Oscillation
              </Item>
            </List>
          </Paragraph>
        </Slide>
      </Page>
    </Container>
  )
}

const List = styled.ul`
  padding: 0;
`
const Item = styled.li`
  list-style: none;
  span[role='img'] {
    margin-right: 1em;
  }

  font-size: 1em;
`

const Page = styled(m.div)`
  position: absolute;

  @media ${mobile} {
    width: 90%;
    margin-bottom: 32px;
  }
`

const NavButton = styled(m.button)`
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  font-size: 1em;
  font-weight: 300;
  margin-right: 0.5em;
  font-style: italic;

  &:focus {
    outline: 0;
  }
`

const Slide = styled.div`
  overflow: hidden;
`

const Underline = styled.span`
  text-decoration: underline;
`

const Container = styled(m.div)`
  padding: 64px;

  @media ${mobile} {
    padding: 16px;
  }
`

const Paragraph = styled(m.p)`
  font-size: 1.5em;
  max-width: 600px;

  ${({ small }) => (small ? 'font-size: 1.2em;' : '')}

  @media ${mobile} {
    font-size: 1.2em;
    ${({ small }) => (small ? 'font-size: 1em;' : '')}
  }
`

const Title = styled(m.h1)`
  margin: 0;
  font-size: 5em;
  font-weight: 300;

  @media ${mobile} {
    font-size: 2em;
  }
`

export { HomepageContent }
