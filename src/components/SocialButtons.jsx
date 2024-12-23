import { Button } from "@/components/ui/button"
import analytics from '../utils/analytics'

function SocialButtons() {
  const buttons = [
    {
      type: 'github',
      label: 'Github',
      url: 'https://github.com/GAM3RG33K',
      icon: '/images/github.svg'
    },
    {
      type: 'linkedin',
      label: 'Linkedin',
      url: 'https://www.linkedin.com/in/harshvardhan-joshi/',
      icon: '/images/linkedin.svg'
    },
    {
      type: 'twitter',
      label: 'Twitter',
      url: 'https://x.com/decent_geek/',
      icon: '/images/twitterx.svg'
    },
    {
      type: 'email',
      label: 'Contact me',
      url: 'mailto:contact@harshjoshi.dev',
      icon: '/images/email.svg'
    }
  ]

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto px-4">
      {buttons.map((button) => (
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
              button_type: 'social_button',
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

export default SocialButtons 