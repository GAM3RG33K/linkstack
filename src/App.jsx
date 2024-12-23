import { useEffect, useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Profile from './components/Profile'
import analytics from './utils/analytics'

function App() {
  
  useEffect(() => {
    // Track page view when app loads
    analytics.pageView()
  }, [])


  return (
    <>
      <ParticleBackground />
      <Profile />
    </>
  )
}

export default App