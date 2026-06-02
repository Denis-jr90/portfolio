import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              area: 800,
            },
          },
          color: {
            value: "#00ffff",
          },
          links: {
            enable: true,
            color: "#00ffff",
            distance: 150,
          },
          move: {
            enable: true,
            speed: 1.2,
          },
          size: {
            value: 2,
          },
          opacity: {
            value: 0.6,
          },
        },
        background: {
          color: "#0a0a0a",
        },
      }}
    />
  );
}