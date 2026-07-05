"use client"

import { Section } from "@/components/section"
import { useState, useEffect, type ReactNode } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import {
  Shirt,
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"

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

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px]"

const detailText = {
  body: "var(--color-welcome-text)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
} as const

const cardStyle = {
  background: "var(--color-welcome-bg)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
} as const

const softPanelStyle = {
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)",
  backgroundColor: "var(--color-welcome-bg-soft)",
} as const

const QR_FG = "#5E6D5A"
const QR_BG = "#FAF7F2"

function SectionIconDivider({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-1 sm:pt-2">
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      {icon}
      <span
        className="h-px w-8 sm:w-12 md:w-16"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

function DetailsTitle() {
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
          color: "var(--color-welcome-navy)",
        }}
      >
        Event Details
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9]`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: "var(--color-motif-accent)",
          textShadow:
            "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)",
        }}
      >
        our special day
      </span>
      <span className="sr-only">our special day</span>
    </h2>
  )
}

// Slightly compact type inside card containers (not the page header)
const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  labelSm: "text-[10px] sm:text-[11px] md:text-xs",
  body: "text-xs sm:text-sm md:text-base",
  bodyMd: "text-xs sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
  subhead: "text-xs sm:text-sm md:text-base lg:text-lg",
  time: "text-xs sm:text-sm md:text-base lg:text-xl",
  cardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlayTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlaySub: "text-xs sm:text-sm md:text-base",
  month: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  dayNum: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
  year: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  sectionTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  attireCardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  btn: "text-xs sm:text-sm md:text-base",
  noteTitle: "text-xl sm:text-2xl md:text-3xl",
  reminderHead: "text-base sm:text-lg md:text-xl",
  reminderBody: "text-xs sm:text-sm md:text-base lg:text-lg",
} as const

const attireGuide = {
  sponsors: {
    image: "/Details/guest.png",
    imageAspect: "669/373",
    ladies: {
      colors: ["#7C8D69","#A8B4A3","#F4ECE6","#D1B581","#3F4B3E"] as const,
      description: "Semi-Formal : Sage Green, Olive, Eucalyptus, Ivory, Champagne or Gold",
    },
    gentlemen: {
      colors: ["#7C8D69","#A8B4A3","#F4ECE6","#D1B581","#3F4B3E"] as const,
      description: "Semi-Formal : Long Sleeves Sage Green, Olive, or Champagne",
    },
  },
  entourage: {
    image: "/Details/birdalParty.png",
    imageAspect: "669/373",
    ladies: {
      colors: ["#ADB79E", "#07361A", "#767D54"] as const,
      description: "Sage Green, Forest Green, Moss Green",
    },
    gentlemen: {
      colors: ["#494947"] as const,
      description: "Charcoal Gray",
    },
  },
  guests: {
    image: "/Details/principalSponsors.png",
    imageAspect: "677/369",
    ladies: {
      colors: ["#FDCD7A"] as const,
      description: "Marigold",
    },
    gentlemen: {
      colors: ["#E7DECA", "#C7B7A1"] as const,
      description: "Cream Suit / Beige Barong",
    },
  },
  guests2: {
    image: "/Details/guest.png",
    imageAspect: "677/369",
    ladies: {
      colors: ["#630B18", "#441218", "#493326"] as const,
      description: "Burgundy, Maroon, Dark Brown",
    },
    gentlemen: {
      colors: ["#630B18", "#441218", "#493326"] as const,
      description: "Burgundy, Maroon, Dark Brown",
    },
  },
} as const

function ColorPalette({ colors }: { colors: readonly string[] }) {
  const widthClass = colors.length > 4 ? "max-w-md" : "max-w-xs sm:max-w-sm"

  return (
    <div
      className={`mx-auto flex h-8 w-full overflow-hidden rounded-full border-2 border-white sm:h-9 ${widthClass}`}
      role="img"
      aria-label={`Color palette: ${colors.join(", ")}`}
    >
      {colors.map((color) => (
        <div
          key={color}
          className="min-w-0 flex-1"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  )
}

function AttirePaletteGroup({
  label,
  colors,
  description,
}: {
  label: string
  colors: readonly string[]
  description: string
}) {
  return (
    <div className="space-y-2 sm:space-y-2.5">
      <p
        className={`${cinzel.className} text-center ${ct.labelSm} uppercase tracking-[0.16em] font-semibold`}
        style={{ color: detailText.label }}
      >
        {label}
      </p>
      <ColorPalette colors={colors} />
      <p
        className={`font-goudy-italic ${ct.body} px-1 text-center leading-relaxed`}
        style={{ color: detailText.body }}
      >
        {description}
      </p>
    </div>
  )
}

function AttireCard({
  title,
  image,
  alt,
  imageAspect,
  children,
  imageClassName = "object-contain object-center",
}: {
  title: string
  image: string
  alt: string
  imageAspect: string
  children: ReactNode
  imageClassName?: string
}) {
  return (
    <div className="relative group h-full">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, var(--color-welcome-green) 18%, transparent), transparent)",
        }}
      />
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300 sm:rounded-2xl"
        style={cardStyle}
      >
        <div
          className="border-b px-4 py-3 sm:px-5 sm:py-4"
          style={{ borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)" }}
        >
          <h4
            className={`${cinzel.className} ${ct.attireCardTitle} text-center uppercase tracking-[0.22em] font-semibold leading-tight`}
            style={{ color: detailText.heading }}
          >
            {title}
          </h4>
        </div>

        <div
          className="relative w-full shrink-0 bg-[#FAF7F2]"
          style={{ aspectRatio: imageAspect }}
        >
          <Image
            src={image}
            alt={alt}
            fill
            className={`${imageClassName} p-2 transition-transform duration-700 group-hover:scale-[1.01] sm:p-3`}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>

        <div
          className="flex flex-1 flex-col border-t px-4 py-4 sm:px-5 sm:py-5 md:px-6"
          style={{ borderColor: "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)" }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

type EventVenueCardProps = {
  badge: string
  images: string[]
  activeImageIndex: number
  locationName: string
  venueAddress: string
  venueDetail?: string
  day: string
  dateString: string
  time: string
  venueSectionLabel: string
  mapsLink: string
  copyId: string
  fullVenue: string
  copiedItems: Set<string>
  onCopy: (text: string, id: string) => void
  onOpenMaps: (link: string) => void
  showDateDetails?: boolean
}

function EventVenueCard({
  badge,
  images,
  activeImageIndex,
  locationName,
  venueAddress,
  venueDetail,
  day,
  dateString,
  time,
  venueSectionLabel,
  mapsLink,
  copyId,
  fullVenue,
  copiedItems,
  onCopy,
  onOpenMaps,
  showDateDetails = true,
}: EventVenueCardProps) {
  const eventDate = showDateDetails ? new Date(dateString) : null

  return (
    <div className="relative group">
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to bottom right, color-mix(in srgb, var(--color-welcome-green) 15%, transparent), transparent)",
        }}
      />

      <div
        className="relative rounded-xl sm:rounded-2xl overflow-hidden border transition-all duration-300"
        style={cardStyle}
      >
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
          {images.length === 1 ? (
            <Image
              src={images[0]}
              alt={locationName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
              priority
            />
          ) : (
            images.map((src, index) => {
              const isActive = index === activeImageIndex
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(0.45,0.05,0.55,0.95)] ${
                    isActive
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-[1.06] z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={src}
                    alt={locationName}
                    fill
                    className={`object-cover transition-transform duration-[9000ms] ease-out ${
                      isActive ? "scale-[1.08] group-hover:scale-[1.12]" : "scale-100"
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              )
            })
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20 pointer-events-none" />

          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6 z-30">
            <span className={`${cinzel.className} inline-block mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/30`}>
              {badge}
            </span>
            <h3 className={`${theSeasons.className} text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-1.5 drop-shadow-lg uppercase tracking-[0.12em] leading-tight`}>
              {locationName}
            </h3>
            <p className={`${theSeasons.className} text-[10px] sm:text-xs md:text-sm lg:text-base text-white/95 drop-shadow-md tracking-[0.06em] leading-snug`}>
              {venueAddress}
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-5 md:p-7 lg:p-9">
          <div className="text-center mb-5 sm:mb-8 md:mb-10 space-y-2 sm:space-y-2.5 md:space-y-3">
            {showDateDetails && eventDate && (
              <>
                <p
                  className={`${cinzel.className} ${ct.label} font-semibold uppercase tracking-[0.2em]`}
                  style={{ color: detailText.heading }}
                >
                  {day}
                </p>

                <p
                  className={`${cinzel.className} ${ct.month} font-semibold leading-none`}
                  style={{ color: detailText.heading }}
                >
                  {eventDate.toLocaleString("default", { month: "long" })}
                </p>

                <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 py-1 sm:py-2">
                  <p
                    className={`${cinzel.className} ${ct.dayNum} font-semibold leading-none`}
                    style={{ color: detailText.accent }}
                  >
                    {eventDate.getDate()}
                  </p>
                  <div
                    className="h-10 sm:h-12 md:h-14 w-[2px] rounded-full"
                    style={{ backgroundColor: "var(--color-welcome-green)" }}
                  />
                  <p
                    className={`${cinzel.className} ${ct.year} font-semibold leading-none`}
                    style={{ color: detailText.heading }}
                  >
                    {eventDate.getFullYear()}
                  </p>
                </div>
              </>
            )}

            <p
              className={`${cinzel.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-[0.14em] uppercase ${showDateDetails ? "" : "py-2 sm:py-3"}`}
              style={{ color: detailText.heading }}
            >
              At {time}
            </p>
          </div>

          <div className="rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border" style={softPanelStyle}>
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: detailText.accent }} />
              <div className="flex-1 min-w-0">
                <p className={`${cinzel.className} ${ct.label} font-semibold mb-1.5 sm:mb-2 uppercase tracking-wide`} style={{ color: detailText.label }}>
                  {venueSectionLabel}
                </p>
                <p className={`${theSeasons.className} text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-snug tracking-[0.06em] uppercase`} style={{ color: detailText.heading }}>
                  {locationName}
                </p>
                {venueDetail && (
                  <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-wide`} style={{ color: detailText.label }}>
                    {venueDetail}
                  </p>
                )}
                <p className={`${theSeasons.className} ${ct.body} leading-relaxed mt-1 tracking-[0.04em]`} style={{ color: detailText.body }}>
                  {venueAddress}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                <div
                  className="p-1.5 sm:p-2 md:p-2.5 rounded-lg border shadow-sm"
                  style={{
                    backgroundColor: "var(--color-welcome-bg)",
                    borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
                  }}
                >
                  <QRCodeSVG
                    value={mapsLink}
                    size={80}
                    level="M"
                    includeMargin={false}
                    fgColor={QR_FG}
                    bgColor={QR_BG}
                  />
                </div>
                <p className={`font-goudy-italic ${ct.label} text-center max-w-[90px]`} style={{ color: detailText.label }}>
                  Scan for directions
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => onOpenMaps(mapsLink)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 rounded-full border font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                backgroundColor: "var(--color-welcome-green)",
                borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
                color: "var(--color-welcome-bg)",
                boxShadow:
                  "0 6px 20px color-mix(in srgb, var(--color-welcome-green) 35%, transparent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-navy)"
                e.currentTarget.style.borderColor = "var(--color-welcome-green)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-welcome-green)"
                e.currentTarget.style.borderColor =
                  "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)"
              }}
              aria-label={`Get directions to ${badge.toLowerCase()} venue`}
            >
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>Get Directions</span>
            </button>
            <button
              type="button"
              onClick={() => onCopy(fullVenue, copyId)}
              className={`${cinzel.className} flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 border-2 rounded-full font-semibold uppercase tracking-[0.12em] ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
              style={{
                color: detailText.heading,
                backgroundColor: "var(--color-welcome-bg-soft)",
                borderColor: "color-mix(in srgb, var(--color-motif-deep) 20%, transparent)",
              }}
              aria-label={`Copy ${badge.toLowerCase()} venue address`}
            >
              {copiedItems.has(copyId) ? (
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: "var(--color-welcome-green)" }} />
              ) : (
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
              )}
              <span>{copiedItems.has(copyId) ? "Copied!" : "Copy Address"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Colors sourced from globals.css @theme inline — edit there to update everywhere

export function Details() {
  const siteConfig = useSiteConfig()
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentCeremonyImageIndex, setCurrentCeremonyImageIndex] = useState(0)
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)
  
  const coupleImages = [
    "/gallery-design/box (1).jpg",
    "/gallery-design/box (2).jpg",
    "/gallery-design/box (3).jpg",
    "/gallery-design/box (5).jpg",
  ]

  const ceremonyImages = siteConfig.ceremony.image
  const receptionImages = siteConfig.reception.image
  const dressCodeColors = siteConfig.dressCode.colors.split(",").map((color) => color.trim())

  useEffect(() => {
    if (ceremonyImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentCeremonyImageIndex((prev) => (prev + 1) % ceremonyImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [ceremonyImages.length])

  useEffect(() => {
    if (receptionImages.length <= 1) return
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [receptionImages.length])

  // Gentle reminders couple photos — subtle carousel + wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coupleImages.length)
      setRotationOffset((prev) => (prev + 10) % 360)
    }, 2600)

    return () => clearInterval(interval)
  }, [coupleImages.length])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = siteConfig.ceremony.map

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink =
    siteConfig.reception.map ||
    `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue
  const formattedCeremonyDate = siteConfig.ceremony.date
  const formattedReceptionDate = siteConfig.reception.date

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <div
      className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative w-full`}
      style={{ background: "var(--color-welcome-bg)" }}
    >
      <Section
        id="details"
        className="relative z-10 pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-12 md:pb-12 lg:pt-14 lg:pb-14 overflow-hidden"
      >
        {/* Corner decorations */}
        <div className="pointer-events-none absolute left-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/left-top-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/right-top-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/left-bottom-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/right-bottom-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>

        {/* Header */}
        <div className="relative z-20 mb-6 px-6 text-center sm:mb-8 sm:px-10 md:mb-10 md:px-12">
          <p
            className={`${cinzel.className} mb-2 text-[0.525rem] font-semibold uppercase tracking-[0.34em] min-[400px]:text-[0.55rem] min-[400px]:tracking-[0.38em] sm:text-[0.575rem] sm:tracking-[0.44em]`}
            style={{ color: "var(--color-welcome-heading)" }}
          >
            Our Celebration
          </p>
          <div className="my-4 sm:my-5 md:my-6">
            <DetailsTitle />
          </div>
          <p
            className="font-goudy-italic mx-auto max-w-2xl px-2 text-[0.75rem] leading-[1.62] sm:text-[0.8125rem] sm:leading-[1.65] md:text-[0.84375rem]"
            style={{ color: "var(--color-welcome-text)" }}
          >
            Everything you need to know about our special day.
          </p>

          <SectionIconDivider
            icon={
              <MapPin
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: "var(--color-welcome-green)" }}
                aria-hidden
              />
            }
          />
        </div>

      {/* Venue and Event Information */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 md:mb-12 space-y-6 sm:space-y-10 md:space-y-14">
        <EventVenueCard
          badge="Ceremony"
          images={ceremonyImages}
          activeImageIndex={currentCeremonyImageIndex}
          locationName={ceremonyVenueName}
          venueAddress={ceremonyAddress}
          venueDetail={ceremonyVenueDetail}
          day={siteConfig.ceremony.day}
          dateString={siteConfig.ceremony.date}
          time={siteConfig.ceremony.time}
          venueSectionLabel="Ceremony Venue"
          mapsLink={ceremonyMapsLink}
          copyId="ceremony"
          fullVenue={ceremonyVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />

        <EventVenueCard
          badge="Reception"
          images={receptionImages}
          activeImageIndex={currentReceptionImageIndex}
          locationName={receptionVenueName}
          venueAddress={receptionAddress}
          venueDetail={receptionVenueDetail}
          day={siteConfig.reception.day}
          dateString={siteConfig.reception.date}
          time={siteConfig.reception.time}
          showDateDetails={false}
          venueSectionLabel="Reception Venue"
          mapsLink={receptionMapsLink}
          copyId="reception"
          fullVenue={receptionVenue}
          copiedItems={copiedItems}
          onCopy={copyToClipboard}
          onOpenMaps={openInMaps}
        />
       
      </div>

      {/* Attire Guidelines */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <SectionIconDivider
            icon={
              <Shirt
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                style={{ color: "var(--color-welcome-green)" }}
                aria-hidden
              />
            }
          />
          <h3
            className={`${theSeasons.className} ${ct.sectionTitle} mt-3 uppercase font-semibold leading-tight tracking-[0.12em] sm:mt-4 md:tracking-[0.15em]`}
            style={{ color: "var(--color-welcome-navy)" }}
          >
            Attire Guidelines
          </h3>
          <p
            className={`font-goudy-italic ${ct.bodyLg} mt-3 leading-relaxed sm:mt-4`}
            style={{ color: "var(--color-welcome-text)" }}
          >
            Please dress according to the guidelines below.
          </p>
        </div>

        {/* Attire cards — Sponsors, Entourage & Guests */}
        <div className="mb-6 grid grid-cols-1 items-start gap-6 sm:mb-8 sm:gap-8 md:mb-10 lg:grid-cols-3">
          <AttireCard
            title="Guest"
            image={attireGuide.sponsors.image}
            imageAspect={attireGuide.sponsors.imageAspect}
            alt="Principal sponsor attire guide"
          >
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <AttirePaletteGroup
                label="Ladies"
                colors={attireGuide.sponsors.ladies.colors}
                description={attireGuide.sponsors.ladies.description}
              />
              <AttirePaletteGroup
                label="Gentlemen"
                colors={attireGuide.sponsors.gentlemen.colors}
                description={attireGuide.sponsors.gentlemen.description}
              />
            </div>
          </AttireCard>

          {/* <AttireCard
            title="Guest"
            image={attireGuide.entourage.image}
            imageAspect={attireGuide.entourage.imageAspect}
            alt="Guest attire guide"
          >
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <AttirePaletteGroup
                label="Ladies"
                colors={attireGuide.entourage.ladies.colors}
                description={attireGuide.entourage.ladies.description}
              />
              <AttirePaletteGroup
                label="Gentlemen"
                colors={attireGuide.entourage.gentlemen.colors}
                description={attireGuide.entourage.gentlemen.description}
              />
            </div>
          </AttireCard> */}

          {/* <AttireCard
            title="Principal Sponsors"
            image={attireGuide.guests.image}
            imageAspect={attireGuide.guests.imageAspect}
            alt="Principal Sponsors attire guide"
          >
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <AttirePaletteGroup
                label="Ladies"
                colors={attireGuide.guests.ladies.colors}
                description={attireGuide.guests.ladies.description}
              />
              <AttirePaletteGroup
                label="Gentlemen"
                colors={attireGuide.guests.gentlemen.colors}
                description={attireGuide.guests.gentlemen.description}
              />
            </div>
          </AttireCard> */}
          {/* <AttireCard
            title="Guests"
            image={attireGuide.guests2.image}
            imageAspect={attireGuide.guests2.imageAspect}
            alt="Guests attire guide"
          >
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
              <AttirePaletteGroup
                label="Ladies"
                colors={attireGuide.guests2.ladies.colors}
                description={attireGuide.guests2.ladies.description}
              />
              <AttirePaletteGroup
                label="Gentlemen"
                colors={attireGuide.guests2.gentlemen.colors}
                description={attireGuide.guests2.gentlemen.description}
              />
            </div>
          </AttireCard> */}
        </div>

        {/* <div
          className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border shadow-sm"
          style={cardStyle}
        >
          <p className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] text-center mb-3 sm:mb-4 font-semibold`} style={{ color: detailText.label }}>
            Note to Sponsors, Entourage & Guests
          </p>
          <ul className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
            <li className="flex gap-3 items-start">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: "var(--color-welcome-green)" }}
              />
              <p className={`font-goudy-italic ${ct.body} leading-relaxed`} style={{ color: detailText.body }}>
                Please wear comfortable footwear fit for outdoor reception.
              </p>
            </li>
          </ul>
        </div> */}

        {/* Gentle Reminders */}
        

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(91,102,85,0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-motif-deep rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "var(--color-motif-cream)" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, var(--color-motif-cream), var(--color-motif-cream), var(--color-motif-deep))" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-motif-accent backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)", color: "var(--color-motif-cream)" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="var(--color-motif-cream)" style={{ color: "var(--color-motif-cream)" }} />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Ceremony Venue
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-motif-cream" />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "var(--color-motif-deep)" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={
                  showImageModal === "ceremony"
                    ? ceremonyImages[currentCeremonyImageIndex] ?? ceremonyImages[0]
                    : receptionImages[currentReceptionImageIndex] ?? receptionImages[0]
                }
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className="relative border-t-2 p-5 sm:p-6 md:p-8 bg-motif-deep backdrop-blur-sm"
              style={{ borderColor: "var(--color-motif-cream)" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-motif-cream/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "var(--color-motif-cream)" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-motif-cream" fill="var(--color-motif-cream)" />
                      ) : (
                        <Utensils className="w-6 h-6 text-motif-cream" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70 text-motif-cream">
                      <MapPin className="w-4 h-4 text-motif-cream" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream shrink-0" />
                        <span>
                          {formattedCeremonyDate} at {siteConfig.ceremony.time}
                        </span>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-motif-deep border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-motif-accent whitespace-nowrap text-motif-cream"
                      title="Copy address"
                      style={{ borderColor: "var(--color-motif-cream)" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-motif-cream text-motif-deep"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65 text-motif-cream">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     
      </div>
      </Section>
    </div>
  )
}