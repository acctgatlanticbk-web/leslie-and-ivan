"use client"

import { useEffect, useState, useMemo, type CSSProperties } from "react"
import { siteConfig as defaultSiteConfig } from "@/content/site"
import { useSiteConfig } from "@/hooks/use-site-config"
import { parseWeddingDate } from "@/lib/wedding-date"

const TEXT = "#3A5566"
const TEXT_DEEP = "#2D434F"
const ACCENT = "#9E5A5A"
const NAME_COLOR = "#6A9BB8"
const PALETTE = {
  cream: "#F1EDE2",
  sand: "#E8D5C4",
  seafoam: "#AFC8E6",
  sky: "#B8D4E3",
  blush: "#D8B0B0",
  coral: "#C98B8B",
  peach: "#E8C4B8",
  shell: "#F5E6DC",
  aqua: "#9EC5D4",
  mist: "#D4E8EF",
} as const
const PALETTE_COLORS = Object.values(PALETTE)

const BACKGROUND_IMAGE = "/decoration/oceanpastelbackground.png"
const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[240px] lg:max-w-[280px]"

const BLANK_HOLD_MS = 800
const CONTENT_DELAY_MS = 1700

const displayScript: CSSProperties = {
  fontFamily: "'Brightwall', cursive",
  fontWeight: 400,
}
const bodySerif: CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, 'Times New Roman', serif",
  fontStyle: "normal",
}
const labelSerif: CSSProperties = {
  fontFamily: "'Cinzel', 'Times New Roman', serif",
  fontStyle: "normal",
  fontWeight: 500,
}

const NAME_SHADOW =
  "0 2px 4px rgba(255, 255, 255, 0.9), 0 0 18px rgba(175, 200, 230, 0.55)"

interface AmbientOrb {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
  delay: number
  driftX: number
  driftY: number
}

interface SparkParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
  delay: number
  driftX: number
  driftY: number
  twinkleDuration: number
}

function createAmbientOrbs(count: number): AmbientOrb[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: 4 + Math.random() * 92,
    y: 6 + Math.random() * 88,
    size: 60 + Math.random() * 100,
    color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
    opacity: 0.06 + Math.random() * 0.09,
    duration: 16 + Math.random() * 14,
    delay: Math.random() * 6,
    driftX: -14 + Math.random() * 28,
    driftY: -12 + Math.random() * 24,
  }))
}

function createSparkParticles(count: number): SparkParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
    opacity: 0.18 + Math.random() * 0.22,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 10,
    driftX: -10 + Math.random() * 20,
    driftY: -12 + Math.random() * 24,
    twinkleDuration: 3 + Math.random() * 4,
  }))
}

function DottedRule({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "w-[3.25rem] border-t border-dotted md:w-[4rem]"
          : "flex-1 border-t border-dotted"
      }
      style={{ borderColor: TEXT_DEEP }}
    />
  )
}

interface HeroProps {
  visible?: boolean
}

export function Hero({ visible = false }: HeroProps) {
  const siteConfig = useSiteConfig()
  const [decorVisible, setDecorVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    if (!visible) {
      setDecorVisible(false)
      setContentVisible(false)
      return
    }

    const decorTimer = setTimeout(() => setDecorVisible(true), BLANK_HOLD_MS)
    const showTimer = setTimeout(() => setContentVisible(true), CONTENT_DELAY_MS)
    return () => {
      clearTimeout(decorTimer)
      clearTimeout(showTimer)
    }
  }, [visible])

  const fade = (delay: number): CSSProperties => ({
    transition: `opacity 0.85s ease ${delay}ms, transform 0.85s ease ${delay}ms`,
    opacity: contentVisible ? 1 : 0,
    transform: contentVisible ? "translateY(0)" : "translateY(16px)",
  })

  const groomName = siteConfig.couple.groom
  const brideName = siteConfig.couple.bride

  const ceremonyDate =
    siteConfig.ceremony.date ?? siteConfig.wedding.date ?? defaultSiteConfig.ceremony.date
  const parsedDate = useMemo(
    () =>
      parseWeddingDate(ceremonyDate, parseWeddingDate(defaultSiteConfig.ceremony.date)),
    [ceremonyDate],
  )
  const ceremonyDay = (
    siteConfig.ceremony.day ?? parsedDate.dayOfWeek ?? defaultSiteConfig.ceremony.day
  ).toUpperCase()
  const ceremonyTime =
    siteConfig.ceremony.time ??
    siteConfig.wedding.time ??
    defaultSiteConfig.ceremony.time
  const { month, day: dateNum, year } = parsedDate
  const ambientOrbs = useMemo(() => createAmbientOrbs(5), [])
  const sparkParticles = useMemo(() => createSparkParticles(16), [])

  return (
    <section
      id="home"
      className="relative isolate min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Ocean pastel background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGE}')` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.22)_52%,rgba(255,255,255,0.1)_100%)]"
        aria-hidden
      />

      {/* Soft ambient particles */}
      <div className="particle-field particle-field-visible pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        <div className="particle-gradient" />
        {ambientOrbs.map((orb) => (
          <span
            key={`orb-${orb.id}`}
            className="particle-orb"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
              ["--drift-x" as string]: `${orb.driftX}px`,
              ["--drift-y" as string]: `${orb.driftY}px`,
            }}
          />
        ))}
        {sparkParticles.map((particle) => (
          <span
            key={`spark-${particle.id}`}
            className="particle-spark"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              color: particle.color,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s, ${particle.twinkleDuration}s`,
              animationDelay: `${particle.delay}s, ${particle.delay * 0.4}s`,
              ["--drift-x" as string]: `${particle.driftX}px`,
              ["--drift-y" as string]: `${particle.driftY}px`,
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div
        className={`decor-corner decor-top-left pointer-events-none absolute left-0 top-0 z-[2]${decorVisible ? " decor-visible" : ""}`}
        style={decorVisible ? undefined : { opacity: 0, visibility: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/top-left-corner-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div
        className={`decor-corner decor-bottom-right pointer-events-none absolute bottom-0 right-0 z-[2]${decorVisible ? " decor-visible" : ""}`}
        style={decorVisible ? undefined : { opacity: 0, visibility: "hidden" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/bottom-right-corner-deco.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[360px] flex-col items-center justify-center min-h-[100dvh] px-4 pb-8 pt-[calc(2.75rem+env(safe-area-inset-top,0px))] sm:max-w-[580px] sm:px-6 sm:pb-10 sm:pt-[calc(3rem+env(safe-area-inset-top,0px))] md:px-8 md:pt-[calc(3.25rem+env(safe-area-inset-top,0px))]">
        <div
          className="w-full px-6 py-8 sm:px-8 sm:py-9 md:px-10 md:py-10"
          style={{
            background: "rgba(255, 252, 248, 0.82)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "1.25rem",
            boxShadow:
              "0 4px 28px rgba(45, 67, 79, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
            visibility: contentVisible ? "visible" : "hidden",
          }}
        >
        <div
          className="mx-auto flex w-full max-w-[320px] flex-col items-center gap-y-7 text-center sm:max-w-[460px] sm:gap-y-8 md:max-w-[500px] md:gap-y-9"
          style={{
            color: TEXT,
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {/* SAVE THE DATE — arch */}
          <div style={{ ...fade(0) }} className="w-full mt-6 sm:mt-7 md:mt-8 -mb-3 sm:-mb-4">
            <div className="leading-none">
            <svg
              viewBox="0 0 300 100"
              className="mx-auto block h-[58px] w-full md:hidden"
              aria-hidden
              overflow="visible"
            >
              <defs>
                <path id="heroArcMob" d="M 6 80 A 178 178 0 0 1 294 80" fill="none" />
              </defs>
              <text fill={TEXT_DEEP} style={{ ...labelSerif, fontSize: "22px", letterSpacing: "0.28em" }}>
                <textPath href="#heroArcMob" startOffset="50%" textAnchor="middle">
                  SAVE THE DATE
                </textPath>
              </text>
            </svg>

            <svg
              viewBox="0 0 480 130"
              className="mx-auto hidden h-[82px] w-full md:block"
              aria-hidden
              overflow="visible"
            >
              <defs>
                <path id="heroArcDsk" d="M 10 104 A 280 280 0 0 1 470 104" fill="none" />
              </defs>
              <text fill={TEXT_DEEP} style={{ ...labelSerif, fontSize: "34px", letterSpacing: "0.26em" }}>
                <textPath href="#heroArcDsk" startOffset="50%" textAnchor="middle">
                  SAVE THE DATE
                </textPath>
              </text>
            </svg>
            </div>
          </div>

          {/* Invitation copy */}
          <div style={{ ...fade(100) }} className="flex w-full flex-col items-center">
            <div className="flex w-full max-w-[320px] items-center justify-center gap-2 md:max-w-[420px]">
              <DottedRule compact />
              <p
                className="shrink-0 text-[11px] leading-snug md:text-[13px]"
                style={{ ...bodySerif, color: TEXT_DEEP, fontStyle: "italic" }}
              >
                With grateful hearts and the blessing of our families,
              </p>
              <DottedRule compact />
            </div>
          </div>

          {/* Couple names */}
          <div style={{ ...fade(220) }} className="flex w-full flex-col items-center gap-5 sm:gap-6">
            <h1
              className="w-full px-1 leading-[1.2]"
              style={{
                ...displayScript,
                fontSize: "clamp(32px, 8.5vw, 46px)",
                color: NAME_COLOR,
                fontWeight: 400,
                letterSpacing: "0.01em",
                textShadow: NAME_SHADOW,
              }}
            >
              {groomName}
            </h1>

            <div className="flex w-full max-w-[200px] items-center justify-center gap-2.5 md:max-w-[240px] md:gap-3">
              <DottedRule compact />
              <span
                className="shrink-0 text-[12px] italic md:text-[14px]"
                style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
              >
                and
              </span>
              <DottedRule compact />
            </div>

            <h1
              className="w-full px-1 leading-[1.2]"
              style={{
                ...displayScript,
                fontSize: "clamp(32px, 8.5vw, 46px)",
                color: NAME_COLOR,
                fontWeight: 400,
                letterSpacing: "0.01em",
                textShadow: NAME_SHADOW,
              }}
            >
              {brideName}
            </h1>
          </div>

          {/* Invitation body */}
          <div style={{ ...fade(520) }} className="w-full">
            <p
              className="w-full text-[13px] leading-[1.75] md:text-[15px] md:leading-[1.85]"
              style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
            >
              joyfully invite you to share in the happiness of our wedding day as we promise a
              lifetime of love, faith, and devotion before God and the people dearest to our hearts
              in the Sacrament of Matrimony
            </p>
          </div>

          {/* Date block */}
          <div style={{ ...fade(620) }} className="w-full">
            <div
              className="mx-auto grid w-full max-w-[300px] gap-y-0 md:max-w-[400px]"
              style={{
                gridTemplateColumns: "1fr auto 1fr",
                gridTemplateRows: "auto auto auto",
              }}
            >
              <div
                className="col-start-2 row-start-1 border-x border-t border-dotted px-1.5 pb-0 pt-0.5 text-center md:px-2"
                style={{ borderColor: TEXT_DEEP }}
              >
                <span
                  className="text-[10px] tracking-[0.18em] uppercase md:text-[12px]"
                  style={{ ...labelSerif, color: TEXT_DEEP }}
                >
                  {month}
                </span>
              </div>

              <div className="col-start-1 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
                <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
                <span
                  className="text-center text-[10px] tracking-[0.14em] uppercase md:text-[12px]"
                  style={{ ...labelSerif, color: TEXT_DEEP }}
                >
                  {ceremonyDay}
                </span>
                <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
              </div>

              <div
                className="col-start-2 row-start-2 flex items-center justify-center border-x border-dotted px-1 pb-0 pt-0 md:px-1.5"
                style={{ borderColor: TEXT_DEEP }}
              >
                <span
                  className="leading-[0.85]"
                  style={{
                    ...labelSerif,
                    fontSize: "clamp(48px, 13vw, 64px)",
                    color: ACCENT,
                    fontWeight: 600,
                  }}
                >
                  {dateNum}
                </span>
              </div>

              <div className="col-start-3 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
                <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
                <span
                  className="mx-auto max-w-[5.75rem] text-center text-[10px] leading-[1.4] tracking-[0.14em] uppercase md:max-w-[7.25rem] md:text-[12px]"
                  style={{ ...labelSerif, color: TEXT_DEEP }}
                >
                  At {ceremonyTime}
                </span>
                <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
              </div>

              <div
                className="col-start-2 row-start-3 border-x border-b border-dotted px-1.5 pb-0.5 pt-0 text-center md:px-2"
                style={{ borderColor: TEXT_DEEP }}
              >
                <span
                  className="text-[14px] leading-none tracking-[0.1em] md:text-[18px]"
                  style={{ ...labelSerif, color: TEXT_DEEP, fontWeight: 600 }}
                >
                  {year}
                </span>
              </div>
            </div>
          </div>

          {/* at / venue */}
          <div style={{ ...fade(720) }} className="flex w-full flex-col items-center">
            <div className="flex items-center justify-center gap-1.5 md:gap-2">
              <DottedRule compact />
              <span
                className="text-[13px] italic md:text-[15px]"
                style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
              >
                at
              </span>
              <DottedRule compact />
            </div>
            <p
              className="mt-3 text-[13px] leading-relaxed tracking-[0.1em] uppercase md:mt-3.5 md:text-[15px]"
              style={{ ...labelSerif, color: TEXT_DEEP, fontWeight: 600 }}
            >
              {siteConfig.ceremony.location}
            </p>
            <p
              className="mt-1.5 text-[13px] leading-relaxed md:text-[15px]"
              style={{ ...bodySerif, color: TEXT }}
            >
              {siteConfig.ceremony.venue}
            </p>
          </div>

          {/* Call-to-action */}
          <div style={{ ...fade(840) }} className="flex w-full flex-col items-center gap-5 px-1 sm:gap-6">
            <p
              className="text-[13px] leading-[1.75] md:text-[15px] md:leading-[1.85]"
              style={{ ...bodySerif, color: TEXT, fontStyle: "italic" }}
            >
              As we begin this beautiful new chapter together, your presence, prayers, and love
              would mean so much to us.
            </p>

            <div className="flex w-full flex-col items-center gap-2.5 pt-1 sm:gap-3">
              <div className="flex w-full max-w-[280px] items-center justify-center gap-2 md:max-w-[340px] md:gap-2.5">
                <DottedRule compact />
                <span
                  className="shrink-0 text-[10px] tracking-[0.16em] uppercase md:text-[12px]"
                  style={{ ...labelSerif, color: TEXT_DEEP, fontWeight: 600 }}
                >
                  Reception to follow
                </span>
                <DottedRule compact />
              </div>
              <p
                className="text-[13px] leading-relaxed tracking-[0.1em] uppercase md:text-[15px]"
                style={{ ...labelSerif, color: TEXT_DEEP, fontWeight: 600 }}
              >
                {siteConfig.reception.location}
              </p>
              <p
                className="text-[13px] leading-relaxed md:text-[15px]"
                style={{ ...bodySerif, color: TEXT }}
              >
                {siteConfig.reception.venue?.trim()}
              </p>
            </div>

            <a
              href="#guest-list"
              className="group relative mt-1 w-full sm:min-w-[200px] md:min-w-[220px] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AFC8E6]/50"
              style={{
                backgroundColor: NAME_COLOR,
                boxShadow: "0 10px 24px rgba(106, 155, 184, 0.28)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = PALETTE.seafoam
                e.currentTarget.style.boxShadow = "0 12px 28px rgba(175, 200, 230, 0.35)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = NAME_COLOR
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(106, 155, 184, 0.28)"
              }}
            >
              <span
                className="relative z-10 inline-flex h-full min-h-[3rem] sm:min-h-[3.25rem] w-full items-center justify-center px-6 sm:px-8 text-[0.65rem] sm:text-[0.7rem] md:text-xs uppercase tracking-[0.22em] sm:tracking-[0.26em] font-semibold transition-all duration-300"
                style={{ ...labelSerif, fontWeight: 600, color: PALETTE.cream }}
              >
                Confirm Attendance
              </span>
            </a>
          </div>
        </div>
        </div>
      </div>

      <style jsx>{`
        .decor-corner {
          opacity: 0;
          will-change: transform, opacity;
        }

        .decor-top-left {
          transform: translate(-12%, -12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.06s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.06s;
        }

        .decor-bottom-right {
          transform: translate(12%, 12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.22s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
        }

        .decor-corner.decor-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .particle-field {
          opacity: 0.55;
          animation: particleFieldIntro 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .particle-field-visible {
          opacity: 0.55;
        }

        @keyframes particleFieldIntro {
          0% {
            opacity: 0.45;
          }
          100% {
            opacity: 0.55;
          }
        }

        .particle-gradient {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 14% 18%, ${PALETTE.seafoam}28 0%, transparent 40%),
            radial-gradient(circle at 86% 14%, ${PALETTE.blush}24 0%, transparent 38%),
            radial-gradient(circle at 78% 82%, ${PALETTE.peach}22 0%, transparent 42%),
            radial-gradient(circle at 20% 78%, ${PALETTE.mist}30 0%, transparent 38%),
            radial-gradient(circle at 50% 50%, ${PALETTE.sand}20 0%, transparent 52%);
          animation: gradientBreath 22s ease-in-out infinite alternate;
        }

        .particle-orb,
        .particle-spark {
          position: absolute;
          border-radius: 9999px;
          will-change: transform, opacity;
          animation-name: particleDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .particle-orb {
          filter: blur(38px);
          transform: translate3d(-50%, -50%, 0);
        }

        .particle-spark {
          transform: translate3d(-50%, -50%, 0);
          box-shadow: 0 0 6px color-mix(in srgb, currentColor 35%, transparent);
          animation-name: particleDrift, particleTwinkleOpacity;
        }

        @keyframes particleTwinkleOpacity {
          0%, 100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.45;
          }
        }

        @keyframes gradientBreath {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.06) translate3d(0, -1.5%, 0);
            opacity: 1;
          }
        }

        @keyframes particleDrift {
          0% {
            transform: translate3d(calc(-50% + 0px), calc(-50% + 0px), 0);
          }
          100% {
            transform: translate3d(
              calc(-50% + var(--drift-x, 12px)),
              calc(-50% + var(--drift-y, -18px)),
              0
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-field {
            animation: none !important;
            opacity: 0.55;
          }

          .particle-gradient,
          .particle-orb,
          .particle-spark {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
