import { useState } from 'react'
import analytics from '../utils/analytics'
import SocialButtons from './SocialButtons'
import ProfileButtons from './ProfileButtons'
import { Button } from "@/components/ui/button"

function Profile() {
  const [showCopyAlert, setShowCopyAlert] = useState(false)

  const handleShare = async () => {
    const valueToShare = 'https://links.harshjoshi.dev'
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Share this page",
          url: valueToShare,
        })
        analytics.track('share_clicked', { method: 'native' })
      } else {
        await navigator.clipboard.writeText(valueToShare)
        setShowCopyAlert(true)
        setTimeout(() => setShowCopyAlert(false), 2000)
        analytics.track('share_clicked', { method: 'clipboard' })
      }
    } catch (err) {
      console.error('Error:', err)
      analytics.track('share_error', { error: err.message })
    }
  }

  return (
    <div className="container mx-auto px-12 py-24 ">
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 right-4 bg-white text-black rounded-2xl px-12 py-4 font-medium"
        onClick={handleShare}
      >
        Share ➤
      </Button>

      {showCopyAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded">
          URL has been copied to your clipboard!
        </div>
      )}

      <div className="text-center space-y-8">
        <img
          alt="avatar"
          className="mx-auto w-32 h-32"
          src="/images/logo.svg"
        />

        <h1 className="text-4xl font-bold text-white">
          Harshvardhan Joshi
          <span className="ml-2 inline-block">
            <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
            </svg>
          </span>
        </h1>

        <div className="space-y-4">
          <ProfileButtons />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl text-white">Socials</h2>
          <SocialButtons />
        </div>
      </div>
    </div>
  )
}

export default Profile 