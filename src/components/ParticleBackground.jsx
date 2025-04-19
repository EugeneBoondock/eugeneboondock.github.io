import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

function ParticleBackground() {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  const options = {
    background: {
      color: {
        value: "#1a1a1a", // Match body background
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false, // Disable click interaction
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "repulse", // Particles move away on hover
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff", // White particles
      },
      links: {
        color: "#ffffff", // White links
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, // Number of particles
      },
      opacity: {
        value: 0.5, // Particle opacity
      },
      shape: {
        type: "circle", // Circle shape for particles
      },
      size: {
        value: { min: 1, max: 5 }, // Particle size range
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
}

export default ParticleBackground;
