'use client'

import { useEffect, useState } from 'react'

export function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 6000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Cinematic backdrop - MCU inspired */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-lg"
        style={{
          animation: 'cinemaFade 1.2s ease-out 4.8s forwards'
        }}
      />

      {/* Animated rays of light */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: '2px',
              height: '200%',
              background: `linear-gradient(180deg, transparent, oklch(0.72 0.28 70 / 0.3), transparent)`,
              left: `${(i / 8) * 100}%`,
              top: '-50%',
              animation: `rayShine 2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
              transformOrigin: 'center'
            }}
          />
        ))}
      </div>

      {/* Welcome content - cinematic style */}
      <div className="relative text-center space-y-8 z-10">
        {/* Animated energy rings - expanding circles */}
        <div className="absolute inset-0 flex items-center justify-center -z-20">
          {[1, 2, 3, 4].map((ring) => (
            <div
              key={ring}
              className="absolute rounded-full border"
              style={{
                width: `${100 + ring * 150}px`,
                height: `${100 + ring * 150}px`,
                borderColor: ring % 2 === 0 ? 'oklch(0.72 0.28 70 / 0.2)' : 'oklch(0.68 0.32 260 / 0.15)',
                animation: `ringExpand 5s ease-out forwards`,
                animationDelay: `${ring * 0.3}s`
              }}
            />
          ))}
        </div>

        {/* Main welcome text with dramatic reveal */}
        <div className="space-y-6">
          <div style={{ animation: 'welcomeReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both' }}>
            <h1 className="text-7xl md:text-8xl font-black tracking-wider" style={{
              background: 'linear-gradient(135deg, oklch(0.72 0.28 70), oklch(0.68 0.32 260))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px oklch(0.72 0.28 70 / 0.5)',
              filter: 'drop-shadow(0 0 30px oklch(0.72 0.28 70 / 0.4))',
              fontWeight: 900,
              letterSpacing: '0.1em'
            }}>
              WELCOME
            </h1>
          </div>

          <div style={{ animation: 'welcomeReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both' }}>
            <p className="text-2xl md:text-3xl font-bold tracking-wide" style={{
              color: 'oklch(0.68 0.32 260)',
              textShadow: '0 0 25px oklch(0.68 0.32 260 / 0.6)'
            }}>
              TO SURAJIT'S DIGITAL SPACE
            </p>
          </div>

          <div style={{ animation: 'welcomeReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both' }}>
            <p className="text-lg md:text-xl text-foreground/70 tracking-widest uppercase font-medium">
              Exploring AI, IoT, and Design
            </p>
          </div>
        </div>

        {/* Animated energy particles */}
        <div className="flex items-center justify-center gap-4 pt-8" style={{ animation: 'welcomeReveal 1.2s ease-out 1.1s both' }}>
          <div className="inline-flex gap-4">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="rounded-full"
                style={{ 
                  width: '12px',
                  height: '12px',
                  backgroundColor: dot % 2 === 0 ? 'oklch(0.72 0.28 70)' : 'oklch(0.68 0.32 260)',
                  animation: 'particlePulse 2.5s ease-in-out infinite',
                  boxShadow: dot % 2 === 0 ? '0 0 20px oklch(0.72 0.28 70 / 0.8)' : '0 0 20px oklch(0.68 0.32 260 / 0.8)',
                  animationDelay: `${dot * 0.4}s`
                }} 
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cinemaFade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes ringExpand {
          0% {
            opacity: 1;
            transform: scale(0.2);
          }
          100% {
            opacity: 0;
            transform: scale(1);
          }
        }

        @keyframes welcomeReveal {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.5);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes particlePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.5;
          }
        }

        @keyframes rayShine {
          0% {
            opacity: 0;
            transform: scaleY(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  )
}
