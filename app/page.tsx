"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import HeroVideoDialog from "@/components/magicui/hero-video-dialog"

export default function Home() {
  const [activeSection, setActiveSection] = useState("flashcards")

  return (
    <div className="min-h-screen bg-[#FCF3E4]">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-24 max-w-6xl">
          <div className="flex flex-col items-center text-center mb-12 relative">
            <div className="inline-flex items-center gap-1 bg-[#fcf3e4] backdrop-blur-sm px-3 py-1 rounded-full mb-8">
              <div className="flex -space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#292828] overflow-hidden">
                    <Image
                      src={`/images/avatar-${i + 1}.jpg`}
                      alt={`User ${i + 1}`}
                      width={24}
                      height={24}
                      className="w-full h-full object-cover shadow-lg"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm text-[#292828] font-[--font-alata]">100+ signed up already!</span>
            </div>

            <div className="relative">
              <div className="absolute -left-20 top-20 ml-6">
                <Image
                  src="/images/stars.png"
                  alt="Stars decoration"
                  width={250}
                  height={100}
                  className="rotate-[-10deg]"
                />
              </div>
              <div className="absolute -right-48 top-40">
                <Image
                  src="/images/scribble 1.svg"
                  alt="Scribble decoration"
                  width={200}
                  height={100}
                  className="ml-20"
                />
              </div>
              <h1 className="text-[#292828] text-[90px] mb-8 leading-tight font-gloock relative z-10">
                Learn Something in
                <br />
                Every Click
              </h1>
            </div>
            <p className="text-[#292828] text-lg mb-8 max-w-2xl">
              Are you tired of pulling one nighter and still failing your exams?
              <br />
              Well don&apos;t worry we got you covered.
            </p>

            <Button
              className="bg-[#292828] text-white rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform animate-pulse-shadow"
              onClick={() => window.location.href = '/signup'}
            >
              Start Preparing
            </Button>
            <div className="relative mt-4 ml-10 -right-40 -top-10 -rotate-[8deg]">
              <Image
                src="/images/try-it.png"
                alt="Try clicking the button"
                width={150}
                height={60}
                className="rotate-[10deg]"
              />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="max-w-7xl mx-auto relative p-8">
            <div className="grid grid-cols-4 gap-6">
              {/* Audio Card */}
              <div className="bg-[#FEFCD1] rounded-xl p-8 transform rotate-[-5deg] hover:scale-105 transition-all cursor-pointer">
                <div className="text-sm text-black mb-3">Learn efficiently with AI</div>
                <div className="h-28 bg-black/10 rounded-lg mb-6 flex items-center justify-center">
                  <div className="w-12 h-12 bg-[#292828] rounded-full" />
                </div>
                <p className="text-base">Yeah! India is my favorite country in the whole world 🧡🤍💚</p>
              </div>
              {/* Progress Card */}
              <div className="bg-[#E1F6FF] rounded-xl p-8 transform rotate-[5deg] hover:scale-105 transition-all cursor-pointer">
                <div className="text-xs text-black mb-2">Know your progress</div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⭐</span>
                  <span className="font-medium">Rookie</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-medium">420</div>
                    <div className="text-xs text-black">points earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-medium">4420</div>
                    <div className="text-xs text-black">minutes in app</div>
                  </div>
                </div>
              </div>
              {/* Calendar Card */}
              <div className="bg-[#FFE1F9] rounded-xl p-8 transform rotate-[-5deg] hover:scale-105 transition-all cursor-pointer">
                <div className="text-sm text-black mb-3">Plan your lessons</div>
                <p className="text-center mb-6 font-medium text-base">December 2022</p>
                <div className="grid grid-cols-7 gap-2 text-sm">
                  {[...Array(31)].map((_, i) => (
                    <div key={i} className="w-6 h-6 flex items-center justify-center">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              {/* Leaderboard Card */}
              <div className="bg-[#D1FFE4] rounded-xl p-8 transform rotate-[5deg] hover:scale-105 transition-all cursor-pointer">
                <div className="text-sm text-black mb-3">Compete with others</div>
                <div className="space-y-4">
                  {[
                    { score: "24331", name: "Artem A." },
                    { score: "16742", name: "Daniel S." },
                    { score: "15919", name: "Daniella M." },
                    { score: "16534", name: "Dima L." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200" />
                        <span className="text-base">{item.name}</span>
                      </div>
                      <span className="text-base font-medium">{item.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-24 -mt-10 max-w-6xl">
          <div className="max-w-3xl relative">
            <h2 className="text-[#292828] text-6xl font-gloock mb-6">
              your &quot;swiss knife&quot; for
              <br />
              learning anything.
            </h2>
            <div className="absolute -right-80 -top-40 transform ">
              <Image
                src="/images/try-hovering.png"
                alt="Try hovering over the cards"
                width={200}
                height={80}
                className="text-black"
              />
            </div>
            <p className="text-[#292828] text-lg mb-16">
              ezPrep simplifies learning with AI-powered flashcards, progress tracking, AI podcasts, and competitive
              leaderboards, all while rewarding your progress.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { id: "flashcards", label: "flashcards", icon: "✏️", video: "/videos/flashcards.mp4" },
                { id: "ai-podcasts", label: "ai podcasts", icon: "🔗", video: "/videos/podcasts.mp4" },
                { id: "leaderboards", label: "leaderboards", icon: "🏆", video: "/videos/leaderboards.mp4" },
                { id: "ezperks", label: "ezperks", icon: "🤑", video: "/videos/ezperks.mp4" },
              ].map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{icon}</span>
                    <span className="font-gloock text-3xl">{label}</span>
                  </div>
                  <span className={`text-3xl transition-transform ${activeSection === id ? "rotate-45" : ""}`}>+</span>
                </button>
              ))}
            </div>
            <div>
              <div className="bg-[#E5DDD3] rounded-xl overflow-hidden h-[400px]">
                <video
                  key={activeSection}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  src={`/videos/${activeSection}.mp4`}
                />
              </div>
            </div>
          </div>
          
          {/* Hero Video Dialog */}
          <div className="mt-16 pt-5 pb-20">
          {/* <div className="absolute left-20 pt-40">
                <Image
                  src="/images/our-pitch.png"
                  alt="Our Pitch"
                  width={200}
                  height={100}
                  className="ml-20 mt-20"
                />
              </div> */}
            <h1 className="text-[#292828] text-6xl font-gloock mb-10 mt-5 text-center">
              So What is all the fuzz about?
            </h1>
            <div className="flex gap-8 items-center">
              <div className="flex-1">
                <HeroVideoDialog
                  videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  thumbnailSrc="/images/thumbnail.jpeg"
                  animationStyle="from-bottom"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

