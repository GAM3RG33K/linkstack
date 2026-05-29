import { useCallback } from "react";

function parseHeadlineTags(headline) {
  if (!headline) return [];
  return headline.split("|").map((tag) => tag.trim()).filter(Boolean);
}

function ProfileHeader({ profile, onMouseMove }) {
  const tags = parseHeadlineTags(profile.headline);
  const avatarSrc =
    profile.avatar ||
    "https://raw.githubusercontent.com/GAM3RG33K/links-json/main/assets/logo.svg";

  const handleMouseMove = useCallback(
    (e) => {
      onMouseMove?.(e);
    },
    [onMouseMove],
  );

  return (
    <header
      className="hero-identity animate-fade-in-up stagger-1"
      onMouseMove={handleMouseMove}
    >
      <div className="hero-identity__mesh" aria-hidden="true" />
      <div className="hero-identity__grid" aria-hidden="true" />

      <div className="hero-identity__avatar-zone">
        <div className="hero-identity__orbit hero-identity__orbit--outer" />
        <div className="hero-identity__orbit hero-identity__orbit--inner" />
        <div className="hero-identity__avatar-wrap">
          <img
            alt={profile.name}
            src={avatarSrc}
            width={96}
            height={96}
            className="hero-identity__avatar"
          />
          <span className="hero-identity__status" aria-label="Available" />
        </div>
      </div>

      <div className="hero-identity__content">
        <div className="hero-identity__name-row">
          <h1 className="hero-identity__name">{profile.name}</h1>
          {profile.verified && (
            <img
              alt="Verified"
              src={profile.verified}
              width={20}
              height={20}
              className="hero-identity__verified"
            />
          )}
        </div>

        {profile.label && (
          <p className="hero-identity__label">{profile.label}</p>
        )}

        {tags.length > 0 && (
          <ul className="hero-identity__tags" aria-label="Expertise">
            {tags.map((tag) => (
              <li key={tag} className="hero-identity__tag">
                <span className="hero-identity__tag-dot" aria-hidden="true" />
                {tag}
              </li>
            ))}
          </ul>
        )}

        <div className="hero-identity__meta">
          <span className="hero-identity__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            Open Source
          </span>
          <span className="hero-identity__meta-divider" aria-hidden="true" />
          <span className="hero-identity__meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
            </svg>
            Full Stack
          </span>
        </div>
      </div>

      <div className="hero-identity__corner hero-identity__corner--tl" aria-hidden="true" />
      <div className="hero-identity__corner hero-identity__corner--br" aria-hidden="true" />
    </header>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="hero-identity hero-identity--skeleton animate-pulse-skeleton">
      <div className="hero-identity__avatar-zone">
        <div className="skeleton w-24 h-24 rounded-full" />
      </div>
      <div className="hero-identity__content">
        <div className="skeleton h-7 w-56 rounded-lg" />
        <div className="skeleton h-4 w-40 rounded-lg mt-3" />
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="skeleton h-7 w-28 rounded-full" />
          <div className="skeleton h-7 w-24 rounded-full" />
          <div className="skeleton h-7 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
