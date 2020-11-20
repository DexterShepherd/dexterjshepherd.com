import { useEffect } from 'react'

export const Redirects = [
  { from: '/works', to: 'https://www.notion.so/Dexter-Shepherd-Front-End-Projects-d055ac90de1642f0b0981e97991500a1' }
]

const Redirecter = ({ to }) => {
  useEffect(() => {
    window.location = to
  })
  return null
}

export { Redirecter }
