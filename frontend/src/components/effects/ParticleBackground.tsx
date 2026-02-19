"use client"

import { useCallback, useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

export function ParticleBackground() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: ["#06b6d4", "#a855f7", "#22d3ee"],
          },
          links: {
            color: "#06b6d4",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              height: 800,
              width: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  )
}