"use client";
import React, { useState, useCallback, useEffect } from "react";
import { KeyRound, Copy, Check, RefreshCw, Info } from "lucide-react";

// ─── Word list ───────────────────────────────────────────────────────────────
// A curated list of common, easy-to-type, easy-to-remember English words.
// Words are selected by rolling cryptographically secure random indices
// (crypto.getRandomValues), the same principle as classic dice-roll
// diceware — just backed by the browser's CSPRNG instead of physical dice.

const WORD_LIST: string[] = [
  "abroad","acid","acorn","action","actor","adult","again","agent","aimed","aisle",
  "alarm","album","alert","alike","alive","alley","almond","alone","along","alpha",
  "amber","ample","amuse","anchor","angel","anger","angle","animal","ankle","apple",
  "apply","apron","arena","argue","arise","armor","aroma","arrow","aside","asked",
  "aspect","attic","audio","aunt","autumn","avoid","awake","award","axis","badge",
  "baker","bamboo","banana","banjo","barge","barn","baron","basil","basin","basket",
  "batch","beach","beacon","beam","bean","bear","beast","beauty","beaver","become",
  "bench","berry","better","beyond","bicycle","bike","binder","birch","bird","birth",
  "biscuit","bitter","blade","blank","blast","blaze","blend","bless","blimp","blink",
  "block","bloom","blossom","blouse","blue","board","boat","bobcat","bolt","bonfire",
  "bonus","boost","border","bottle","bounce","boundary","bowl","brain","branch","brave",
  "bread","break","breeze","brick","bridge","brief","bright","broom","brown","brush",
  "bubble","bucket","buddy","budget","buffalo","bugle","bunch","bundle","bunny","burrow",
  "cabin","cable","cactus","cake","camel","camera","camp","canal","candle","candy",
  "canoe","canvas","canyon","cape","carbon","card","cargo","carpet","carrot","cart",
  "castle","cedar","cellar","cement","chain","chair","chalk","charm","chart","chase",
  "cheese","cherry","chess","chicken","chili","chimney","choice","circle","citrus","city",
  "clamp","clap","classic","clay","clever","cliff","climate","cloak","clock","closet",
  "cloth","cloud","clover","cluster","coach","coast","cobalt","cocoa","coffee","coin",
  "colony","color","comet","comfort","comic","common","compass","concert","copper","coral",
  "corner","cosmic","cotton","couch","cougar","cousin","coyote","cradle","craft","crane",
  "crater","crayon","cream","creek","crest","cricket","crisp","crown","crumb","crystal",
  "cuddle","cupcake","curl","curry","curtain","curve","cushion","custom","cycle","cypress",
  "dairy","daisy","dance","dawn","decade","deep","deer","delta","dense","depot",
  "desert","design","desk","dessert","detail","dial","diamond","diary","dice","digit",
  "dinner","direct","disco","ditch","dolphin","domain","donkey","doodle","dough","dove",
  "dragon","drama","drift","drink","drum","dune","dusk","eagle","early","earth",
  "easel","echo","eclipse","elbow","elder","electric","elephant","elm","ember","emerald",
  "empire","enable","energy","engine","envelope","equal","escape","estate","event","exact",
  "expert","fabric","falcon","family","fancy","farm","feast","feather","fence","fern",
  "fiber","field","fig","filter","finch","finger","finish","fireplace","fjord","flame",
  "flannel","flash","flavor","fleece","flint","float","flock","flood","floor","flour",
  "flower","fluid","flute","foam","focus","fold","forest","forge","forum","fossil",
  "fountain","fox","frame","freckle","fresh","friend","frog","frost","fruit","funnel",
  "future","galaxy","gallery","garden","garlic","gasket","gather","gazelle","gecko","gentle",
  "geode","ginger","giraffe","glacier","gland","glass","glide","globe","glory","glove",
  "goat","gold","gorge","gothic","grain","grand","granite","grape","grass","gravel",
  "gravity","green","grill","grocery","grove","guitar","gutter","habit","hallway","hammer",
  "hamster","handle","harbor","harmony","harp","harvest","hazel","header","hearth","heather",
  "hedge","helix","helmet","herb","heron","hidden","hiker","hillside","history","hobby",
  "holiday","honey","horizon","horn","horse","hotel","house","hover","human","humble",
  "hunter","hyacinth","hydro","hyphen","icicle","igloo","image","impact","inbox","index",
  "indigo","injury","inland","inlet","inside","invite","ionic","irony","island","ivory",
  "jacket","jade","jaguar","jasmine","jelly","jersey","jewel","jigsaw","journal","journey",
  "joyful","jumbo","jungle","junior","kayak","kernel","kettle","keyboard","kilo","kingdom",
  "kitchen","kitten","kiwi","knight","knot","label","ladder","lagoon","lake","lamp",
  "lantern","laptop","lark","laser","lattice","laundry","laurel","lava","lawn","layer",
  "leaf","league","ledge","legend","lemon","lentil","letter","lever","liberty","library",
  "lichen","lilac","limit","linen","lion","liquid","little","lizard","llama","lobby",
  "lobster","local","locket","lodge","logic","lotus","lounge","lucky","lumber","lunar",
  "lyric","magic","magnet","magpie","mallet","mammal","mango","mantle","maple","marble",
  "march","marina","market","marsh","mascot","matrix","meadow","medal","melody","melon",
  "mentor","mercury","meteor","meter","metro","midnight","mineral","mirror","mission","mist",
  "mitten","mocha","model","module","molecule","monarch","monkey","monsoon","month","moon",
  "moose","morning","mosaic","motion","motor","mountain","mouse","mouth","mural","muscle",
  "museum","music","mustang","mustard","napkin","narrow","nature","navy","nebula","needle",
  "nectar","nephew","nerve","nest","network","niche","noble","noodle","north","notch",
  "novel","nugget","number","nurse","nutmeg","oasis","object","ocean","olive","onion",
  "opal","orange","orbit","orchard","orchid","organ","origin","osprey","otter","outfit",
  "outline","oval","oven","owl","oxygen","oyster","pacific","package","paddle","palace",
  "palm","panda","panel","pansy","panther","papaya","paper","parcel","parrot","parsley",
  "pasta","patch","path","patio","peace","peach","peacock","peak","peanut","pearl",
  "pebble","pecan","pedal","pelican","pencil","penguin","pepper","perch","permit","petal",
  "phrase","piano","pickle","picnic","pillow","pilot","pine","pineapple","pioneer","pistol",
  "pixel","planet","plank","plant","plateau","platform","plaza","pocket","poet","point",
  "polar","polish","pollen","pond","poplar","poppy","portal","possum","postage","pottery",
  "prairie","prawn","prefix","prelude","prism","project","prompt","proud","pudding","puffin",
  "pumpkin","puppet","puppy","purple","puzzle","pyramid","python","quail","quaint","quality",
  "quarry","quartz","quest","quiet","quill","quilt","quiver","rabbit","raccoon","racer",
  "radar","radio","raffle","rafter","raisin","ranch","random","range","raptor","raven",
  "ravine","razor","reason","rebel","recipe","record","reed","reef","region","relay",
  "relic","remedy","reptile","rescue","resort","result","retro","reward","ribbon","ridge",
  "rifle","ripple","ritual","river","roast","robin","rocket","rodeo","romance","rooster",
  "rooted","rope","roster","rotate","rover","royal","ruby","rugged","runner","rustic",
  "saddle","safari","saffron","sailor","salad","salmon","salon","sample","sandal","sapling",
  "sapphire","satin","savage","scale","scarf","scatter","scenic","school","scoop","scout",
  "screen","script","scroll","sculpt","season","secret","sector","seed","segment","sensor",
  "sepia","serene","shadow","shallow","shark","shell","shelter","shield","shine","shore",
  "shrimp","shrub","shuffle","siesta","signal","silk","silver","simple","singer","siren",
  "sketch","skiing","skyline","slate","sleigh","slice","slope","smooth","snail","snake",
  "sneaker","snorkel","sonic","sonnet","soothe","sorbet","sound","source","spark","sparrow",
  "spear","spice","spider","sponge","spool","spring","sprout","spruce","spurt","squad",
  "square","squash","squid","stable","stadium","stage","stamp","statue","steady","steam",
  "stellar","stew","stitch","stone","storm","story","strait","stream","street","stripe",
  "studio","summit","sunset","supply","surf","swallow","swamp","sweater","swift","switch",
  "sword","syrup","system","tablet","tackle","tactic","talent","tangle","target","tavern",
  "temple","tender","tennis","tepee","terrace","texture","theme","thicket","thistle","thread",
  "thunder","ticket","tiger","timber","tinker","tissue","toast","toffee","token","topaz",
  "torch","tornado","tortoise","toucan","tower","toxic","trail","train","transit","trapeze",
  "travel","treaty","trellis","trench","tribal","trickle","trinket","tripod","trophy","tropic",
  "trout","trowel","trumpet","tulip","tumble","tundra","tunnel","turban","turtle","tusk",
  "tutor","tuxedo","tweed","twilight","twine","umbrella","uncle","unicorn","union","unique",
  "upbeat","upland","upward","urban","utopia","valley","vanilla","vapor","velvet","vendor",
  "venture","verdict","vessel","vetted","victor","vigor","village","vinyl","violet","vision",
  "visor","vivid","vixen","vocal","volcano","voucher","voyage","waffle","wagon","walnut",
  "walrus","wander","warble","warden","warmth","wasabi","water","weave","welcome","whale",
  "wheat","whisk","whisper","wicker","widget","willow","window","winter","wisdom","wizard",
  "wombat","wonder","woodland","wool","worthy","wrangle","wrench","yacht","yield","zephyr",
  "zesty","zinc","zodiac",
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Separator = "-" | "_" | "." | " ";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function secureRandomInt(maxExclusive: number): number {
  const range = maxExclusive;
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % range);
  const buf = new Uint32Array(1);
  let value: number;
  do {
    crypto.getRandomValues(buf);
    value = buf[0];
  } while (value >= limit);
  return value % range;
}

function pickWords(count: number): string[] {
  return Array.from({ length: count }, () => WORD_LIST[secureRandomInt(WORD_LIST.length)]);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function buildPassphrase(
  wordCount: number,
  separator: Separator,
  capitalizeWords: boolean,
  appendNumber: boolean,
  appendSymbol: boolean,
): { passphrase: string; entropyBits: number } {
  const words = pickWords(wordCount);
  const parts: string[] = words.map((w) => (capitalizeWords ? capitalize(w) : w));

  let entropyBits = wordCount * Math.log2(WORD_LIST.length);

  if (appendNumber) {
    const digit = secureRandomInt(100);
    parts.push(digit.toString().padStart(2, "0"));
    entropyBits += Math.log2(100);
  }
  if (appendSymbol) {
    const symbols = "!@#$%^&*?";
    parts.push(symbols[secureRandomInt(symbols.length)]);
    entropyBits += Math.log2(symbols.length);
  }

  return { passphrase: parts.join(separator), entropyBits };
}

function entropyLabel(bits: number): { label: string; color: string } {
  if (bits < 40) return { label: "Weak", color: "text-red-600" };
  if (bits < 60) return { label: "Fair", color: "text-orange-600" };
  if (bits < 80) return { label: "Strong", color: "text-blue-600" };
  return { label: "Very strong", color: "text-emerald-600" };
}

const SEPARATOR_OPTIONS: Array<{ value: Separator; label: string }> = [
  { value: "-", label: "hyphen-case" },
  { value: "_", label: "snake_case" },
  { value: ".", label: "dot.case" },
  { value: " ", label: "space case" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function DicewarePassphraseGeneratorClient() {
  const [wordCount, setWordCount] = useState<number>(5);
  const [separator, setSeparator] = useState<Separator>("-");
  const [capitalizeWords, setCapitalizeWords] = useState<boolean>(false);
  const [appendNumber, setAppendNumber] = useState<boolean>(true);
  const [appendSymbol, setAppendSymbol] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>("");
  const [entropyBits, setEntropyBits] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const regenerate = useCallback((): void => {
    const result = buildPassphrase(
      wordCount,
      separator,
      capitalizeWords,
      appendNumber,
      appendSymbol,
    );
    setPassphrase(result.passphrase);
    setEntropyBits(result.entropyBits);
    setCopied(false);
  }, [wordCount, separator, capitalizeWords, appendNumber, appendSymbol]);

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regenerate]);

  const handleCopy = (): void => {
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strength = entropyLabel(entropyBits);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-green-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-2xl mb-4 shadow-lg">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Diceware Passphrase Generator
          </h2>
          <p className="text-gray-600">
            Random word-based passphrases — long, memorable, and hard to
            crack
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Generated Passphrase
            </label>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-xl">
              <KeyRound className="w-5 h-5 text-teal-600 flex-shrink-0" />
              <input
                type="text"
                value={passphrase}
                readOnly
                className="flex-1 bg-transparent text-lg font-mono font-semibold text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-gray-700">
                Estimated strength
              </span>
              <span className={`text-sm font-bold ${strength.color}`}>
                {strength.label} · ~{Math.round(entropyBits)} bits of entropy
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-out ${
                  strength.label === "Weak"
                    ? "bg-red-500"
                    : strength.label === "Fair"
                      ? "bg-orange-500"
                      : strength.label === "Strong"
                        ? "bg-blue-500"
                        : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(100, (entropyBits / 100) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" /> Copy Passphrase
                </>
              )}
            </button>
            <button
              onClick={regenerate}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <RefreshCw className="w-5 h-5" />
              Regenerate
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-gray-700">
                  Number of Words: {wordCount}
                </label>
              </div>
              <input
                type="range"
                min={3}
                max={8}
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-teal-200 to-emerald-300 rounded-lg appearance-none cursor-pointer"
                aria-label="Number of words"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>3</span>
                <span>8</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Separator
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {SEPARATOR_OPTIONS.map(({ value, label }) => (
                  <button
                    key={label}
                    onClick={() => setSeparator(value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                      separator === value
                        ? "bg-teal-600 text-white border-teal-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Capitalize words",
                  subtext: "Word → Word",
                  value: capitalizeWords,
                  set: setCapitalizeWords,
                },
                {
                  label: "Add a number",
                  subtext: "Appends 2 random digits",
                  value: appendNumber,
                  set: setAppendNumber,
                },
                {
                  label: "Add a symbol",
                  subtext: "Appends 1 random symbol",
                  value: appendSymbol,
                  set: setAppendSymbol,
                },
              ].map(({ label, subtext, value, set }) => (
                <label
                  key={label}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => set(e.target.checked)}
                    className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {label}
                    </div>
                    <div className="text-xs text-gray-600">{subtext}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-teal-600" />
            Why passphrases beat complex passwords
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            A random passphrase like{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              maple-otter-cliff-71
            </code>{" "}
            is both easier to remember and harder to crack than a short
            complex string like{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
              Tr7!qL2
            </code>
            . Length matters more than complexity — each extra random word
            adds roughly {Math.round(Math.log2(WORD_LIST.length))} bits of
            entropy, compounding fast. Words are selected using your
            browser's cryptographically secure random number generator, and
            nothing is ever transmitted or stored.
          </p>
        </div>
      </div>
    </div>
  );
}
