import analytics from "../utils/analytics";

function SocialStrip({ socials, onMouseMove, startIndex = 5 }) {
  if (!socials?.length) return null;

  return (
    <div
      className="social-strip animate-fade-in-up"
      onMouseMove={onMouseMove}
    >
      <p className="section-label social-strip__label">Socials</p>
      <div className="social-strip__grid" role="list">
        {socials.map((social, i) => (
          <a
            key={social.network}
            href={social.url}
            target={social.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            role="listitem"
            aria-label={social.network}
            className={`social-strip__item animate-fade-in-up stagger-${startIndex + i}`}
            onClick={() =>
              analytics.track("button_clicked", {
                button_type: "social_button",
                button_label: social.network,
                url: social.url,
              })
            }
          >
            {social.icon && (
              <span className="social-strip__icon">
                <img src={social.icon} alt="" width={22} height={22} />
              </span>
            )}
            <span className="social-strip__name">{social.network}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function SocialStripSkeleton() {
  return (
    <div className="social-strip social-strip--skeleton animate-pulse-skeleton">
      <div className="skeleton h-3 w-16 rounded mx-auto" />
      <div className="social-strip__grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="social-strip__item">
            <div className="skeleton w-11 h-11 rounded-xl" />
            <div className="skeleton h-3 w-12 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialStrip;
