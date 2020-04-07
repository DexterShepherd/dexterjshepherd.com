import React from 'react'
import { HomepageGL } from './HomepageGL'
import { HomepageContent } from './HomepageContent'
import { BrowserView } from 'react-device-detect'

function Home() {
  return (
    <>
      <BrowserView>
        <HomepageGL />
      </BrowserView>
      <HomepageContent />
    </>
  )
}

export { Home }
