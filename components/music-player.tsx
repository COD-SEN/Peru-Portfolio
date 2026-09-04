"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, SkipBack, SkipForward, Music } from "lucide-react"

/*
 * Playlist — all sources are hosted on Supabase Storage and proxied through our API.
 * Using the proxy ensures proper CORS headers and reliability.
 */
const PLAYLIST = [
  {
    title: "Najua Hutaniacha",
    artist: "Makena",
    genre: "Gospel",
    src: "https://xjjozxisymaxopldruxz.supabase.co/storage/v1/object/public/My%20songs/Makena%20-%20Najua%20Hutaniacha%20(%20Official%20Hd%20Video)%20(1).mp3",
  },
  {
    title: "Forever Young",
    artist: "Alphaville",
    genre: "Rock",
    src: "https://xjjozxisymaxopldruxz.supabase.co/storage/v1/object/public/My%20songs/Alphaville%20-%20Forever%20Young%20(Official%20Video%20HD).mp3",
  },
  {
    title: "Tukoh Taka",
    artist: " Nicki Minaj, Maluma, & Myriam Fares (FIFA Sound)",
    genre: "World Cup",
    src: "https://xjjozxisymaxopldruxz.supabase.co/storage/v1/object/public/My%20songs/Myriam%20Fares%20-%20Tukoh%20taka.mp3",
  },
  {
    title: "Osiepe",
    artist: "Prince Indah",
    genre: "Ohangla",
    src: "https://xjjozxisymaxopldruxz.supabase.co/storage/v1/object/public/My%20songs/Prince%20Indah%20-%20Osiepe%20(Official%20Audio)%20sms%209845118%20to%20811.mp3",
  },
  {
    title: "Old Town Southern man",
    artist: "Alex Jackson",
    genre: "Country",
    src: "https://xjjozxisymaxopldruxz.supabase.co/storage/v1/object/public/My%20songs/Alan%20Jackson%20-%20Small%20Town%20Southern%20Man%20(Official%20Music%20Video).mp3",
  },
]

export function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const song = PLAYLIST[currentIndex]

  // When track changes: update src, load, then auto-play if already playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = song.src   // set src imperatively so we control exactly when it loads
    console.log("[v0] Loading track:", song.title, "URL:", song.src)
    audio.load()
    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("[v0] Play error:", err)
          setIsPlaying(false)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, song.src])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    console.log("[v0] togglePlay called, isPlaying:", isPlaying)
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      // Make sure src is set before playing (handles first-play edge case)
      if (!audio.src || audio.src === window.location.href) {
        audio.src = PLAYLIST[currentIndex].src
        audio.load()
      }
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("[v0] Play promise error:", err)
          setIsPlaying(false)
        })
      }
      setIsPlaying(true)
    }
  }, [isPlaying, currentIndex])

  const nextTrack = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % PLAYLIST.length)
  }, [])

  const prevTrack = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + PLAYLIST.length) % PLAYLIST.length)
  }, [])

  const genreColors: Record<string, string> = {
    Gospel: "from-sky-400 to-blue-600",
    Rock: "from-red-500 to-rose-700",
    "World Cup": "from-green-400 to-emerald-600",
    Ohangla: "from-violet-500 to-purple-700",
    Country: "from-amber-400 to-orange-500",
  }
  const gradientClass = genreColors[song.genre] || "from-blue-500 to-purple-600"

  return (
    <>
      <div className="fixed md:top-3 md:left-1/2 md:-translate-x-1/2 top-2 left-2 right-auto translate-x-0 z-20 pointer-events-auto">
        {!isExpanded ? (
          /* ---- Collapsed: single circular music button ---- */
          <button
            onClick={() => setIsExpanded(true)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${gradientClass} shadow-xl flex items-center justify-center hover:scale-110 transition-all border-2 border-white/30`}
          >
            {isPlaying ? (
              <div className="flex items-center gap-[3px]">
                <div className="w-[3px] h-3 bg-white rounded-full animate-pulse" />
                <div className="w-[3px] h-4 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.15s" }} />
                <div className="w-[3px] h-2.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
                <div className="w-[3px] h-3.5 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.45s" }} />
              </div>
            ) : (
              <Music className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        ) : (
          /* ---- Expanded: circular controls ---- */
          <div className="flex flex-col items-center gap-2">
            {/* Song info pill — click to collapse */}
            <button
              onClick={() => setIsExpanded(false)}
              className="bg-black/60 backdrop-blur-xl rounded-full px-4 py-1.5 border border-white/20 hover:bg-black/70 transition-colors"
            >
              <p className="text-white text-xs font-semibold truncate max-w-[200px]">{song.title}</p>
              <p className="text-white/60 text-[10px] text-center">
                {song.artist} &middot; {song.genre}
              </p>
            </button>

            {/* Three circular buttons: prev - play/pause - next */}
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                onClick={prevTrack}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 active:scale-95"
              >
                <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
              </button>

              {/* Play / Pause — large center */}
              <button
                onClick={togglePlay}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${gradientClass} shadow-xl flex items-center justify-center hover:scale-110 transition-all active:scale-95 border-2 border-white/40`}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                ) : (
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-0.5" fill="white" />
                )}
              </button>

              {/* Next */}
              <button
                onClick={nextTrack}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 active:scale-95"
              >
                <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
              </button>
            </div>

            {/* Track dots */}
            <div className="flex items-center gap-1.5">
              {PLAYLIST.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                    }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/*
       * KEY FIXES:
       * 1. Removed crossOrigin="anonymous" �� this was causing CORS failures
       * 2. Removed src prop — src is now managed imperatively in the useEffect
       *    to avoid React's batched render conflicting with audio.load()
       */}
      <audio
        ref={audioRef}
        onEnded={nextTrack}
        onPlay={() => {
          console.log("[v0] Audio playing")
          setIsPlaying(true)
        }}
        onPause={() => {
          console.log("[v0] Audio paused")
          setIsPlaying(false)
        }}
        onError={(e) => {
          console.log("[v0] Audio error:", e.currentTarget.error?.message)
          setIsPlaying(false)
        }}
      />
    </>
  )
}
