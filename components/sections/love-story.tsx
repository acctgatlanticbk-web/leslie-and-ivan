"use client"

import React from "react"
import Link from "next/link"
import localFont from "next/font/local"
import { StorySection } from "@/components/StorySection"
import { Cinzel } from "next/font/google"

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
  "block h-auto w-auto max-w-[120px] sm:max-w-[160px] md:max-w-[220px] lg:max-w-[260px]"

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
      <span className="h-0.5 w-0.5 rounded-full bg-motif-deep/45 sm:h-1 sm:w-1" aria-hidden />
      <span
        className="h-px w-6 sm:w-10"
        style={{
          background:
            "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-motif-deep) 38%, transparent))",
        }}
      />
    </div>
  )
}

function LoveStoryTitle() {
  return (
    <h1
      className="relative mx-auto w-full max-w-full text-center"
      style={
        {
          "--title-size": "clamp(2.15rem, 11vw, 4.5rem)",
          "--script-size": "clamp(1.2rem, 5vw, 2.5rem)",
          "--script-overlap": "clamp(-0.75rem, -3.2vw, -1.75rem)",
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
        Our Love Story
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
        Where It All Began
      </span>
      <span className="sr-only">Where It All Began</span>
    </h1>
  )
}

export function LoveStory() {
  return (
    <div className={`${theSeasons.variable} ${aboveTheBeyond.variable} relative min-h-screen overflow-x-hidden`}>
      <div
        className="relative px-4 pb-2 pt-8 text-center sm:pt-10 md:pt-12"
        style={{ background: "var(--color-welcome-bg)" }}
      >
        <div className="pointer-events-none absolute right-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/deco/top-right-corner-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="pointer-events-none absolute left-0 top-0 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/decoration/deco/top-left-corner-deco.png"
            alt=""
            className={CORNER_DECO_CLASS}
          />
        </div>
        <div className="relative z-20">
          <div className="mx-auto mb-5 sm:mb-6 md:mb-7">
            <OrnamentalDivider />
          </div>
          <div className="mx-auto mt-2 sm:mt-3 md:mt-4">
            <LoveStoryTitle />
          </div>
        </div>
{/* 
        <p
          className="font-goudy-italic mx-auto mt-4 max-w-xl text-[0.75rem] leading-snug sm:mt-5 sm:text-[0.8125rem] md:mt-6 md:text-[0.84375rem]"
          style={{ color: "var(--color-welcome-text)" }}
        >
          &ldquo;11 Years of Love, Now Forever&rdquo;
        </p> */}
      </div>
{/* 1st story */}
<StorySection
        theme="light"
        layout="image-left"
        isFirst={true}
        title="The Spark That Started It All"
        imageSrc="/LoveStory/2018 Feb.JPG"
        text={
          <>
            <p className="mb-4">
            Every great love story starts with a single moment that changes everything.
            </p>
            <p className="mb-4">
            For Alyanna and Dean, it began with a simple hello, a quiet spark neither of them expected would grow into forever.
            </p>
          </>
        }
      />
{/* 2nd story */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/LoveStory/2019 Jan.webp"
        title="From Strangers to Sweethearts"
        text={
          <>
            <p className="mb-4">
            Little by little, strangers became friends, and friends became something far more special.
            </p>
            <p className="mb-4">
            With every conversation and every shared laugh, Alyanna and Dean grew closer, building a bond that felt easy, warm, and undeniably right.
            </p>
          </>
        }
      />
{/* 3rd story */}
      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/2019 July.webp"
        title="Wanderlust and Warm Hearts"
        text={
          <>
            <p>
            Some of the sweetest memories are made far from home, exploring new places side by side.
            </p>
            <p className="mb-4">
            For Alyanna and Dean, every trip became an adventure worth remembering, proof that home is simply wherever they are together.
            </p>
          </>
        }
      />
{/* 4th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/LoveStory/2020 Jan.webp"
        title="A Bond That Only Grew Deeper"
        text={
          <>
            <p>
            Through the years, their love did not just last, it flourished.
            </p>
            <p className="mb-4">
            Every new season brought fresh adventures and quiet, steady moments that pulled Alyanna and Dean even closer together.
            </p>
          </>
        }
      />
{/* 5th story */}
      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/fake proposal 2020.webp"
        title="A Sweet Glimpse of Forever"
        text={
          <>
            <p>
            Long before the real question was asked, forever was already on their minds.
            </p>
            <p className="mb-4">
            Alyanna and Dean often pictured the day they would promise a lifetime to each other, a dream slowly taking shape with every year that passed.
            </p>
          </>
        }
      />
{/* 6th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        isLast={true}
        imageSrc="/LoveStory/2021 Jan.webp"
        title="Celebrating Every Beautiful Milestone"
        text={
          <>
            <p>
            Life feels a little brighter when its biggest moments are shared with the right person.
            </p>
            <p className="mb-4">
            Alyanna and Dean made it a habit to celebrate every win together, no achievement ever felt small when the other was cheering nearby.
            </p>
          </>
        }
      />
{/* 7th story */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/LoveStory/Alyanna graduation 2021.webp"
        title="Proud of Every Step, Alyanna"
        text={
          <>
            <p>
            Hard work and quiet dedication finally paid off.
            </p>
            <p className="mb-4">
            Dean stood proudly beside Alyanna on this well earned day, one more memory added to the story they were building together.
            </p>
          </>
        }
      />
{/* 8th story */}
            <StorySection
        theme="dark"
        layout="image-right"
        isLast={true}
        imageSrc="/LoveStory/Alyanna roll signing 2022.webp"
        title="Another Chapter, Another Dream Realized"
        text={
          <>
            <p>
            A new page turned, and a dream became real.
            </p>
            <p className="mb-4">
            With Dean by her side, Alyanna took another confident step toward the future they had long imagined together.
            </p>
          </>
        }
      />
{/* 9th story */}
       <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/2022 Dec.webp"
        title="Falling Deeper, One Day at a Time"
        text={
          <>
            <p className="mb-4">
            What began as easy conversations slowly turned into something they both looked forward to every single day.
            </p>
            <p className="mb-4">
            Alyanna and Dean found comfort in each other, a quiet certainty that this connection was rare and worth holding on to.
            </p>
          </>
        }
      />
{/* 10th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/LoveStory/2023 Dec.webp"
        title="New Places, Same Sweet Company"
        text={
          <>
            <p>
            No matter the destination, the best part of every journey was always each other.
            </p>
            <p className="mb-4">
            Alyanna and Dean chased new sights and cherished simple moments, learning that adventure is always sweeter when shared.
            </p>
          </>
        }
      />
{/* 11th story */}
      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/2024 Jan.webp"
        title="Steady, Strong, and Still Growing"
        text={
          <>
            <p>
            Their love was never rushed, it grew steadily, season after season.
            </p>
            <p className="mb-4">
            Every challenge faced together only proved to Alyanna and Dean how strong their bond truly was.
            </p>
          </>
        }
      />
{/* 12th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        isLast={true}
        imageSrc="/LoveStory/Dean graduation 2024.JPG"
        title="Proud of Every Step, Dean"
        text={
          <>
            <p>
            Hard work and quiet dedication finally paid off.
            </p>
            <p className="mb-4">
            Alyanna stood proudly beside Dean on this well earned day, one more memory added to the story they were building together.
            </p>
          </>
        }
      />
{/* 13th story */}
      <StorySection
        theme="light"
        layout="image-left"
        isLast={true}
        imageSrc="/LoveStory/2024 Oct.webp"
        title="Cheering Each Other On"
        text={
          <>
            <p>
            Life feels a little brighter when its biggest moments are shared with the right person.
            </p>
            <p className="mb-4">
            Alyanna and Dean made it a habit to celebrate every win together, no achievement ever felt small when the other was cheering nearby.
            </p>
          </>
        }
      />
{/* 14th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/LoveStory/2025 Jan.webp"
        title="A New Year, A Deeper Love"
        text={
          <>
            <p>
            Each new year brought its own quiet reminder of how far they had come.
            </p>
            <p className="mb-4">
            Alyanna and Dean welcomed every season with hope, growing more certain that they had found their forever person.
            </p>
          </>
        }
      />
{/* 15th story */}
      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/Dean roll signing 2025.webp"
        title="Another Chapter, Another Dream Realized"
        text={
          <>
            <p>
            A new page turned, and a dream became real.
            </p>
            <p className="mb-4">
            With Alyanna by his side, Dean took another confident step toward the future they had long imagined together.
            </p>
          </>
        }
      />
{/* 16th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        isLast={true}
        imageSrc="/LoveStory/2025 Oct.png"
        title="Milestones Made Sweeter Together"
        text={
          <>
            <p>
            Life feels a little brighter when its biggest moments are shared with the right person.
            </p>
            <p className="mb-4">
            Alyanna and Dean carried this belief through every season, celebrating one another with open hearts.
            </p>
          </>
        }
      />
{/* 17th story */}
       <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/2026 Jan.webp"
        title="Still Choosing Each Other"
        text={
          <>
            <p className="mb-4">
            Years later, the spark that started it all had only grown warmer.
            </p>
            <p className="mb-4">
            Alyanna and Dean kept choosing each other, day after day, certain there was no one else they would rather share life with.
            </p>
          </>
        }
      />
{/* 18th story */}
      <StorySection
        theme="dark"
        layout="image-right"
        imageSrc="/LoveStory/2026 March.webp"
        title="Together, Always the Better Adventure"
        text={
          <>
            <p>
            No matter the destination, the best part of every journey was always each other.
            </p>
            <p className="mb-4">
            Alyanna and Dean continued to explore the world hand in hand, grateful that every road led them closer together.
            </p>
          </>
        }
      />
{/* 19th story */}
      <StorySection
        theme="light"
        layout="image-left"
        imageSrc="/LoveStory/real proposal 2026.webp"
        title="Yes, To Forever"
        text={
          <>
            <p>
            After years of love, laughter, and countless adventures, the moment finally arrived.
            </p>
            <p className="mb-4">
            Dean got down on one knee, and Alyanna said yes, sealing their promise to spend a lifetime together.
            </p>
          </>
        }
      />

      <div
        className="relative px-4 pb-16 pt-8 text-center sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
        style={{ background: "var(--color-welcome-bg)" }}
      >
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
        <div className="relative z-20">
          <div className="mx-auto mb-5 sm:mb-6">
            <OrnamentalDivider />
          </div>
          <Link
            href="#guest-list"
            className={`${cinzel.className} group relative inline-flex items-center justify-center rounded-sm border px-6 py-2.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:px-8 sm:py-3 sm:text-[0.6875rem] sm:tracking-[0.24em] md:px-10 md:py-3.5 md:text-xs md:tracking-[0.28em]`}
            style={{
              backgroundColor: "var(--color-welcome-green)",
              borderColor: "color-mix(in srgb, var(--color-welcome-navy) 35%, transparent)",
              color: "var(--color-welcome-bg)",
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
          >
            <span className="relative z-10">Join us</span>
            <div
              className="absolute inset-0 -z-0 rounded-sm opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-25"
              style={{ backgroundColor: "var(--color-motif-deep)" }}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
