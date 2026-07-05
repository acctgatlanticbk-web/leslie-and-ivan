"use client"

import { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect, Suspense, type CSSProperties, type ReactNode } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import {
  Heart,
  Check,
  X,
  Sparkles,
} from "lucide-react"
import localFont from "next/font/local"
import { Cinzel } from "next/font/google"
import { useSiteConfig } from "@/hooks/use-site-config"
import { LoadingScreen } from "@/components/loader/LoadingScreen"
import { getRoleSingular } from "@/lib/proposal-roles"
import { parseWeddingDate } from "@/lib/wedding-date"
import { siteConfig as defaultSiteConfig } from "@/content/site"
import type { ProposalRole, ProposalResponse } from "@/lib/proposal-types"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
})

const theSeasons = localFont({
  src: "../Font/Fontspring-DEMO-theseasons-reg.otf",
  display: "swap",
  variable: "--font-the-seasons",
})

const aboveTheBeyond = localFont({
  src: "../Font/above-the-beyond-script.otf",
  display: "swap",
  variable: "--font-above-beyond",
})

const palette = {
  body: "var(--color-welcome-text)",
  bodySoft: "var(--color-welcome-text-soft)",
  heading: "var(--color-welcome-navy)",
  label: "var(--color-welcome-heading)",
  accent: "var(--color-welcome-green)",
  script: "var(--color-welcome-script)",
} as const

const NAME_SHADOW =
  "0 1px 0 color-mix(in srgb, var(--color-welcome-bg) 95%, white), 0 0 10px color-mix(in srgb, var(--color-welcome-bg) 65%, white)"

const BORDER_SOFT = "color-mix(in srgb, var(--color-motif-deep) 10%, transparent)"
const INNER_SURFACE = "var(--color-welcome-bg-soft)"

const CORNER_DECO_CLASS =
  "block h-auto w-auto max-w-[120px] sm:max-w-[180px] md:max-w-[260px] lg:max-w-[320px] xl:max-w-[380px]"

const ambientGlowStyle = {
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--color-motif-deep) 18%, transparent) 0%, color-mix(in srgb, var(--color-welcome-green) 12%, transparent) 48%, color-mix(in srgb, var(--color-motif-deep) 10%, transparent) 100%)",
} as const

const dividerLineStyle = {
  background:
    "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent), transparent)",
} as const

const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  sectionTitle: "text-[10px] sm:text-xs md:text-sm lg:text-base",
  body: "text-xs sm:text-sm md:text-base",
  bodyLg: "text-sm sm:text-base md:text-lg",
} as const

const nameStyle: CSSProperties = {
  fontSize: "clamp(0.6875rem, 2.55vw, 1.0625rem)",
  lineHeight: 1.3,
}

const cardStyle: CSSProperties = {
  background: "var(--color-welcome-bg)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 14%, transparent)",
  borderWidth: "1px",
  borderStyle: "solid",
  boxShadow:
    "0 8px 28px color-mix(in srgb, var(--color-motif-deep) 7%, transparent), inset 0 1px 0 color-mix(in srgb, white 70%, transparent)",
}

const primaryBtnStyle: CSSProperties = {
  fontWeight: 600,
  backgroundColor: "var(--color-welcome-green)",
  borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
  color: "var(--color-welcome-bg)",
  boxShadow: "0 6px 20px color-mix(in srgb, var(--color-motif-deep) 12%, transparent)",
}

const secondaryBtnStyle: CSSProperties = {
  fontWeight: 600,
  color: "var(--color-welcome-navy)",
  backgroundColor: "var(--color-welcome-bg-soft)",
  borderColor: "color-mix(in srgb, var(--color-motif-deep) 18%, transparent)",
}

const labelStyle = (color: string, extra?: CSSProperties): CSSProperties => ({
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 600,
  color,
  ...extra,
})

function LayeredProposalTitle({
  main,
  script,
  titleSize = "clamp(1.55rem, 4.1vw + 0.65rem, 4.5rem)",
  scriptSize = "clamp(1rem, 4vw, 2rem)",
  scriptOverlap = "clamp(-0.6rem, -2.5vw, -1.35rem)",
  scriptClassName = "",
}: {
  main: string
  script: string
  titleSize?: string
  scriptSize?: string
  scriptOverlap?: string
  scriptClassName?: string
}) {
  return (
    <h2
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": titleSize,
          "--script-size": scriptSize,
          "--script-overlap": scriptOverlap,
        } as CSSProperties
      }
    >
      <span
        className={`${theSeasons.className} block uppercase leading-[0.78] tracking-[0.08em] min-[400px]:tracking-[0.11em] sm:tracking-[0.15em] md:tracking-[0.18em]`}
        style={{
          fontSize: "var(--title-size)",
          color: palette.heading,
        }}
      >
        {main}
      </span>
      <span
        aria-hidden
        className={`${aboveTheBeyond.className} relative z-10 mx-auto block w-fit max-w-full px-1 leading-[0.88] sm:leading-[0.9] ${scriptClassName}`}
        style={{
          marginTop: "var(--script-overlap)",
          fontSize: "var(--script-size)",
          color: "#5E6D5A",
          textShadow: NAME_SHADOW,
        }}
      >
        {script}
      </span>
      <span className="sr-only">{script}</span>
    </h2>
  )
}

function ProposalSaveTheDateTitle() {
  return <LayeredProposalTitle main="Save The Date" script="for our wedding day" />
}

function ProposalRoleTitle({ roleSingular }: { roleSingular: string }) {
  return (
    <div className="mx-auto w-full max-w-xl space-y-3 text-center sm:space-y-4">
      <p
        className={`${cinzel.className} ${ct.sectionTitle} font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em]`}
        style={{ color: palette.label }}
      >
        Will You Be Our
      </p>

      <div className="flex items-center justify-center gap-3">
        {/* <InlineDivider compact />
        <span
          className={`${aboveTheBeyond.className} shrink-0 text-[clamp(1rem,3vw,1.35rem)] leading-none`}
          style={{ color: palette.accent }}
          aria-hidden
        >
          &
        </span>
        <InlineDivider compact /> */}
      </div>

      <h2
        className={`${theSeasons.className} capitalize leading-[1.1] tracking-[0.06em] sm:tracking-[0.08em] [overflow-wrap:anywhere]`}
        style={{
          fontSize: "clamp(2rem, 8.5vw, 3.75rem)",
          color: palette.heading,
          textShadow: NAME_SHADOW,
        }}
      >
        {roleSingular}?
      </h2>
    </div>
  )
}

function CoupleNameImage({
  groom,
  bride,
  className = "",
}: {
  groom: string
  bride: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={`${groom} and ${bride}`}
      className={`relative mx-auto aspect-[528/473] w-full max-w-[min(88vw,18rem)] sm:max-w-xs md:max-w-sm drop-shadow-[0_10px_28px_rgba(45,67,79,0.14)] ${className}`}
      style={{
        backgroundColor: "#5E6D5A",
        WebkitMaskImage: "url(/Details/coupleName.png)",
        maskImage: "url(/Details/coupleName.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  )
}

function DividerLine({ className = "w-16 sm:w-24 md:w-32" }: { className?: string }) {
  return <span className={`h-px ${className}`} style={dividerLineStyle} aria-hidden />
}

function InlineDivider({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className={compact ? "h-px w-6 sm:w-10" : "h-px flex-1"}
      style={dividerLineStyle}
      aria-hidden
    />
  )
}

function ProposalCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-50 blur-2xl sm:-inset-2"
          style={ambientGlowStyle}
          aria-hidden
        />
        <div
          className="relative overflow-hidden rounded-xl border backdrop-blur-xl sm:rounded-2xl sm:backdrop-blur-2xl"
          style={cardStyle}
        >
          {/* <div className="pointer-events-none absolute left-0 top-0 z-10">
          
            <img
              src="/decoration/deco/top-left-corner-deco.png"
              alt=""
              className={CORNER_DECO_CLASS}
            />
          </div> */}
          {/* <div className="pointer-events-none absolute right-0 top-0 z-10">
          
            <img
              src="/decoration/deco/top-right-corner-deco.png"
              alt=""
              className={CORNER_DECO_CLASS}
            />
          </div> */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/decoration/deco/bottom-left-corner-deco.png"
              alt=""
              className={CORNER_DECO_CLASS}
            />
          </div>
          <div className="pointer-events-none absolute bottom-0 right-0 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/decoration/deco/bottom-right-corner-deco.png"
              alt=""
              className={CORNER_DECO_CLASS}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--color-motif-deep) 8%, transparent), transparent 45%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/35 sm:rounded-2xl"
            aria-hidden
          />

          <div className="relative z-20 p-6 text-center sm:p-10 md:p-12 md:py-14 lg:p-14 lg:py-16">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProposalIntroSection() {
  const siteConfig = useSiteConfig()

  const groomNickname = siteConfig.couple.groomNickname || siteConfig.couple.groom
  const brideNickname = siteConfig.couple.brideNickname || siteConfig.couple.bride
  const ceremonyDate =
    siteConfig.ceremony.date ?? siteConfig.wedding.date ?? defaultSiteConfig.ceremony.date
  const parsedDate = useMemo(
    () => parseWeddingDate(ceremonyDate, parseWeddingDate(defaultSiteConfig.ceremony.date)),
    [ceremonyDate],
  )
  const ceremonyDay = (
    siteConfig.ceremony.day ?? parsedDate.dayOfWeek ?? defaultSiteConfig.ceremony.day
  ).toUpperCase()
  const ceremonyTime =
    siteConfig.ceremony.time ?? siteConfig.wedding.time ?? defaultSiteConfig.ceremony.time
  const { month, day: dateNum, year } = parsedDate

  return (
    <div
      className="mx-auto w-full max-w-[310px] space-y-5 text-center sm:space-y-6 md:max-w-[520px] md:space-y-7"
      style={{ color: palette.body, WebkitFontSmoothing: "antialiased" }}
    >
      <div className="my-2 sm:my-3 md:my-4">
        <ProposalSaveTheDateTitle />
      </div>

      <p
        className={`font-goudy-italic mx-auto max-w-xl px-2 ${ct.bodyLg} leading-[1.62] sm:leading-[1.65]`}
        style={{ color: palette.body }}
      >
        With joy in our hearts, we ask you to stand with us at their wedding celebration.
        Together with their families, they warmly invite you to share in this special day.
      </p>

      <div className="flex items-center justify-center pt-1 sm:pt-2">
        <DividerLine />
      </div>

      <CoupleNameImage groom={groomNickname} bride={brideNickname} className="my-1 sm:my-2" />

      {/* Date block */}
      <div className="w-full">
        <div
          className="mx-auto grid w-full max-w-[260px] gap-y-0 md:max-w-[340px]"
          style={{
            gridTemplateColumns: "1fr auto 1fr",
            gridTemplateRows: "auto auto auto",
          }}
        >
          <div
            className="col-start-2 row-start-1 border-x border-t border-dotted px-1.5 pb-0 pt-0.5 text-center md:px-2"
            style={{ borderColor: palette.heading }}
          >
            <span
              className="text-[10px] tracking-[0.18em] uppercase md:text-[12px]"
              style={labelStyle(palette.heading)}
            >
              {month}
            </span>
          </div>

          <div className="col-start-1 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
            <div className="border-t border-dotted" style={{ borderColor: palette.heading }} />
            <span
              className="text-center text-[10px] tracking-[0.14em] uppercase md:text-[12px]"
              style={labelStyle(palette.heading)}
            >
              {ceremonyDay}
            </span>
            <div className="border-t border-dotted" style={{ borderColor: palette.heading }} />
          </div>

          <div
            className="col-start-2 row-start-2 flex items-center justify-center border-x border-dotted px-1 pb-0 pt-0 md:px-1.5"
            style={{ borderColor: palette.heading }}
          >
            <span
              className="leading-[0.85]"
              style={labelStyle(palette.heading, {
                fontSize: "clamp(48px, 13vw, 64px)",
                color: palette.accent,
              })}
            >
              {dateNum}
            </span>
          </div>

          <div className="col-start-3 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
            <div className="border-t border-dotted" style={{ borderColor: palette.heading }} />
            <span
              className="whitespace-nowrap text-center text-[10px] tracking-[0.14em] uppercase md:text-[12px]"
              style={labelStyle(palette.heading)}
            >
              At {ceremonyTime}
            </span>
            <div className="border-t border-dotted" style={{ borderColor: palette.heading }} />
          </div>

          <div
            className="col-start-2 row-start-3 border-x border-b border-dotted px-1.5 pb-0.5 pt-0 text-center md:px-2"
            style={{ borderColor: palette.heading }}
          >
            <span
              className="text-[14px] leading-none tracking-[0.1em] md:text-[18px]"
              style={labelStyle(palette.heading)}
            >
              {year}
            </span>
          </div>
        </div>
      </div>

      {/* Venue */}
      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full items-center justify-center gap-2">
          <InlineDivider compact />
          <span
            className={`font-goudy-italic shrink-0 ${ct.body}`}
            style={{ color: palette.body }}
          >
            at
          </span>
          <InlineDivider compact />
        </div>
        <p
          className={`${cinzel.className} ${ct.sectionTitle} font-semibold uppercase tracking-[0.1em] sm:tracking-[0.14em]`}
          style={{ color: palette.heading }}
        >
          {siteConfig.ceremony.location}
        </p>
      </div>
    </div>
  )
}

const primaryBtnClass =
  `${cinzel.className} cursor-pointer rounded-sm border px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.24em] md:px-8 md:py-4 md:tracking-[0.28em]`

const secondaryBtnClass =
  `${cinzel.className} cursor-pointer rounded-sm border px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:px-7 sm:py-3.5 sm:text-xs sm:tracking-[0.24em] md:px-8 md:py-4 md:tracking-[0.28em]`

function ProposalAskSection({
  roleSingular,
  description,
  coAttendants,
  onYes,
  onNo,
}: {
  roleSingular: string
  description: string
  coAttendants: string[]
  onYes: () => void
  onNo: () => void
}) {
  const questionRef = useRef<HTMLDivElement>(null)
  const [questionHeight, setQuestionHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    const node = questionRef.current
    if (!node) return

    const syncHeight = () => {
      setQuestionHeight(node.getBoundingClientRect().height)
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(node)

    return () => observer.disconnect()
  }, [roleSingular, description])

  return (
    <div className="relative mx-auto mt-0 w-full sm:mt-10">
      {coAttendants.length > 0 && (
        <div
          className="mx-auto mb-8 max-w-lg space-y-3 rounded-xl px-5 py-4 text-center sm:px-6 sm:py-5"
          style={{ border: `1px solid ${BORDER_SOFT}`, backgroundColor: INNER_SURFACE }}
        >
          <div
            className={`${cinzel.className} flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase sm:text-xs`}
            style={labelStyle(palette.label)}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Co-members standing in this position</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {coAttendants.map((name, idx) => (
              <span
                key={idx}
                className="font-goudy-italic rounded-full px-3 py-1 text-xs shadow-sm"
                style={{ color: palette.body, border: `1px solid ${BORDER_SOFT}`, backgroundColor: "var(--color-welcome-bg)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className="relative pt-2 sm:pt-12"
      >
        <div className="mb-6 flex items-center justify-center sm:mb-8">
          <DividerLine className="w-full max-w-md" />
        </div>
        <div className="relative mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-8 md:gap-10">
          {/* Question + quote — text wraps around floated image on mobile */}
          <div className="relative z-10 min-w-0 flex-1 text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
              className="pointer-events-none relative float-right ml-3 mb-2 h-[clamp(240px,62vw,340px)] w-[44%] max-w-[190px] shrink-0 sm:hidden"
              style={{ shapeOutside: "margin-box" }}
            >
              <Image
                src="/Details/ourguest.png"
                alt=""
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_48px_rgba(42,37,32,0.12)]"
                sizes="44vw"
                priority
              />
            </motion.div>

            <div ref={questionRef} className="mx-auto w-full max-w-xl space-y-5 sm:space-y-6">
              <ProposalRoleTitle roleSingular={roleSingular} />

              <p
                className={`font-goudy-italic mx-auto max-w-lg ${ct.bodyLg} leading-[1.8] sm:leading-[1.9] sm:text-left`}
                style={{ color: palette.body }}
              >
                &ldquo;{description}&rdquo;
              </p>
            </div>

            <div className="clear-both mt-10 hidden w-full flex-row gap-3 sm:mt-12 sm:flex sm:max-w-md md:mt-14">
              <button
                onClick={onYes}
                className={`${primaryBtnClass} min-w-0 flex-1`}
                style={primaryBtnStyle}
              >
                Yes, I&apos;d Be Honored
              </button>
              <button
                onClick={onNo}
                className={`${secondaryBtnClass} min-w-0 flex-1`}
                style={secondaryBtnStyle}
              >
                Regretfully Decline
              </button>
            </div>
          </div>

          {/* Couple illustration — desktop */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
            style={
              questionHeight
                ? ({ "--ask-image-h": `${questionHeight}px` } as CSSProperties)
                : undefined
            }
            className="pointer-events-none relative hidden shrink-0 sm:block sm:w-[min(36vw,240px)] md:w-[min(32vw,280px)] lg:w-[300px]"
          >
            <div
              className="relative w-full sm:aspect-[3/4] sm:translate-y-4 md:translate-y-6"
              style={questionHeight ? { minHeight: "var(--ask-image-h)" } : undefined}
            >
              <Image
                src="/Details/guestnew.png"
                alt=""
                fill
                className="object-contain object-bottom drop-shadow-[0_20px_48px_rgba(42,37,32,0.12)]"
                sizes="(max-width: 640px) 44vw, 300px"
                priority
              />
            </div>
          </motion.div>

          <div className="flex w-full flex-row gap-2.5 sm:hidden">
            <button
              onClick={onYes}
              className={`${primaryBtnClass} min-h-11 min-w-0 flex-1 px-4 py-3.5`}
              style={primaryBtnStyle}
            >
              Yes
            </button>
            <button
              onClick={onNo}
              className={`${secondaryBtnClass} min-h-11 min-w-0 flex-1 px-4 py-3.5`}
              style={secondaryBtnStyle}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type ProposalFlowState =
  | "question"
  | "yes_details"
  | "yes_submitted"
  | "no_clicked"
  | "no_submitted"

interface ProposalPageProps {
  role: ProposalRole
}

export function ProposalPage({ role }: ProposalPageProps) {
  const [isReady, setIsReady] = useState(false)
  const [flowState, setFlowState] = useState<ProposalFlowState>("question")
  const [preferredName, setPreferredName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [responses, setResponses] = useState<ProposalResponse[]>([])

  const handleLoadingComplete = useCallback(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    fetch("/api/proposal-responses", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setResponses(Array.isArray(data) ? data : []))
      .catch(() => setResponses([]))
  }, [])

  const coAttendants = responses
    .filter((r) => r.role === role.id && r.status === "Confirmed")
    .map((r) => r.name || "A Secret Supporter")

  const submitResponse = async (status: "Confirmed" | "Declined", name: string) => {
    const response = await fetch("/api/proposal-responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: role.id,
        name,
        status,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit response")
    }

    window.dispatchEvent(new Event("entourageUpdated"))
  }

  const handleYesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!preferredName.trim()) {
      setValidationError(
        "Please type your preferred name so we can add it to our invitation."
      )
      return
    }
    setValidationError("")
    setSubmitting(true)

    try {
      await submitResponse("Confirmed", preferredName.trim())
      setFlowState("yes_submitted")
    } catch (err) {
      console.error("Failed to submit confirmation:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNoSubmit = async () => {
    setSubmitting(true)
    try {
      await submitResponse("Declined", "Declined Entourage Offer")
      setFlowState("no_submitted")
    } catch (err) {
      console.error("Failed to submit decline:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const roleSingular = getRoleSingular(role.title)

  return (
    <div className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen select-none overflow-x-hidden px-3 py-10 sm:px-6 sm:py-16 md:py-20`}>
      {process.env.NEXT_PUBLIC_ENABLE_DECOR !== "false" && (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <Suspense fallback={<div className="h-full w-full bg-gradient-to-b from-primary/10 to-secondary/5" />}>
            <Silk speed={5} scale={1.1} color="#5E6D5A" noiseIntensity={0.8} rotation={0.3} />
          </Suspense>
        </div>
      )}

      {!isReady && <LoadingScreen onComplete={handleLoadingComplete} />}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center justify-center lg:max-w-4xl min-h-[calc(100dvh-5rem)] sm:min-h-[calc(100dvh-8rem)]"
        style={{ color: palette.body }}
      >
        <AnimatePresence mode="wait">
          {flowState === "question" && (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ProposalCard>
              <div className="relative z-10 w-full space-y-6 pt-2 sm:space-y-9 sm:pt-3">
                <ProposalIntroSection />

                <div
                  className="mx-auto max-w-xl space-y-4 px-1 py-6 sm:space-y-6 sm:px-0 sm:py-9"
                >
                  <div className="flex items-center justify-center pb-2 sm:pb-3">
                    <DividerLine className="w-full max-w-md" />
                  </div>
                  <p className={`font-goudy-italic text-pretty ${ct.bodyLg} leading-[1.8] sm:leading-[1.9]`} style={{ color: palette.body }}>
                    &ldquo;As we enter the next chapter of our lives as husband and wife, we seek
                    the guidance and support of special people who have inspired us through their
                    love, wisdom, and example.&rdquo;
                  </p>
                  <p
                    className={`${cinzel.className} ${ct.sectionTitle} font-semibold leading-relaxed tracking-[0.1em] uppercase sm:tracking-[0.14em] md:tracking-[0.16em]`}
                    style={{ color: palette.heading }}
                  >
                    Because you are a role model of love, laughter, and happily ever after, it
                    would be our honor if you would stand with us and witness our love as our:
                  </p>
                  {/* <div className="flex items-center justify-center pt-2 sm:pt-3">
                    <DividerLine className="w-full max-w-md" />
                  </div> */}
                </div>

                <ProposalAskSection
                  roleSingular={roleSingular}
                  description={role.description}
                  coAttendants={coAttendants}
                  onYes={() => setFlowState("yes_details")}
                  onNo={() => setFlowState("no_clicked")}
                />
              </div>
              </ProposalCard>
            </motion.div>
          )}

          {flowState === "yes_details" && (
            <motion.form
              key="yes-form"
              onSubmit={handleYesSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <ProposalCard>
              <div className="relative z-10 w-full space-y-4 py-1 sm:space-y-6 sm:py-3">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200/80 bg-emerald-50/90 shadow-sm backdrop-blur-sm sm:h-12 sm:w-12">
                    <Check className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
                  </div>
                </div>

                <p
                  className={`font-goudy-italic mx-auto max-w-md text-center ${ct.bodyLg} leading-[1.75] sm:leading-[1.85]`}
                  style={{ color: palette.heading }}
                >
                  We are honored to have you as part of our special day.
                </p>

                <p className={`font-goudy-italic mx-auto max-w-md ${ct.body} leading-[1.75] sm:leading-[1.85]`} style={{ color: palette.body }}>
                  Thank you for accepting our proposal! Please enter the exact name you would like
                  displayed on our wedding invitation and guestlists:
                </p>

                <div className="mx-auto max-w-md text-left">
                  <label className={`${cinzel.className} mb-2 block text-[10px] font-semibold tracking-[0.16em] uppercase sm:text-[12px]`} style={labelStyle(palette.label)}>
                    Your Preferred Name <span style={{ color: palette.accent }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aunt Maria Clara / Mr. James Bond"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    className="font-goudy-italic w-full rounded-xl px-4 py-2.5 text-xs transition-all focus:outline-none focus:ring-2 sm:py-3 sm:text-sm"
                    style={{
                      color: palette.body,
                      backgroundColor: INNER_SURFACE,
                      border: `1px solid ${BORDER_SOFT}`,
                      boxShadow: "inset 0 1px 2px color-mix(in srgb, var(--color-motif-deep) 6%, transparent)",
                    }}
                  />
                  {validationError && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-500">
                      <span>⚠️</span> {validationError}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-center pt-4">
                  <DividerLine className="w-full max-w-md" />
                </div>
                <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`${primaryBtnClass} flex-1`}
                    style={primaryBtnStyle}
                  >
                    {submitting ? "Saving..." : "Submit Response"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlowState("question")}
                    className={secondaryBtnClass}
                    style={secondaryBtnStyle}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              </ProposalCard>
            </motion.form>
          )}

          {flowState === "yes_submitted" && (
            <motion.div
              key="yes-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ProposalCard>
              <div className="relative z-10 space-y-4">
                <div className="relative mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full shadow-sm backdrop-blur-sm"
                    style={{
                      color: palette.heading,
                      border: `1px solid ${BORDER_SOFT}`,
                      backgroundColor: INNER_SURFACE,
                      boxShadow: "0 8px 24px rgba(45, 67, 79, 0.08)",
                    }}
                  >
                    <Sparkles className="h-8 w-8" />
                  </motion.div>
                </div>

                <div className="mb-4">
                  <LayeredProposalTitle main="It's Official" script="thank you" />
                </div>

                <div
                  className="mx-auto mb-6 max-w-sm rounded-2xl px-6 py-4 shadow-sm backdrop-blur-sm"
                  style={{ border: `1px solid ${BORDER_SOFT}`, backgroundColor: INNER_SURFACE }}
                >
                  <span className={`${cinzel.className} mb-1 block text-[10px] font-semibold tracking-[0.16em] uppercase`} style={labelStyle(palette.label)}>
                    Registered partner
                  </span>
                  <p
                    className={`font-goudy-italic ${ct.bodyLg} font-medium`}
                    style={{ ...nameStyle, color: palette.heading }}
                  >
                    {preferredName}
                  </p>
                  <span className="font-goudy-italic mt-1.5 block text-[13px]" style={{ color: palette.body }}>
                    for the position of {role.title}
                  </span>
                </div>

                <p className="font-goudy-italic mx-auto mb-10 max-w-md text-[13px] leading-[1.75] sm:text-[15px] sm:leading-[1.85]" style={{ color: palette.body }}>
                  Thank you so much. Having you stand with us fills our hearts with endless joy
                  and confidence. We can&apos;t wait to celebrate together on our wedding day!
                </p>

                <Link
                  href="/"
                  className={`${primaryBtnClass} inline-block w-full max-w-sm`}
                  style={primaryBtnStyle}
                >
                  Return to Wedding Page
                </Link>
              </div>
              </ProposalCard>
            </motion.div>
          )}

          {flowState === "no_clicked" && (
            <motion.div
              key="no-confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <ProposalCard>
              <div className="relative z-10 space-y-4">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-200/80 bg-rose-50/90 shadow-sm backdrop-blur-sm">
                    <X className="h-6 w-6 text-rose-500" />
                  </div>
                </div>

                <div className="mb-4">
                  <LayeredProposalTitle main="Thank You" script="for responding" />
                </div>

                <p
                  className={`font-goudy-italic mx-auto mb-10 max-w-lg ${ct.bodyLg} leading-[1.75] sm:leading-[1.85]`}
                  style={{ color: palette.body }}
                >
                  &ldquo;Thank you for taking the time to respond. While we&apos;re saddened that
                  you won&apos;t be able to join us in this role, we truly appreciate your support
                  and well wishes as we begin this new chapter together.&rdquo;
                </p>

                <div className="flex items-center justify-center pt-4">
                  <DividerLine className="w-full max-w-md" />
                </div>
                <div className="mx-auto flex max-w-xs flex-col gap-3 sm:max-w-md sm:flex-row">
                  <button
                    onClick={handleNoSubmit}
                    disabled={submitting}
                    className={`${cinzel.className} flex-1 cursor-pointer rounded-sm border border-rose-500 bg-rose-500 px-8 py-4 text-[11px] font-semibold tracking-[0.18em] text-white uppercase shadow-md transition-all duration-300 hover:border-rose-600 hover:bg-rose-600 disabled:opacity-50`}
                  >
                    {submitting ? "Sending..." : "Send Response"}
                  </button>
                  <button
                    onClick={() => setFlowState("question")}
                    className={secondaryBtnClass}
                    style={secondaryBtnStyle}
                  >
                    Go Back
                  </button>
                </div>
              </div>
              </ProposalCard>
            </motion.div>
          )}

          {flowState === "no_submitted" && (
            <motion.div
              key="no-submitted-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ProposalCard>
              <div className="relative z-10 space-y-4">
                <div className="mb-6 flex justify-center">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-sm backdrop-blur-sm"
                    style={{
                      color: palette.heading,
                      border: `1px solid ${BORDER_SOFT}`,
                      backgroundColor: INNER_SURFACE,
                    }}
                  >
                    <Heart className="h-6 w-6" />
                  </div>
                </div>

                <div className="mb-4">
                  <LayeredProposalTitle
                    main="Response Sent"
                    script="successfully"
                    titleSize="clamp(1.35rem, 3.5vw + 0.5rem, 3.5rem)"
                  />
                </div>

                <p className={`font-goudy-italic mx-auto mb-8 max-w-md ${ct.body} leading-[1.75] sm:leading-[1.85]`} style={{ color: palette.body }}>
                  We have received your response. Your love, support, and well wishes mean the
                  world to us regardless. We look forward to celebrating other special milestones
                  with you in the future!
                </p>

                <Link href="/" className={secondaryBtnClass} style={secondaryBtnStyle}>
                  Return to Wedding Page
                </Link>
              </div>
              </ProposalCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
