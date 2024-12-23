import { Button } from "@/components/ui/button"
import analytics from '../utils/analytics'

function ProfileButtons() {
  
  const profile = [
    {
      type: 'custom_website',
      label: 'Portfolio',
      url: 'https://harshjoshi.dev/',
      icon: '/images/logo.svg'
    },
    {
      type: 'custom_website',
      label: 'My Resume',
      url: 'https://drive.google.com/file/d/1nmEHWGMidynaeSWm0MfHigqrYuOGh2OP/view',
      icon: '/images/drive.svg'
    }
  ];

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto px-4">
    {profile.map((button) => (
      <Button
        key={button.type}
        variant="outline"
        size="lg"
        className="group relative w-full bg-transparent border-2 border-white/20 text-white hover:bg-white hover:text-black hover:border-white rounded-2xl h-14 text-base font-normal transition-all duration-200"
        asChild
      >
        <a
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => analytics.track('button_clicked', {
            button_type: 'profile_button',
            button_label: button.label,
            url: button.url
          })}
          className="flex items-center justify-center"
        >
          <img 
            src={button.icon} 
            alt={button.type}
            className="w-6 h-6 mr-3 group-hover:brightness-0"
          />
          {button.label}
        </a>
      </Button>
    ))}
  </div>
  )
}

export default ProfileButtons 