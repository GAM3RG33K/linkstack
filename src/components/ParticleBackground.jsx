import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [prefersReducedMotion]);

  const options = useMemo(
    () => ({
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
          resize: true,
        },
        modes: {
          push: { particles_nb: 2 },
          repulse: { distance: 150, duration: 0.4 },
        },
      },
      particles: {
        color: { value: "#ffffff" },
        links: {
          color: "#ffffff",
          distance: 140,
          enable: true,
          opacity: 0.12,
          width: 1,
        },
        move: {
          bounce: false,
          direction: "none",
          enable: true,
          outMode: "out",
          random: false,
          speed: 0.6,
          straight: false,
        },
        number: { density: { enable: true, area: 1200 }, value: 60 },
        opacity: { value: 0.25 },
        shape: { type: "circle" },
        size: { random: true, value: 1.5 },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="fixed inset-0 z-0"
      />
    );
  }

  return <></>;
};

export default ParticleBackground;
