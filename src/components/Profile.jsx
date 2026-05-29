import { useCallback, useState } from "react";
import analytics from "../utils/analytics";
import LinkPanel, { LinkPanelSkeleton } from "./LinkPanel";
import ProfileHeader, { ProfileHeaderSkeleton } from "./ProfileHeader";
import SocialStrip, { SocialStripSkeleton } from "./SocialStrip";

function LoadingSkeleton() {
  return (
    <div className="profile-stack mx-auto py-20 px-4">
      <ProfileHeaderSkeleton />
      <LinkPanelSkeleton />
      <SocialStripSkeleton />
    </div>
  );
}

function Profile({ data, loading, error }) {
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const handleShare = async () => {
    const valueToShare = "https://links.harshjoshi.dev";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Share this page", url: valueToShare });
        analytics.track("share_clicked", { method: "native" });
      } else {
        await navigator.clipboard.writeText(valueToShare);
        setShowCopyAlert(true);
        setTimeout(() => setShowCopyAlert(false), 2000);
        analytics.track("share_clicked", { method: "clipboard" });
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        analytics.track("share_error", { error: err.message });
      }
    }
  };

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  if (loading) return <LoadingSkeleton />;

  const { profile, links, socials } = data;

  return (
    <div className="relative z-10 w-full min-h-dvh flex flex-col items-center justify-center px-4 py-16 sm:py-24">
      {/* Share FAB */}
      <button
        onClick={handleShare}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1] text-text-secondary hover:text-text-primary hover:bg-white/[0.1] hover:border-white/[0.2] hover:shadow-lg hover:shadow-accent/10 transition-all duration-200 active:scale-95"
        aria-label="Share this page"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button>

      {/* Copy toast */}
      {showCopyAlert && (
        <div className="fixed bottom-24 right-6 z-50 bg-surface/95 text-text-primary px-4 py-2.5 rounded-xl text-sm font-medium backdrop-blur-md border border-white/[0.08] shadow-lg animate-fade-in-up">
          Link copied!
        </div>
      )}

      <div className="profile-stack mx-auto animate-fade-in-up">
        <ProfileHeader profile={profile} onMouseMove={handleMouseMove} />
        <LinkPanel links={links} onMouseMove={handleMouseMove} startIndex={2} />
        <SocialStrip
          socials={socials}
          onMouseMove={handleMouseMove}
          startIndex={(links?.length ?? 0) + 3}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-text-secondary space-y-1.5 animate-fade-in-up stagger-9">
        <p>
          Built with <span className="text-pink-500">♥</span> by{" "}
          <a href="https://harshjoshi.dev" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            harshjoshi.dev
          </a>
        </p>
         <p>
          Copyrights @2026 - Harshvardhan Joshi
        </p>
      </div>
    </div>
  );
}

export default Profile;
