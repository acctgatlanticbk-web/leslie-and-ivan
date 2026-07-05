'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const HERO_VIDEO_SRC =
  '/background_music/Green Leaves Close Up  Moving Background Video.mp4';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

// Palette mapped directly to the motif CSS vars defined in globals.css
// --color-motif-cream   #F7FAF6  mist white with sage tint
// --color-motif-yellow  #CDB47B  soft antique gold
// --color-motif-soft    #E6EFE7  pale sage
// --color-motif-accent  #A8B89E  muted sage
// --color-motif-deep    #5E6D5A  deep olive green
// --color-motif-medium  #8FA58A  classic sage
// --color-motif-silver  #FFFFFF  pure white
const palette = {
  deep:    'var(--color-motif-deep)',
  medium:  'var(--color-motif-medium)',
  accent:  'var(--color-motif-accent)',
  cream:   'var(--color-motif-cream)',
  soft:    'var(--color-motif-soft)',
  silver:  'var(--color-motif-silver)',
  yellow:  'var(--color-motif-yellow)',
  welcomeGreen: 'var(--color-welcome-green)',
};

// Raw RGB values for rgba() where CSS vars cannot be used
const hex = {
  deep:   '94, 109, 90',    // #5E6D5A
  medium: '143, 165, 138',  // #8FA58A
  accent: '168, 184, 158',  // #A8B89E
  cream:  '247, 250, 246',  // #F7FAF6
  soft:   '230, 239, 231',  // #E6EFE7
  silver: '255, 255, 255',  // #FFFFFF
  yellow: '205, 180, 123',  // #CDB47B
};


export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (visible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setContentVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setContentVisible(false);
    }
  }, [visible]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentleFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
      <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Top sage veil — deep olive fades into muted sage, then clears */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(${hex.deep}, 0.52) 0%,
              rgba(${hex.medium}, 0.28) 28%,
              rgba(${hex.accent}, 0.10) 50%,
              transparent 68%
            )`
          }}
        />

        {/* Bottom olive scrim — lifts text off the moving foliage */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(${hex.deep}, 0.92) 0%,
              rgba(${hex.deep}, 0.72) 18%,
              rgba(${hex.medium}, 0.48) 38%,
              rgba(${hex.deep}, 0.18) 58%,
              transparent 78%
            )`
          }}
        />

        {/* Soft mist wash — ties video into the cream motif */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              165deg,
              rgba(${hex.cream}, 0.14) 0%,
              rgba(${hex.soft}, 0.08) 42%,
              rgba(${hex.deep}, 0.10) 100%
            )`
          }}
        />

        {/* Vignette — olive edges draw the eye to the centre */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              ellipse at center,
              transparent 24%,
              rgba(${hex.medium}, 0.22) 62%,
              rgba(${hex.deep}, 0.46) 100%
            )`
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div 
          className={`mb-auto mt-8 transition-all duration-1000 ease-out ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Monogram Image with subtle animation */}
            <div 
              className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 transition-transform duration-700 ease-out hover:scale-105"
              style={{
                animation: contentVisible ? 'gentleFloat 3s ease-in-out infinite' : 'none'
              }}
            >
              <Image
                src="/monogram/monogram.png"
                alt="Monogram"
                fill
                className="object-contain"
                priority
                style={{
                  filter: `brightness(0) saturate(100%) invert(100%) drop-shadow(0 6px 18px rgba(${hex.deep}, 0.55)) drop-shadow(0 0 24px rgba(${hex.yellow}, 0.35))`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="relative flex flex-col items-center justify-end w-full gap-5 sm:gap-6 pb-14 sm:pb-16 md:pb-20">
          <div
            className="absolute inset-x-[-1.5rem] bottom-[-2rem] top-[-1rem] pointer-events-none rounded-[2rem]"
            style={{
              background: `linear-gradient(
                to top,
                rgba(${hex.deep}, 0.55) 0%,
                rgba(${hex.deep}, 0.28) 45%,
                transparent 100%
              )`,
            }}
            aria-hidden
          />

          <h2
            className={`relative text-6xl md:text-8xl transform -rotate-6 transition-all duration-1000 ease-out delay-200 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: palette.silver,
              textShadow: `0 0 24px rgba(${hex.cream}, 0.95), 0 2px 10px rgba(${hex.deep}, 0.75), 0 4px 24px rgba(${hex.deep}, 0.55)`,
            }}
          >
            You are
          </h2>
          
          <h1
            className={`relative text-5xl md:text-7xl font-bold tracking-wider uppercase transition-all duration-1000 ease-out delay-300 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: palette.cream,
              textShadow: `0 0 28px rgba(${hex.silver}, 0.95), 0 2px 12px rgba(${hex.deep}, 0.80), 0 6px 28px rgba(${hex.deep}, 0.60)`,
              letterSpacing: '0.05em',
            }}
          >
            Invited!
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className={`relative px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm border transition-all duration-500 ease-out delay-500 shadow-lg hover:shadow-xl ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              backgroundColor: palette.welcomeGreen,
              borderColor: palette.yellow,
              color: palette.cream,
              boxShadow: `0 8px 24px rgba(${hex.deep}, 0.35)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = palette.medium;
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = palette.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = palette.welcomeGreen;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = palette.yellow;
            }}
          >
            <span
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 500, color: palette.cream, letterSpacing: '0.18em' }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};