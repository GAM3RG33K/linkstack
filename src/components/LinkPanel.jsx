import analytics from "../utils/analytics";

function LinkPanel({ links, onMouseMove, startIndex = 2 }) {
  if (!links?.length) return null;

  return (
    <nav
      className="link-panel animate-fade-in-up stagger-2"
      aria-label="Profile links"
      onMouseMove={onMouseMove}
    >
      {links.map((link, i) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`link-panel__row animate-fade-in-up stagger-${startIndex + i}`}
          onClick={() =>
            analytics.track("button_clicked", {
              button_type: "profile_link",
              button_label: link.label,
              url: link.url,
            })
          }
        >
          {link.icon && (
            <span className="link-panel__icon">
              <img src={link.icon} alt="" width={20} height={20} />
            </span>
          )}
          <span className="link-panel__text">
            <span className="link-panel__label">{link.label}</span>
          </span>
          <span className="link-panel__action" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
        </a>
      ))}
    </nav>
  );
}

export function LinkPanelSkeleton() {
  return (
    <div className="link-panel link-panel--skeleton animate-pulse-skeleton">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="link-panel__row">
          <div className="skeleton w-10 h-10 rounded-xl" />
          <div className="skeleton h-4 flex-1 rounded-lg" />
          <div className="skeleton w-4 h-4 rounded" />
        </div>
      ))}
    </div>
  );
}

export default LinkPanel;
