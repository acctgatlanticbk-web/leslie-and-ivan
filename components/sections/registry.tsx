"use client"

import { useState } from "react"
import { Cinzel } from "next/font/google"
import localFont from "next/font/local"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const OUTSIDE_TEXT = "#FFFFFF"
const OUTSIDE_TEXT_MUTED = "rgba(255, 255, 255, 0.88)"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 6px rgba(0, 0, 0, 0.28), 0 0 18px rgba(0, 0, 0, 0.12)"
const READABLE_SHADOW = "0 1px 3px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35)"

const outsideDividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.55), transparent)",
} as const

const ct = {
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
  label: "text-[11px] sm:text-xs md:text-sm",
} as const

function OutsideDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span className="h-px w-6 sm:w-10" style={outsideDividerLineStyle} />
      <span className="h-0.5 w-0.5 rounded-full bg-white/50 sm:h-1 sm:w-1" aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(255, 255, 255, 0.55), transparent)",
        }}
      />
    </div>
  )
}

function RegistryTitle() {
  return (
    <h2
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.1rem, 4.5vw, 2.25rem)",
          "--script-overlap": "clamp(-0.65rem, -2.8vw, -1.5rem)",
        } as React.CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em]`}
        style={{
          fontSize: "var(--title-size)",
          color: OUTSIDE_TEXT,
          textShadow: OUTSIDE_TITLE_SHADOW,
        }}
      >
        Gift Guide
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: OUTSIDE_TEXT_MUTED,
          textShadow: OUTSIDE_TITLE_SHADOW,
        }}
      >
        With gratitude
      </span>
      <span className="sr-only">With gratitude</span>
    </h2>
  )
}

export function Registry() {
  const siteConfig = useSiteConfig()
  const registryItems = Object.values(siteConfig.giftRegistry ?? {})
  const [activeQr, setActiveQr] = useState(registryItems[0]?.id ?? "")
  const activeItem = registryItems.find((item) => item.id === activeQr) ?? registryItems[0]
  const { brideNickname, groomNickname } = siteConfig.couple

  return (
    <section
      id="registry"
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative z-10 bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14`}
    >
      <div className="relative z-20 mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        <div className="relative z-20 px-6 text-center sm:px-10 md:px-12">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OutsideDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <RegistryTitle />
          </div>
          <p
            className={`font-goudy-italic ${ct.bodyLg} mx-auto mt-4 max-w-2xl whitespace-pre-line leading-relaxed px-2 sm:mt-5 md:mt-6`}
            style={{ color: OUTSIDE_TEXT_MUTED, textShadow: READABLE_SHADOW }}
          >
            {`As love is what this day is all about,\nyour presence is already the greatest gift we could ever ask for.\nHowever, if you'd like to give, a monetary gift toward our future would be most appreciated.`}
          </p>
          <div className="flex items-center justify-center pt-3 sm:pt-4">
            <span className="h-px w-16 sm:w-24 md:w-32 bg-white/50" />
          </div>
        </div>

        {registryItems.length > 0 && activeItem && (
          <div className="mt-6 text-center sm:mt-8 md:mt-10">
            {registryItems.length > 1 && (
              <div className="mb-5 flex flex-wrap items-center justify-center gap-2 sm:mb-6">
                {registryItems.map((item) => {
                  const isActive = item.id === activeQr
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveQr(item.id)}
                      className={`${cinzel.className} rounded-sm border px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-[0.6875rem] sm:tracking-[0.2em]`}
                      style={
                        isActive
                          ? {
                              backgroundColor: "rgba(255, 255, 255, 0.92)",
                              borderColor: "rgba(255, 255, 255, 0.95)",
                              color: "var(--color-welcome-navy)",
                            }
                          : {
                              backgroundColor: "rgba(255, 255, 255, 0.12)",
                              borderColor: "rgba(255, 255, 255, 0.45)",
                              color: OUTSIDE_TEXT,
                              textShadow: READABLE_SHADOW,
                            }
                      }
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            )}

            <p
              className={`${cinzel.className} ${ct.label} mb-4 font-semibold uppercase tracking-[0.18em] sm:mb-5`}
              style={{ color: OUTSIDE_TEXT, textShadow: READABLE_SHADOW }}
            >
              {activeItem.label}
            </p>

            <div className="mx-auto mb-4 inline-flex sm:mb-5">
              <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56">
                <Image
                  src={activeItem.src}
                  alt={`${activeItem.label} QR code`}
                  fill
                  className="rounded-lg object-contain"
                  sizes="(max-width: 640px) 176px, 224px"
                />
              </div>
            </div>

            {activeItem.accountNumber && (
              <div className="mx-auto max-w-sm">
                <p
                  className={`${cinzel.className} ${ct.label} mb-1 font-semibold uppercase tracking-[0.14em]`}
                  style={{ color: OUTSIDE_TEXT, textShadow: READABLE_SHADOW }}
                >
                  Account Details
                </p>
                <p
                  className={`font-goudy-italic ${ct.body} leading-relaxed`}
                  style={{ color: OUTSIDE_TEXT_MUTED, textShadow: READABLE_SHADOW }}
                >
                  {activeItem.accountNumber}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 space-y-2 text-center sm:mt-8">
          <p
            className={`font-goudy-italic ${ct.body}`}
            style={{ color: OUTSIDE_TEXT_MUTED, textShadow: READABLE_SHADOW }}
          >
            Thank you from the bottom of our hearts.
          </p>
          <p
            className={`font-goudy-italic ${ct.body} italic`}
            style={{ color: OUTSIDE_TEXT_MUTED, textShadow: READABLE_SHADOW }}
          >
            With love,
            <br />
            {brideNickname} and {groomNickname}
          </p>
        </div>
      </div>
    </section>
  )
}