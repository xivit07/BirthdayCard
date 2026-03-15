import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Camera, Cake } from "lucide-react";

const FRIEND_NAME = "Devangi";

type PageId = "home" | "memories" | "traits" | "message";

type MemoryItem = {
  src: string;
  title: string;
  caption: string;
  year: string;
  vibe: string;
  mediaType: "image" | "video";
  poster?: string;
  about?: string;
};

type Trait = {
  title: string;
  description: string;
  icon: string;
};

const pages: Array<{
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: "home", label: "Welcome", icon: Heart },
  { id: "memories", label: "Memories", icon: Camera },
  { id: "traits", label: "What Makes You, You", icon: Cake },
  { id: "message", label: "Letter", icon: Gift },
];

const memoryPhotos: MemoryItem[] = [
  {
    src: "/BirthdayCard/pictures/WhatsApp Image 2026-03-15 at 12.32.56 AM.jpeg",
    title: "The Bha",
    caption: "Just a mentor-mentee duo taking on the world, one bear hug at a time.",
    year: "2025",
    vibe: "Core Memory",
    mediaType: "image",
    about: "This photo captures a rare quiet moment in the middle of the usual chaos. It’s not often you find a junior who challenges you, keeps things running, and still manages to be a source of genuine support. Definitely a core memory for the books.",
  },
  {
    src: "/BirthdayCard/videos/WhatsApp Video 2026-03-15 at 12.01.30 PM.mp4",
    title: "First Trip to The United States",
    caption: "The beginning of a long-awaited chapter: finally heading to the States.",
    year: "2025",
    vibe: "Exciting New Chapter",
    mediaType: "video",
    poster:
      "/BirthdayCard/pictures/WhatsApp Image 2026-03-15 at 12.07.44 PM.jpeg",
    about: "That specific brand of airport excitement where the nerves and the joy are both at 100%. Seeing her this hyped for her first US trip was a highlight of the year.",
  },
  {
    src: "/BirthdayCard/pictures/WhatsApp Image 2026-03-15 at 12.26.40 PM.jpeg",
  title: "The Prompt Architect",
  caption: "Engineering the perfect aesthetic, from her nails to the model's output.",
  year: "2025",
  vibe: "Technical Mastery",
  mediaType: "image",
  about: "Watching her bridge the gap between physical art and prompt engineering was a masterclass. She dialed in the details so perfectly that GPT delivered a near-flawless replica of her nail art.",
  },
  {
    src: "/BirthdayCard/pictures/ChatGPT Image Mar 15, 2026 at 11_37_39 PM.png",
    title: "A Tale of Two Brews",
    caption: "The ultimate caffeine crossroads: earthy greens or classic dark roast?",
    year: "2026",
    vibe: "The Daily Grind",
    mediaType: "image",
    about: "It's not just a preference; it’s a full-on obsession with both. Whether she’s holding the aesthetically perfect matcha in its rippled glass or the quick comfort of an iced latte on the go, the debate for ‘best brew’ is a constant feature in her life. Why choose when you can master both?",
  },
  {
    src: "/BirthdayCard/pictures/WhatsApp Image 2026-03-15 at 6.37.33 PM.jpeg",
    title: "Videsi Heart, Desi Soul",
    caption: "Finding the perfect balance between everywhere she’s been and everywhere she’s from.Finding the perfect balance between everywhere she’s been and everywhere she’s from.",
    year: "2025",
    vibe: "Authentically Herself",
    mediaType: "image",
    about: "There’s a unique grace in how she moves between her 'videsi' adventures and her 'desi' spirit. It’s in the way she speaks, the way she leads, and the way she stays connected to home no matter how far she travels. She’s the perfect blend of a global outlook and a local heart.",
  },
  {
    src: "/BirthdayCard/pictures/ChatGPT Image Mar 15, 2026 at 11_57_41 PM.png",
    title: "A Constant Evolution",
    caption: "From playing dress-up to owning the room—the mischief remains the same.",
    year: "2025",
    vibe: "Pure Mischief",
    mediaType: "image",
    about: "A visual proof that some things never change. Whether she’s rocking a makeshift dupatta as a kid or exploring the world today, that specific 'I’m up to something' smile is a constant. Posting this is probably a death wish, but the parallel was too good to pass up.",
  },
  {
    src: "/BirthdayCard/videos/birthday-memory.mp4",
    title: "While I play the bongo",
    caption: "The real Director behind the scenes—I’m just here for the rhythm.",
    year: "2025",
    vibe: "Special Feature",
    mediaType: "video",
    poster:
      "/BirthdayCard/pictures/WhatsApp Image 2026-03-15 at 12.19.12 AM.jpeg",
    about:
      "A rare look at the workplace hierarchy in its natural state. Even while playing the bongos, it’s clear who’s actually calling the shots. A tribute to the junior who manages the mentor better than anyone else.",
  },
];

const traits: Trait[] = [
  {
    title: "The Visionary",
    description:
      "Whether it’s running the show at work or engineering the perfect prompt, you have a rare gift for turning a vision into reality.",
    icon: "✦",
  },
  {
    title: "The Bridge",
    description:
      "A seamless blend of 'videsi' outlook and 'desi' soul. You navigate different worlds with a grace that is uniquely yours.",
    icon: "✧",
  },
  {
    title: "The Spark",
    description:
      "That mischievous spirit from your childhood is still your superpower. You keep life unpredictable and everyone on their toes.",
    icon: "☼",
  },
  {
    title: "The Alchemist",
    description:
      "From perfecting the matcha ritual to finding the best mountain brew, you find the magic in the smallest daily details.",
    icon: "☾",
  },
  {
    title: "The Anchor",
    description:
      "Beneath the competence and the chaos, you are the reliable heart. You make the people around you feel grounded and safe.",
    icon: "❦",
  },
  {
    title: "The Precision",
    description:
      "Your eye for detail is unmatched—from the logic of an AI replica to the aesthetic of a moment. You never miss a beat.",
    icon: "✸",
  },
];

function Petals() {
  const petals = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: `${8 + i * 9}%`,
    duration: 10 + (i % 5) * 2,
    delay: i * 0.6,
    rotate: i % 2 === 0 ? 20 : -20,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: -120, x: 0, rotate: 0, opacity: 0.2 }}
          animate={{
            y: "110vh",
            x: [0, 18, -12, 10, 0],
            rotate: petal.rotate,
            opacity: 0.35,
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: petal.left }}
          className="absolute top-0 text-3xl"
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [burst, setBurst] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setBurst(true);
    window.setTimeout(onOpen, 1500);
  };

  const confetti = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: 50,
    x: (i - 9) * 16,
    y: -110 - (i % 5) * 16,
    rotate: (i % 2 === 0 ? 1 : -1) * (30 + i * 6),
    delay: i * 0.02,
    emoji: ["✨", "🎉", "💐", "🌸"][i % 4],
  }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#fdfbf7] to-[#f3ede4] px-4 py-10 overflow-y-auto">
      <div className="w-full max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-[#8b6b58]">
          Society Papers
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#4d3426] sm:text-5xl">
          A Letter Awaits
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#7a5a48] sm:text-base">
          Open the envelope to reveal the letter
        </p>

        <button
          type="button"
          onClick={open}
          disabled={opening}
          aria-label="Open invitation envelope"
          className="relative mt-12 flex w-full justify-center bg-transparent text-left sm:mt-16 disabled:cursor-default"
        >
          <div className="relative w-[min(92vw,460px)] overflow-visible">
            {burst && (
              <div className="pointer-events-none absolute inset-0 z-[90] overflow-visible">
                {confetti.map((piece) => (
                  <motion.div
                    key={piece.id}
                    initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 0.4 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      x: piece.x,
                      y: piece.y,
                      rotate: piece.rotate,
                      scale: [0.4, 1, 1, 0.9],
                    }}
                    transition={{ duration: 1.1, delay: piece.delay, ease: "easeOut" }}
                    style={{ left: `${piece.left}%`, top: "44%" }}
                    className="absolute text-xl sm:text-2xl"
                  >
                    {piece.emoji}
                  </motion.div>
                ))}
              </div>
            )}

            <div className="relative aspect-[460/300] w-full overflow-visible" style={{ perspective: "1400px" }}>
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-[#f8f5ef] to-[#ece6dc] shadow-2xl ring-1 ring-[#ded7cc]" />
              <div
                className="pointer-events-none absolute inset-0 rounded-[24px] opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(120,92,72,0.10) 0.8px, transparent 0.8px)",
                  backgroundSize: "10px 10px",
                }}
              />

              <div className="absolute -left-2 -top-2 z-[80] text-lg text-[#c9a45c] sm:-left-3 sm:-top-3 sm:text-xl">❧</div>
              <div className="absolute -right-2 -top-2 z-[80] text-lg text-[#c9a45c] sm:-right-3 sm:-top-3 sm:text-xl">❧</div>
              <div className="absolute -bottom-2 -left-2 z-[80] rotate-180 text-lg text-[#c9a45c] sm:-bottom-3 sm:-left-3 sm:text-xl">❧</div>
              <div className="absolute -bottom-2 -right-2 z-[80] rotate-180 text-lg text-[#c9a45c] sm:-bottom-3 sm:-right-3 sm:text-xl">❧</div>

              <div className="absolute bottom-0 left-0 z-[35] h-[56%] w-1/2 bg-[#ece3d8]" style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }} />
              <div className="absolute bottom-0 right-0 z-[35] h-[56%] w-1/2 bg-[#ece3d8]" style={{ clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }} />
              <div className="absolute bottom-0 left-1/2 z-[36] h-[56%] w-full -translate-x-1/2 bg-[#f7f3ed]" style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
              <div className="pointer-events-none absolute bottom-[34%] left-0 z-[37] h-px w-full bg-[#e7ddd1]" />

              <div className="absolute z-[70]" style={{ left: "50%", top: "13%", width: "58%", height: "66%", transform: "translateX(-50%)" }}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={opening ? { y: "-84%", opacity: 1 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.9, delay: opening ? 0.6 : 0, ease: "easeInOut" }}
                  className="flex h-full w-full flex-col items-center justify-center rounded-[18px] border border-[#e6d6c2] bg-[#fffaf3] px-4 text-center shadow-md"
                >
                  <div className="mb-2 text-2xl text-[#b89a6b] sm:text-3xl">❦</div>
                  <p className="font-serif text-lg text-[#6d4c3d] sm:text-xl">Happy Birthday</p>
                  <p className="mt-1 font-serif text-base text-[#8a6958] sm:text-lg">{FRIEND_NAME}</p>
                </motion.div>
              </div>

              <motion.div
                animate={opening ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformOrigin: "50% 0%",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
                className="absolute left-0 top-0 z-[50] h-[50%] w-full bg-gradient-to-b from-[#f7f2eb] to-[#efe8de] shadow-md"
              />

              {/* Wax Seal */}
              <div className="absolute left-1/2 top-[25%] z-[60] -translate-x-1/2 -translate-y-1/2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg ring-2 ring-red-800 sm:h-16 sm:w-16">
                  <span className="text-lg text-white sm:text-xl">🕯️</span>
                </div>
              </div>
            </div>
          </div>
        </button>

        <p className="mt-8 text-sm font-medium text-[#7a5a48] underline underline-offset-4">
          Open invitation
        </p>
      </div>
    </div>
  );
}

export default function FriendsBirthdayWebsite() {
  const [opened, setOpened] = useState(false);
  const [activePage, setActivePage] = useState<PageId>("home");
  const [selectedImage, setSelectedImage] = useState<MemoryItem | null>(null);
  const [previewVideoIndex, setPreviewVideoIndex] = useState<number | null>(null);
  const [typedIntro, setTypedIntro] = useState("");
  const [flippedTraits, setFlippedTraits] = useState<number[]>([]);
  const [candlesOut, setCandlesOut] = useState(false);

  const memoriesRef = useRef<HTMLDivElement | null>(null);

  const allMemories = memoryPhotos;

  const introText =
    "Dearest reader, today we honor a heart so lovely, a spirit so bright, and a friendship so precious it deserves its very own society column.";

  useEffect(() => {
    let index = 0;
    setTypedIntro("");
    const timer = window.setInterval(() => {
      index += 1;
      setTypedIntro(introText.slice(0, index));
      if (index >= introText.length) {
        window.clearInterval(timer);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, []);

  const toggleTrait = (index: number) => {
    setFlippedTraits((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const pageAnimation = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 },
    }),
    []
  );

  if (!opened) {
    return <EnvelopeIntro onOpen={() => setOpened(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#f8f2ea] text-[#4d3426]">
      <Petals />

      <div ref={memoriesRef} className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8b6b58]">
            Lady Whistledown&apos;s Society Papers
          </p>
          <h1 className="mt-2 font-serif text-5xl">A Celebration of {FRIEND_NAME}</h1>
          <p className="mx-auto mt-6 min-h-[84px] max-w-2xl text-lg leading-8 text-[#6b5242]">
            {typedIntro}
            <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-[#8b6b58] align-middle" />
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              type="button"
              className="rounded-full bg-[#4d3426] px-6 py-5 text-white hover:bg-[#65493a]"
              onClick={() => {
                setActivePage("memories");
                memoriesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Begin the Story
            </Button>
          </div>
        </header>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          {pages.map((p) => {
            const Icon = p.icon;
            return (
              <Button key={p.id} onClick={() => setActivePage(p.id)}>
                <Icon className="mr-2 h-4 w-4" />
                {p.label}
              </Button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activePage === "home" && (
            <motion.div key="home" {...pageAnimation}>
              <Card className="bg-[#fff9f2]">
                <CardContent className="p-12 text-center">
                  <h2 className="mb-6 font-serif text-4xl">Happiest of Birthdays</h2>
                  <p className="mx-auto max-w-2xl text-lg leading-8">
                    Today we celebrate your laughter, kindness, and every wonderful moment you bring into our lives.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activePage === "memories" && (
            <motion.div key="memories" {...pageAnimation}>
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl text-[#4d3426] md:text-3xl">
                    Memory Collection
                  </h2>
                  <p className="mt-2 text-sm text-[#6f5645]">
                    Browse the memory posters. Open one to see the full description.
                  </p>
                </div>

                <div className="relative overflow-x-auto rounded-[28px] bg-[#fbf6ef]/90 p-4 shadow-sm ring-1 ring-[#eadfce] snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                  <div className="flex gap-4 snap-x snap-mandatory">
                    {allMemories.map((photo, i) => (
                      <motion.button
                        key={photo.src}
                        type="button"
                        whileHover={{ scale: 1.04, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative flex-shrink-0 w-[80vw] overflow-hidden rounded-[24px] text-left shadow-lg sm:w-[48vw] lg:w-[25vw] snap-center"
                        onMouseEnter={() => {
                          if (photo.mediaType === "video") setPreviewVideoIndex(i);
                        }}
                        onMouseLeave={() => {
                          if (photo.mediaType === "video") setPreviewVideoIndex(null);
                        }}
                        onFocus={() => {
                          if (photo.mediaType === "video") setPreviewVideoIndex(i);
                        }}
                        onBlur={() => {
                          if (photo.mediaType === "video") setPreviewVideoIndex(null);
                        }}
                        onClick={() => setSelectedImage(photo)}
                      >
                        <div className="relative h-[40vh] w-full overflow-hidden rounded-[24px] bg-[#e9dfd2] sm:h-[360px]">
                          {photo.mediaType === "video" ? (
                            <>
                              {previewVideoIndex === i ? (
                                <video
                                  src={photo.src}
                                  poster={photo.poster}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <img
                                  src={photo.poster || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80"}
                                  alt={photo.title}
                                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                />
                              )}
                              <div className="absolute inset-0 z-10 flex items-center justify-center transition duration-300 group-hover:opacity-0">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/45 text-2xl text-white backdrop-blur-sm">
                                  ▶
                                </div>
                              </div>
                            </>
                          ) : (
                            <img
                              src={photo.src}
                              alt={photo.title}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 z-20 p-3 text-white sm:p-5">
                            <p className="font-serif text-lg tracking-wide sm:text-2xl">{photo.title}</p>
                            <p className="mt-1 text-xs leading-5 opacity-90 sm:text-sm sm:leading-6">{photo.caption}</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-white/75">
                              {photo.mediaType === "video" ? "Video Memory" : "Photo Memory"}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === "traits" && (
            <motion.div key="traits" {...pageAnimation}>
              <div className="mb-10 text-center">
                <h2 className="font-serif text-4xl">What Makes You, You</h2>
                <p className="mt-3 text-[#6f5645]">Little things that make {FRIEND_NAME} extraordinary.</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {traits.map((trait, index) => {
                  const isFlipped = flippedTraits.includes(index);
                  return (
                    <motion.div key={trait.title} className="[perspective:1000px]" whileHover={{ scale: 1.03 }}>
                      <motion.button
                        type="button"
                        className="relative h-64 w-full cursor-pointer rounded-2xl text-left"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ transformStyle: "preserve-3d" }}
                        onClick={() => toggleTrait(index)}
                      >
                        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-[#fff9f2] px-6 shadow-lg" style={{ backfaceVisibility: "hidden" }}>
                          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#e4d2be] bg-[#fbf4eb] text-2xl text-[#b08968] shadow-sm">
                            {trait.icon}
                          </div>
                          <p className="text-center font-serif text-2xl">{trait.title}</p>
                          <p className="mt-3 text-center text-xs uppercase tracking-[0.28em] text-[#a07f67]">
                            tap or hover to reveal
                          </p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#f1e6d8] px-6 text-center shadow-lg" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}>
                          <div>
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/60 text-xl text-[#b08968]">
                              {trait.icon}
                            </div>
                            <p className="leading-7 text-[#5f4a3c]">{trait.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activePage === "message" && (
            <motion.div key="message" {...pageAnimation}>
              <Card className="overflow-hidden border-[#eadfce] bg-[#fffaf3] shadow-lg">
                <CardContent className="relative p-0">
                  <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#fffaf3_0%,#f9f1e6_100%)] p-10 md:p-14">
                    <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(180deg, transparent 0px, transparent 31px, rgba(165,130,102,0.11) 32px)" }} />
                    <div className="pointer-events-none absolute inset-y-0 left-8 w-px bg-[#d9c7b6]/70" />
                    <div className="relative z-10">
                      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#9b7f68]">A personal note</p>
                      <h2 className="mb-6 font-serif text-4xl text-[#4d3426] md:text-5xl">A Letter To You</h2>

                      <div className="mb-8 flex flex-col items-center gap-3">
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={candlesOut ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                          transition={{ duration: 0.45 }}
                          className="text-4xl"
                        >
                          {candlesOut ? "🎂" : "🕯️🕯️🕯️"}
                        </motion.div>
                        <Button
                          type="button"
                          className="rounded-full bg-[#4d3426] px-5 py-2 text-white hover:bg-[#65493a]"
                          onClick={() => setCandlesOut(true)}
                        >
                          Blow the candles
                        </Button>
                      </div>

                      {[
                        "On this special day, I hope you look back at everything we’ve navigated—from the daily 'firefighting' to your big US debut—and realize just how much of an impact you make.",
                        "Your friendship is a gift that makes even the most insufferable office chaos feel like a shared adventure, usually fueled by your perfect choice of matcha or coffee.",
                        "I hope this next chapter brings you more moments where your vision comes to life perfectly—whether through a flawless prompt or a dream you've been quietly working toward.",
                        "And through every era still to come, whether you’re running the show or just being your mischievous self, I hope you always know how much I value having you in my corner."
                        ].map((paragraph, index) => (
                        <motion.p
                          key={paragraph}
                          initial={{ opacity: 0, y: 18 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.5 }}
                          transition={{ duration: 0.5, delay: index * 0.12 }}
                          className="relative z-10 mb-6 max-w-3xl font-serif text-lg leading-9 text-[#5a463a] md:text-[1.25rem]"
                          style={{ fontFamily: '"Georgia", "Times New Roman", serif', fontStyle: "italic" }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}

                      <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.55 }}
                        className="mt-10 font-serif text-2xl text-[#7a5a48]"
                        style={{ fontFamily: '"Georgia", "Times New Roman", serif', fontStyle: "italic" }}
                      >
                        With love,
                        <br />
                        Yours always.
                      </motion.p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
              className="grid w-full max-w-6xl overflow-y-auto rounded-[28px] bg-[#1a120e] shadow-2xl max-h-[90vh] md:grid-cols-[1.1fr_0.9fr]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-[320px] bg-[#0f0b09]">
                {selectedImage.mediaType === "video" ? (
                  <video src={selectedImage.src} poster={selectedImage.poster} controls playsInline className="h-full w-full object-cover" />
                ) : (
                  <img src={selectedImage.src} alt={selectedImage.title} className="h-full w-full object-cover" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute right-4 top-4 rounded-full bg-black/45 px-3 py-1 text-sm text-white backdrop-blur"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col bg-[#f7efe4] p-6 text-[#4d3426] md:p-8">
                <p className="text-xs uppercase tracking-[0.32em] text-[#8b6b58]">
                  {selectedImage.mediaType === "video" ? "Memory Feature • Video" : "Memory Feature • Photo"}
                </p>
                <h3 className="mt-3 font-serif text-3xl md:text-4xl">{selectedImage.title}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[#6f5645]">
                  <span>{selectedImage.year}</span>
                  <span className="rounded-full bg-[#eadcc8] px-3 py-1">{selectedImage.vibe}</span>
                  <span className="rounded-full bg-[#eadcc8] px-3 py-1">Starring {FRIEND_NAME}</span>
                </div>
                <p className="mt-6 text-base leading-8 text-[#5f4a3c] md:text-lg">{selectedImage.caption}</p>
                <div className="mt-8 rounded-[24px] bg-white/70 p-5 shadow-sm ring-1 ring-[#e8dac9]">
                  <p className="font-serif text-xl text-[#4d3426]">About this memory</p>
                  <p className="mt-3 text-sm leading-7 text-[#6f5645] md:text-base">
                    {selectedImage.about ||
                      "This is one of those moments that deserves its own little spotlight. You can replace this text with a longer story, what happened that day, why it mattered, or an inside joke the two of you will instantly understand."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
