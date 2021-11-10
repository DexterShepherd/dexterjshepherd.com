import { useEffect } from 'react'

export const Redirects = [
  { from: '/works', to: 'https://www.notion.so/Dexter-Shepherd-Front-End-Projects-d055ac90de1642f0b0981e97991500a1' },
  { from: '/presents', to: 'https://steady-stork-fbd.notion.site/Presents-list-b5a479c19572458ca426059ee52ad65d' }
]

const Redirecter = ({ to }) => {
  useEffect(() => {
    window.location = to
  })
  return null
}

export { Redirecter }
