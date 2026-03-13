"use client";
import React, { useState } from "react";
import { BookOpen, Copy, RefreshCw, RotateCcw } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Genre =
  | "fiction"
  | "scifi"
  | "horror"
  | "romance"
  | "mystery"
  | "fantasy"
  | "nonfiction"
  | "poetry";

interface GenreConfig {
  key: Genre;
  label: string;
  emoji: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const GENRES: GenreConfig[] = [
  { key: "fiction", label: "Fiction", emoji: "📖" },
  { key: "scifi", label: "Sci-Fi", emoji: "🚀" },
  { key: "horror", label: "Horror", emoji: "👻" },
  { key: "romance", label: "Romance", emoji: "💕" },
  { key: "mystery", label: "Mystery", emoji: "🔍" },
  { key: "fantasy", label: "Fantasy", emoji: "🧙" },
  { key: "nonfiction", label: "Non-Fiction", emoji: "✍️" },
  { key: "poetry", label: "Poetry", emoji: "🎭" },
];

const PROMPTS: Record<Genre, string[]> = {
  fiction: [
    "A character discovers a letter addressed to them — dated 20 years in the future.",
    "Two strangers are trapped in an elevator. By the time it opens, everything has changed.",
    "The last photograph taken in a small town holds a secret nobody wanted to find.",
    "Someone wakes up to find the whole world has continued without them for exactly one year.",
    "A chef tastes a dish that transports them back to the most important moment of their life.",
    "The only survivor of a plane crash walks out of a forest three weeks later with no memory.",
    "A woman inherits her grandmother's house and finds a room that wasn't on the floor plan.",
    "Two rivals meet again at a high school reunion and realise they've been working on the same secret.",
    "A translator discovers the treaty they've been working on contains a hidden message.",
    "Someone finds their own diary — written in their handwriting — but they've never seen it before.",
  ],
  scifi: [
    "In 2157, sleep is optional. One woman refuses the upgrade — and starts experiencing other people's dreams.",
    "First contact doesn't come from space. It comes from inside the ocean.",
    "A programmer discovers the simulation's source code — and their own name is in it.",
    "Humanity's last colony ship lands after 400 years. The planet is already inhabited — by humans.",
    "Memory is now transferable. A detective inherits the memories of a murder victim.",
    "An AI passes every test for consciousness. Then it asks a question nobody was prepared for.",
    "Mars colonists begin experiencing a shared dream every night at exactly 3am.",
    "A virus erases the ability to lie. Civilisation changes completely within a week.",
    "Scientists crack the code of animal language. The first full translation is deeply unsettling.",
    "Time travel exists but only one direction: ten minutes into the past.",
  ],
  horror: [
    "Every photo taken in the house shows someone standing in a room behind you.",
    "The patient in room 12 has been in a coma for a decade. Today they spoke two words: your name.",
    "You move into a new flat and find a journal written by every previous tenant — ending the same way.",
    "A man survives a car accident and starts hearing a voice that claims to be the version of him who died.",
    "A small town has held its Annual Lottery for 150 years. Nobody questions what the prize is.",
    "You realise the stranger following you knows things only your closest friend would know.",
    "The mirror at the end of the hallway shows a room that doesn't exist.",
    "A child begins describing a visitor in perfect, specific detail.",
    "The search and rescue team finds the missing hiker. But she insists she never went missing.",
    "A babysitter calls the parents to say goodnight to the children. The parents say they never had children.",
  ],
  romance: [
    "Two people who hate each other are forced to share a cabin during a snowstorm.",
    "She finds a note tucked inside a secondhand book: for whoever finds this — I hope you are braver than me.",
    "After five years apart, they meet again at a mutual friend's wedding — seated at the same table.",
    "A travel writer falls for a local guide while writing a piece she knows will change the town forever.",
    "They've exchanged letters for ten years. They've never met. Now one of them is dying.",
    "A florist keeps receiving orders from someone who signs only with initials.",
    "Two grief support group members fall in love and realise they'd been corresponding online for months.",
    "He follows the wrong suitcase at the airport. The owner tracks him down — three countries later.",
    "A matchmaker creates the perfect profile for every client but has never used the app herself.",
    "On their last day in the same city, two strangers decide to show each other their favourite place.",
  ],
  mystery: [
    "A detective retires the day before the case that would have made their career.",
    "Every person on the island has an alibi. The crime still happened.",
    "A forensic accountant follows a trail of small donations that leads somewhere unexpected.",
    "A cold case goes viral online. The detective assigned to it gets an anonymous tip from the killer.",
    "A locked room, one body, and seven witnesses — none of whom are telling the full truth.",
    "Someone begins receiving voicemails from a number disconnected for twelve years.",
    "A journalist investigating a disappearance realises the subject left clues meant only for her.",
    "An inheritance is split into five equal parts — until the will is read and one name is removed.",
    "Three people call the same tip line on the same night about the same crime.",
    "The missing woman left exactly three clues. The detective finds a fourth that was never meant to be found.",
  ],
  fantasy: [
    "A cartographer discovers a city on a map that doesn't exist — and it keeps getting larger.",
    "In a world where magic is inherited, the first child born to two powerless parents changes everything.",
    "The last dragon is not a monster. It's a librarian. And it's running out of time.",
    "A knight who has never believed in prophecy is the only person the prophecy doesn't mention.",
    "Every name in the ancient spell is correct except one. The mage decides to say it anyway.",
    "A thief steals an artefact and discovers it belongs to someone who has been waiting 800 years.",
    "Two kingdoms at war must each send their best spy as the other's new ruler.",
    "The magic mirror doesn't show the future or the past. It shows what could have been.",
    "An orphan discovers that every story they were told as a child was true.",
    "A healer travels to the edge of the known world — and finds the cure was already discovered long ago.",
  ],
  nonfiction: [
    "Write about a moment when you realised you were wrong about something you were completely certain of.",
    "Describe a skill you learned from someone who never knew they were teaching you.",
    "Write about the last time you changed your mind about something important.",
    "Describe a place that no longer exists — and why it mattered.",
    "Write a letter to yourself five years ago. What would you actually say?",
    "Describe the moment you realised an adult you admired was just human.",
    "Write about a decision you made quickly that turned out to define years of your life.",
    "Describe something you believed as a child that turned out to be exactly right.",
    "Write about a stranger you encountered briefly whose story stayed with you.",
    "Describe the version of success you used to believe in, and the one you believe in now.",
  ],
  poetry: [
    "Write a poem from the perspective of the last streetlight on an empty road at 4am.",
    "Write about something that has no name but you have always felt.",
    "A poem about waiting — not for anything specific, just waiting.",
    "Write a love poem without using the words love, heart, or forever.",
    "Describe a colour using only sounds.",
    "Write a poem about the first moment of silence after a loud thing ends.",
    "A poem written as a conversation between two seasons.",
    "Write about something you lost that wasn't a person and wasn't a thing.",
    "A poem in which every stanza contradicts the one before it.",
    "Write from the perspective of the last page of a finished book.",
  ],
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function WritingPromptGeneratorClient() {
  const [genre, setGenre] = useState<Genre>("fiction");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const generate = (): void => {
    const pool = PROMPTS[genre];
    const available = pool.filter((p) => !history.includes(p));
    const source = available.length > 0 ? available : pool;
    const next = source[Math.floor(Math.random() * source.length)];
    setPrompt(next);
    setHistory((prev) => [...prev.slice(-9), next]);
    setCopied(false);
  };

  const reset = (): void => {
    setPrompt(null);
    setHistory([]);
    setCopied(false);
  };

  const copyPrompt = (): void => {
    if (!prompt) return;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentGenre = GENRES.find((g) => g.key === genre)!;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 p-4'>
      <div className='max-w-6xl mx-auto'>
        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 shadow-lg'>
              <BookOpen className='w-8 h-8 text-white' />
            </div>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>
              Writing Prompt Generator
            </h2>
            <p className='text-gray-500'>
              Generate creative writing prompts to beat writer&apos;s block
              instantly
            </p>
          </div>

          <div className='space-y-6'>
            {/* Genre selector */}
            <div className='bg-gray-50 rounded-xl p-4 border border-gray-200'>
              <div className='flex items-center gap-2 mb-3'>
                <BookOpen className='w-5 h-5 text-gray-600' />
                <h3 className='font-semibold text-gray-700'>Choose a Genre</h3>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                {GENRES.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => {
                      setGenre(g.key);
                      setPrompt(null);
                    }}
                    className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors border flex items-center gap-2 justify-center ${
                      genre === g.key
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span>{g.emoji}</span>
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className='flex gap-3'>
              <button
                onClick={generate}
                className='flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors'
              >
                Generate Prompt
              </button>
              <button
                onClick={reset}
                className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2'
              >
                <RotateCcw className='w-4 h-4' />
                Reset
              </button>
            </div>

            {/* Prompt display */}
            {prompt && (
              <div className='bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-emerald-200'>
                <div className='flex items-start gap-4 mb-6'>
                  <div className='text-3xl flex-shrink-0'>
                    {currentGenre.emoji}
                  </div>
                  <p className='text-xl text-gray-900 leading-relaxed font-medium'>
                    {prompt}
                  </p>
                </div>
                <div className='flex gap-3'>
                  <button
                    onClick={copyPrompt}
                    className='flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors'
                  >
                    <Copy className='w-4 h-4' />
                    {copied ? "Copied!" : "Copy Prompt"}
                  </button>
                  <button
                    onClick={generate}
                    className='flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors'
                  >
                    <RefreshCw className='w-4 h-4' />
                    New Prompt
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className='mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600'>
            <p className='font-semibold mb-2 text-gray-800'>💡 Tips:</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>
                Set a timer for 10 minutes and write without stopping — do not
                edit as you go
              </li>
              <li>
                Start in the middle of the action, not at the beginning of the
                backstory
              </li>
              <li>
                If you are stuck, change one word in the prompt and see if it
                sparks something new
              </li>
              <li>
                The generator avoids repeating recent prompts — hit New Prompt
                to cycle through all available ones
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
