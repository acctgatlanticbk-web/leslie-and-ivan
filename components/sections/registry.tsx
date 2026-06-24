"use client"

import { useState } from "react"
import { Section } from "@/components/section"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import {
  coastalPalette,
  displayScript,
} from "@/lib/coastal-palette"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const OUTSIDE_TEXT = coastalPalette.cream
const OUTSIDE_TEXT_MUTED = "rgba(255, 252, 248, 0.88)"
const OUTSIDE_LABEL = "rgba(255, 252, 248, 0.72)"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  body: "text-xs sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
} as const

const cardStyle = {
  background: `linear-gradient(
    155deg,
    color-mix(in srgb, ${coastalPalette.peach} 88%, white) 0%,
    color-mix(in srgb, ${coastalPalette.lavenderBlue} 92%, white) 50%,
    color-mix(in srgb, ${coastalPalette.blueGray} 55%, white) 100%
  )`,
  borderColor: `color-mix(in srgb, ${coastalPalette.dustyRose} 38%, white)`,
  boxShadow: `0 16px 48px color-mix(in srgb, ${coastalPalette.teal} 14%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.72)`,
} as const

export function Registry() {
  const siteConfig = useSiteConfig()
  const gcashQr = Object.values(siteConfig.giftRegistry ?? {})
  const [activeQr, setActiveQr] = useState(gcashQr[0]?.id ?? "")
  const activeItem = gcashQr.find((i) => i.id === activeQr) ?? gcashQr[0]

  return (
    <Section
      id="registry"
      className="relative bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header — on silk backdrop */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p
            className={`${cinzel.className} ${ct.label} uppercase tracking-[0.2em] sm:tracking-[0.24em] mb-2`}
            style={{ color: OUTSIDE_LABEL }}
          >
            With Gratitude
          </p>
          <h2
            className="mx-auto my-4 whitespace-nowrap leading-[1.08] sm:my-5 md:my-6"
            style={{
              ...displayScript,
              fontSize: "clamp(2rem, 6.5vw, 4.25rem)",
              color: OUTSIDE_TEXT,
              letterSpacing: "0.02em",
              textShadow: OUTSIDE_TITLE_SHADOW,
            }}
          >
            Gift Guide
          </h2>
          <p
            className={`${ct.bodyLg} max-w-2xl mx-auto leading-relaxed px-2 italic`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
           As love is what this day is all about,
your presence is already the
greatest gift we could ever ask for.
However, if you’d like to give, a
monetary gift toward our future
would be most appreciated
          </p>
          <div className="flex items-center justify-center pt-2 sm:pt-3">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

    

        <div className="text-center mt-6 sm:mt-8 space-y-2">
          <p className={ct.body} style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}>
            Thank you from the bottom of our hearts.
          </p>
          <p className={`${ct.body} italic`} style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}>
            With love,
            <br />
            {siteConfig.couple.brideNickname} and {siteConfig.couple.groomNickname}
          </p>
        </div>
      </div>
    </Section>
  )
}
