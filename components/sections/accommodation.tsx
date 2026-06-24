"use client"

import {
  Building2,
  Car,
  ExternalLink,
  Headset,
  Phone,
  Sparkles,
} from "lucide-react"
import { Cinzel } from "next/font/google"
import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import {
  coastalCardShadow,
  coastalPalette,
  displayScript,
} from "@/lib/coastal-palette"

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[100px] sm:max-w-[140px] md:max-w-[200px] lg:max-w-[240px] opacity-70"

const BLUE_SHELL_FILTER =
  `brightness(0) saturate(100%) invert(58%) sepia(18%) saturate(612%) hue-rotate(152deg) brightness(95%) contrast(88%) drop-shadow(0 4px 14px color-mix(in srgb, ${coastalPalette.blueGray} 55%, transparent))`

const OUTSIDE_TEXT = coastalPalette.cream
const OUTSIDE_TEXT_MUTED = "rgba(255, 252, 248, 0.94)"
const OUTSIDE_LABEL = "rgba(255, 252, 248, 0.82)"
const OUTSIDE_TITLE_SHADOW =
  "0 2px 8px rgba(45, 67, 79, 0.35), 0 0 20px rgba(45, 67, 79, 0.15)"

const palette = {
  heading: `color-mix(in srgb, ${coastalPalette.deep} 85%, #2A383B)`,
  body: `color-mix(in srgb, ${coastalPalette.body} 90%, #243033)`,
  label: `color-mix(in srgb, ${coastalPalette.dustyRose} 70%, ${coastalPalette.deep})`,
  accent: `color-mix(in srgb, ${coastalPalette.teal} 75%, ${coastalPalette.deep})`,
  discount: `color-mix(in srgb, ${coastalPalette.title} 80%, ${coastalPalette.deep})`,
  onAccent: coastalPalette.cream,
  divider: `color-mix(in srgb, ${coastalPalette.blueGray} 55%, white)`,
} as const

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

const ct = {
  label: "text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.18em]",
  body: "text-sm sm:text-base leading-relaxed",
  bodyLg: "text-base sm:text-lg leading-relaxed",
} as const

const glassPanelStyle = {
  backgroundColor: `color-mix(in srgb, ${coastalPalette.cream} 42%, transparent)`,
  borderColor: "rgba(255, 255, 255, 0.62)",
  boxShadow: `0 28px 72px color-mix(in srgb, ${coastalPalette.teal} 10%, transparent), 0 12px 32px color-mix(in srgb, ${coastalPalette.blueGray} 16%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.82)`,
} as const

const glassAmbientGlowStyle = {
  background: `linear-gradient(135deg, color-mix(in srgb, ${coastalPalette.blueGray} 32%, transparent) 0%, color-mix(in srgb, ${coastalPalette.dustyRose} 22%, transparent) 48%, color-mix(in srgb, ${coastalPalette.teal} 18%, transparent) 100%)`,
} as const

const cardStyle = {
  backgroundColor: `color-mix(in srgb, ${coastalPalette.cream} 78%, white)`,
  borderColor: `color-mix(in srgb, ${coastalPalette.blueGray} 42%, white)`,
  boxShadow: coastalCardShadow,
} as const

const cardWashStyle = {
  background: `linear-gradient(
    145deg,
    color-mix(in srgb, ${coastalPalette.peach} 22%, transparent) 0%,
    color-mix(in srgb, ${coastalPalette.lavenderBlue} 28%, transparent) 52%,
    color-mix(in srgb, ${coastalPalette.blueGray} 14%, transparent) 100%
  )`,
} as const

const pillBase =
  "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

function formatPhoneHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`
}

function OrnamentalRule({ light = false }: { light?: boolean }) {
  const line = light
    ? "bg-white/55"
    : `color-mix(in srgb, ${coastalPalette.blueGray} 65%, white)`

  return (
    <div className="flex items-center justify-center gap-3 pt-2 sm:pt-3">
      <span
        className={`h-px w-10 sm:w-14 ${light ? "bg-white/55" : ""}`}
        style={light ? undefined : { backgroundColor: line as string }}
      />
      <span
        className="h-1.5 w-1.5 rotate-45 rounded-[1px]"
        style={{
          backgroundColor: light
            ? "rgba(255, 252, 248, 0.75)"
            : `color-mix(in srgb, ${coastalPalette.dustyRose} 70%, white)`,
        }}
      />
      <span
        className={`h-px w-10 sm:w-14 ${light ? "bg-white/55" : ""}`}
        style={light ? undefined : { backgroundColor: line as string }}
      />
    </div>
  )
}

function CardSurface({
  children,
  className = "",
  hover = false,
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border backdrop-blur-md sm:rounded-2xl ${
        hover ? "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg" : ""
      } ${className}`}
      style={cardStyle}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl"
        style={cardWashStyle}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/60 sm:rounded-2xl"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

function FacebookPill({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={pillBase}
      style={{
        ...bodyFont,
        color: palette.accent,
        backgroundColor: `color-mix(in srgb, ${coastalPalette.lavenderBlue} 55%, white)`,
        border: `1px solid color-mix(in srgb, ${coastalPalette.blueGray} 40%, white)`,
        outlineColor: palette.accent,
      }}
    >
      <ExternalLink size={15} aria-hidden />
      Facebook
    </a>
  )
}

function PhonePill({ phone }: { phone: string }) {
  return (
    <a
      href={formatPhoneHref(phone)}
      className={pillBase}
      style={{
        ...bodyFont,
        color: palette.onAccent,
        backgroundColor: palette.accent,
        outlineColor: palette.accent,
      }}
    >
      <Phone size={15} aria-hidden />
      {phone}
    </a>
  )
}

export function Accommodation() {
  const siteConfig = useSiteConfig()
  const { accommodation } = siteConfig

  return (
    <Section
      id="accommodation"
      className="relative isolate overflow-hidden bg-transparent pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14"
    >
      {/* Shell corner decorations */}
      <div className="pointer-events-none absolute left-0 top-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/top-left-shell-deco.png"
          alt=""
          className={CORNER_DECO_CLASS}
          style={{ filter: BLUE_SHELL_FILTER }}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/decoration/right-bottom-shell-deco.png"
          alt=""
          className={CORNER_DECO_CLASS}
          style={{ filter: BLUE_SHELL_FILTER }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8 md:mb-10">
          <p
            className={`${cinzel.className} ${ct.label} mb-2 uppercase`}
            style={{ color: OUTSIDE_LABEL }}
          >
            Where to Stay
          </p>
          <h2
            className="mx-auto my-4 leading-[1.08] sm:my-5 md:my-6"
            style={{
              ...displayScript,
              fontSize: "clamp(2rem, 6.5vw, 4.25rem)",
              color: OUTSIDE_TEXT,
              letterSpacing: "0.02em",
              textShadow: OUTSIDE_TITLE_SHADOW,
            }}
          >
            Hotel &amp; Accommodation
          </h2>
          <p
            className={`${ct.bodyLg} mx-auto max-w-2xl px-2`}
            style={{ ...bodyFont, color: OUTSIDE_TEXT_MUTED }}
          >
            Here are our recommended hotels and accommodations within the area.
            Let them know that you are our wedding guest to avail their generous
            discount offers, or coordinate with our accommodation coordinator.
          </p>
          <OrnamentalRule light />
        </div>

        {/* Main glass panel */}
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-1 rounded-2xl opacity-50 blur-2xl sm:-inset-2"
            style={glassAmbientGlowStyle}
            aria-hidden
          />
          <div
            className="relative overflow-hidden rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl"
            style={glassPanelStyle}
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/35 sm:rounded-2xl"
              aria-hidden
            />

            <div className="relative z-10 space-y-4 p-3 sm:space-y-5 sm:p-4 md:p-5">
              {/* Coordinator — featured */}
              <CardSurface className="overflow-hidden">
                <div
                  className="h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${coastalPalette.peach}, ${coastalPalette.dustyRose}, ${coastalPalette.teal})`,
                  }}
                  aria-hidden
                />
                <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 md:px-7">
                  <div className="flex gap-3.5 sm:gap-4">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${coastalPalette.teal} 18%, white)`,
                        color: palette.accent,
                        border: `1px solid color-mix(in srgb, ${coastalPalette.teal} 28%, white)`,
                      }}
                    >
                      <Headset size={22} aria-hidden />
                    </div>
                    <div>
                      <p
                        className={`${cinzel.className} ${ct.label} font-semibold uppercase`}
                        style={{ color: palette.label }}
                      >
                        Accommodation Coordinator
                      </p>
                      <p
                        className={`${cinzel.className} mt-1 text-base font-semibold sm:text-lg`}
                        style={{ color: palette.heading }}
                      >
                        {accommodation.coordinator.name}
                      </p>
                      <p
                        className={`${ct.body} mt-1.5 max-w-md`}
                        style={{ ...bodyFont, color: palette.body }}
                      >
                        Reach out for help booking rooms or applying guest discounts.
                      </p>
                    </div>
                  </div>
                  <PhonePill phone={accommodation.coordinator.phone} />
                </div>
              </CardSurface>

              {/* Hotels list */}
              <ol className="space-y-3 sm:space-y-3.5">
                {accommodation.hotels.map((hotel, index) => (
                  <li key={hotel.name}>
                    <CardSurface hover className="px-4 py-4 sm:px-5 sm:py-5 md:px-6">
                      <div className="flex gap-3.5 sm:gap-4">
                        <div className="flex shrink-0 flex-col items-center gap-2">
                          <span
                            className={`${cinzel.className} flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold sm:h-9 sm:w-9`}
                            style={{
                              backgroundColor: palette.accent,
                              color: palette.onAccent,
                            }}
                            aria-hidden
                          >
                            {index + 1}
                          </span>
                          <Building2
                            size={18}
                            className="hidden opacity-40 sm:block"
                            style={{ color: palette.accent }}
                            aria-hidden
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <h3
                              className={`${cinzel.className} text-base font-semibold tracking-wide sm:text-lg md:text-xl`}
                              style={{ color: palette.heading }}
                            >
                              {hotel.name}
                            </h3>
                            {hotel.discount && (
                              <span
                                className={`${cinzel.className} inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs`}
                                style={{
                                  color: palette.discount,
                                  backgroundColor: `color-mix(in srgb, ${coastalPalette.peach} 45%, white)`,
                                  border: `1px solid color-mix(in srgb, ${coastalPalette.dustyRose} 35%, white)`,
                                }}
                              >
                                <Sparkles size={12} aria-hidden />
                                Guest discount
                              </span>
                            )}
                          </div>

                          {hotel.discount && (
                            <p
                              className={`${ct.body} mt-2.5 rounded-lg px-3 py-2.5 sm:mt-3`}
                              style={{
                                ...bodyFont,
                                color: palette.body,
                                backgroundColor: `color-mix(in srgb, ${coastalPalette.lavenderBlue} 48%, white)`,
                                border: `1px solid color-mix(in srgb, ${coastalPalette.blueGray} 35%, white)`,
                              }}
                            >
                              {hotel.discount}
                            </p>
                          )}

                          {(hotel.phone || ("facebook" in hotel && hotel.facebook)) && (
                            <div
                              className="mt-3 flex flex-wrap items-center gap-2 border-t pt-3 sm:mt-3.5 sm:gap-2.5 sm:pt-3.5"
                              style={{ borderColor: palette.divider }}
                            >
                              {hotel.phone && <PhonePill phone={hotel.phone} />}
                              {"facebook" in hotel && hotel.facebook && (
                                <FacebookPill href={hotel.facebook} />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardSurface>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Car rentals */}
        {accommodation.carRentals.length > 0 && (
          <div className="relative mt-10 sm:mt-12 md:mt-14">
            <div className="mb-5 text-center sm:mb-6 md:mb-8">
              <p
                className={`${cinzel.className} ${ct.label} mb-2 uppercase`}
                style={{ color: OUTSIDE_LABEL }}
              >
                Getting Around
              </p>
              <h3
                className={`${cinzel.className} text-xl font-semibold tracking-wide sm:text-2xl md:text-3xl`}
                style={{ color: OUTSIDE_TEXT, textShadow: OUTSIDE_TITLE_SHADOW }}
              >
                Recommended Car Rental
              </h3>
              <OrnamentalRule light />
            </div>

            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-40 blur-2xl"
                style={glassAmbientGlowStyle}
                aria-hidden
              />
              <ul className="relative space-y-3 sm:space-y-3.5">
                {accommodation.carRentals.map((rental) => (
                  <li key={rental.name}>
                    <CardSurface hover className="px-4 py-4 sm:px-5 sm:py-5 md:px-6">
                      <div className="flex items-start gap-3.5 sm:gap-4">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
                          style={{
                            backgroundColor: `color-mix(in srgb, ${coastalPalette.blueGray} 28%, white)`,
                            color: palette.accent,
                            border: `1px solid color-mix(in srgb, ${coastalPalette.blueGray} 45%, white)`,
                          }}
                        >
                          <Car size={20} aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4
                            className={`${cinzel.className} text-base font-semibold tracking-wide sm:text-lg md:text-xl`}
                            style={{ color: palette.heading }}
                          >
                            {rental.name}
                          </h4>
                          <div className="mt-2.5">
                            <FacebookPill href={rental.facebook} />
                          </div>
                        </div>
                      </div>
                    </CardSurface>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
