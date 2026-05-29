import { useEffect, useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Profile from './components/Profile'
import analytics from './utils/analytics'

const DATA_URL = 'https://raw.githubusercontent.com/GAM3RG33K/links-json/main/links.json'
const CACHE_BUST_URL = `${DATA_URL}?t=${Date.now()}`

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    analytics.pageView()

    fetch(CACHE_BUST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch links:', err)
        setError(err.message)
        setLoading(false)
        // Fallback data
        setData({
          profile: {
            name: "Harshvardhan Joshi",
            label: "Mobile App Developer & Full Stack Developer",
            headline: "Full Stack Developer | Flutter Expert | Active Open Source Contributor",
            avatar: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/logo.svg",
            verified: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/verified.svg",
          },
          links: [
            { label: "Portfolio", url: "https://harshjoshi.dev/", icon: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/logo.svg" },
            { label: "My Resume", url: "https://drive.google.com/file/d/1nmEHWGMidynaeSWm0MfHigqrYuOGh2OP/view", icon: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/drive.svg" },
          ],
          socials: [
            { network: "GitHub", url: "https://github.com/GAM3RG33K", icon: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/github.svg" },
            { network: "LinkedIn", url: "https://www.linkedin.com/in/harshvardhan-joshi/", icon: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/linkedin.svg" },
            { network: "Twitter", url: "https://x.com/decent_geek/", icon: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/twitterx.svg" },
            { network: "Contact", url: "mailto:contact@harshjoshi.dev", icon: "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/email.svg" },
          ],
        })
      })
  }, [])

  return (
    <>
      <ParticleBackground />
      <Profile data={data} loading={loading} error={error} />
    </>
  )
}

export default App
