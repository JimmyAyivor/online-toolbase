"use client";
import React, { useState } from "react";
import {
  User,
  Users,
  Briefcase,
  Baby,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Download,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type NameType = "full" | "first" | "last" | "business" | "baby";
type Gender = "any" | "male" | "female";

interface GeneratedName {
  id: number;
  name: string;
}

interface NameTypeConfig {
  id: NameType;
  label: string;
  icon: React.ElementType;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const FIRST_NAMES_MALE: readonly string[] = [
  "James",
  "John",
  "Robert",
  "Michael",
  "William",
  "David",
  "Richard",
  "Joseph",
  "Thomas",
  "Charles",
  "Christopher",
  "Daniel",
  "Matthew",
  "Anthony",
  "Mark",
  "Donald",
  "Steven",
  "Paul",
  "Andrew",
  "Joshua",
  "Kevin",
  "Brian",
  "George",
  "Edward",
  "Ronald",
  "Timothy",
  "Jason",
  "Jeffrey",
  "Ryan",
  "Jacob",
  "Nicholas",
  "Eric",
  "Jonathan",
  "Stephen",
  "Larry",
  "Justin",
  "Scott",
  "Brandon",
  "Benjamin",
  "Samuel",
  "Alexander",
  "Patrick",
  "Jack",
  "Dennis",
  "Jerry",
  "Tyler",
  "Aaron",
  "Henry",
  "Douglas",
  "Peter",
];

const FIRST_NAMES_FEMALE: readonly string[] = [
  "Mary",
  "Patricia",
  "Jennifer",
  "Linda",
  "Elizabeth",
  "Barbara",
  "Susan",
  "Jessica",
  "Sarah",
  "Karen",
  "Nancy",
  "Lisa",
  "Betty",
  "Margaret",
  "Sandra",
  "Ashley",
  "Kimberly",
  "Emily",
  "Donna",
  "Michelle",
  "Dorothy",
  "Carol",
  "Amanda",
  "Melissa",
  "Deborah",
  "Stephanie",
  "Rebecca",
  "Sharon",
  "Laura",
  "Cynthia",
  "Kathleen",
  "Amy",
  "Angela",
  "Shirley",
  "Anna",
  "Brenda",
  "Pamela",
  "Emma",
  "Nicole",
  "Helen",
  "Samantha",
  "Katherine",
  "Christine",
  "Debra",
  "Rachel",
  "Carolyn",
  "Janet",
  "Catherine",
  "Maria",
  "Heather",
];

const LAST_NAMES: readonly string[] = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
];

const BUSINESS_WORDS_1: readonly string[] = [
  "Global",
  "Tech",
  "Smart",
  "Digital",
  "Cloud",
  "Cyber",
  "Web",
  "Net",
  "Alpha",
  "Prime",
  "Next",
  "Future",
  "Pro",
  "Meta",
  "Quantum",
  "Swift",
  "Peak",
  "Elite",
  "Core",
  "Apex",
];

const BUSINESS_WORDS_2: readonly string[] = [
  "Solutions",
  "Systems",
  "Technologies",
  "Innovations",
  "Ventures",
  "Dynamics",
  "Enterprises",
  "Services",
  "Partners",
  "Group",
  "Industries",
  "Labs",
  "Studio",
  "Works",
  "Media",
  "Consulting",
  "Corporation",
  "Holdings",
  "Associates",
  "Capital",
];

const BABY_NAMES_BOY: readonly string[] = [
  "Liam",
  "Noah",
  "Oliver",
  "Elijah",
  "William",
  "James",
  "Benjamin",
  "Lucas",
  "Henry",
  "Alexander",
  "Mason",
  "Michael",
  "Ethan",
  "Daniel",
  "Jacob",
  "Logan",
  "Jackson",
  "Levi",
  "Sebastian",
  "Mateo",
  "Jack",
  "Owen",
  "Theodore",
  "Aiden",
  "Samuel",
  "Joseph",
  "John",
  "David",
  "Wyatt",
  "Matthew",
  "Luke",
  "Asher",
  "Carter",
  "Julian",
  "Grayson",
  "Leo",
  "Jayden",
  "Gabriel",
  "Isaac",
  "Lincoln",
];

const BABY_NAMES_GIRL: readonly string[] = [
  "Olivia",
  "Emma",
  "Charlotte",
  "Amelia",
  "Ava",
  "Sophia",
  "Isabella",
  "Mia",
  "Evelyn",
  "Harper",
  "Luna",
  "Camila",
  "Gianna",
  "Elizabeth",
  "Eleanor",
  "Ella",
  "Abigail",
  "Sofia",
  "Avery",
  "Scarlett",
  "Emily",
  "Aria",
  "Penelope",
  "Chloe",
  "Layla",
  "Mila",
  "Nora",
  "Hazel",
  "Madison",
  "Ellie",
  "Lily",
  "Nova",
  "Isla",
  "Grace",
  "Violet",
  "Aurora",
  "Riley",
  "Zoey",
  "Willow",
  "Emilia",
];

const NAME_TYPE_CONFIGS: NameTypeConfig[] = [
  { id: "full", label: "Full Name", icon: Users },
  { id: "first", label: "First Name", icon: User },
  { id: "last", label: "Last Name", icon: User },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "baby", label: "Baby Name", icon: Baby },
];

const GENDER_BUTTONS: Array<{
  id: Gender;
  label: string;
  activeColor: string;
}> = [
  { id: "any", label: "Any", activeColor: "bg-purple-600" },
  { id: "male", label: "Male", activeColor: "bg-blue-600" },
  { id: "female", label: "Female", activeColor: "bg-pink-600" },
];

const USE_CASES = [
  {
    bg: "bg-purple-50",
    titleColor: "text-purple-900",
    emoji: "👤",
    title: "Character Names",
    desc: "Perfect for writers, game developers, and storytellers",
  },
  {
    bg: "bg-blue-50",
    titleColor: "text-blue-900",
    emoji: "👶",
    title: "Baby Names",
    desc: "Find inspiration for your newborn's name",
  },
  {
    bg: "bg-indigo-50",
    titleColor: "text-indigo-900",
    emoji: "🏢",
    title: "Business Names",
    desc: "Generate professional company name ideas",
  },
  {
    bg: "bg-cyan-50",
    titleColor: "text-cyan-900",
    emoji: "🎭",
    title: "Usernames",
    desc: "Create unique online identities",
  },
  {
    bg: "bg-teal-50",
    titleColor: "text-teal-900",
    emoji: "🧪",
    title: "Testing Data",
    desc: "Generate dummy data for development",
  },
];

const FEATURES = [
  { color: "bg-purple-600", text: "Generate up to 50 names at once" },
  { color: "bg-blue-600", text: "Multiple name types and categories" },
  { color: "bg-indigo-600", text: "Gender-specific options available" },
  { color: "bg-cyan-600", text: "Copy individual or all names" },
  { color: "bg-teal-600", text: "Download as text file" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function pickGenderedFirst(gender: Gender, pool: "first" | "baby"): string {
  const [maleList, femaleList] =
    pool === "first"
      ? [FIRST_NAMES_MALE, FIRST_NAMES_FEMALE]
      : [BABY_NAMES_BOY, BABY_NAMES_GIRL];

  const list =
    gender === "male"
      ? maleList
      : gender === "female"
        ? femaleList
        : Math.random() > 0.5
          ? maleList
          : femaleList;

  return pickRandom(list);
}

function buildName(nameType: NameType, gender: Gender): string {
  switch (nameType) {
    case "full":
      return `${pickGenderedFirst(gender, "first")} ${pickRandom(LAST_NAMES)}`;
    case "first":
      return pickGenderedFirst(gender, "first");
    case "last":
      return pickRandom(LAST_NAMES);
    case "business":
      return `${pickRandom(BUSINESS_WORDS_1)} ${pickRandom(BUSINESS_WORDS_2)}`;
    case "baby":
      return pickGenderedFirst(gender, "baby");
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function RandomNameGeneratorClient() {
  const [nameType, setNameType] = useState<NameType>("full");
  const [gender, setGender] = useState<Gender>("any");
  const [count, setCount] = useState<number>(10);
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [copied, setCopied] = useState<string>("");

  const generateNames = (): void => {
    const names = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: buildName(nameType, gender),
    }));
    setGeneratedNames(names);
  };

  const handleCopyName = (name: string): void => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleCopyAll = (): void => {
    navigator.clipboard.writeText(generatedNames.map((n) => n.name).join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(""), 2000);
  };

  const handleDownload = (): void => {
    const blob = new Blob([generatedNames.map((n) => n.name).join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const element = document.createElement("a");
    element.href = url;
    element.download = "random-names.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  const showGender = nameType !== "last" && nameType !== "business";

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Random Name Generator
          </h2>
          <p className="text-gray-500">Generate random names for any purpose</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <User className="w-6 h-6 text-purple-600" />
                Name Type
              </h3>

              {/* Type selector */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                {NAME_TYPE_CONFIGS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setNameType(id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl font-semibold transition-all ${
                      nameType === id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>

              {/* Gender */}
              {showGender && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {GENDER_BUTTONS.map(({ id, label, activeColor }) => (
                      <button
                        key={id}
                        onClick={() => setGender(id)}
                        className={`p-3 rounded-xl font-semibold transition-all ${
                          gender === id
                            ? `${activeColor} text-white shadow-lg`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Count slider */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Number of Names: {count}
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={count}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCount(parseInt(e.target.value))
                  }
                  className="w-full h-3 bg-gradient-to-r from-purple-200 to-blue-300 rounded-lg appearance-none cursor-pointer"
                  aria-label="Number of names"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <button
                onClick={generateNames}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all"
              >
                <RefreshCw className="w-6 h-6" />
                Generate Names
              </button>
            </div>

            {/* Results */}
            {generatedNames.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-xl">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                    Generated Names ({generatedNames.length})
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyAll}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {copied === "all" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copied === "all" ? "Copied!" : "Copy All"}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  {generatedNames.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <span className="font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <button
                        onClick={() => handleCopyName(item.name)}
                        aria-label={`Copy ${item.name}`}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        {copied === item.name ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 sticky top-8">
              <h3 className="font-bold text-gray-900 mb-6">💡 Use Cases</h3>
              <div className="space-y-4">
                {USE_CASES.map(({ bg, titleColor, emoji, title, desc }) => (
                  <div key={title} className={`p-4 ${bg} rounded-xl`}>
                    <h4 className={`font-bold ${titleColor} mb-2`}>
                      {emoji} {title}
                    </h4>
                    <p className="text-sm text-gray-700">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-md p-6 border-2 border-purple-200">
              <h4 className="font-bold text-gray-900 mb-4">✨ Features</h4>
              <div className="space-y-3 text-sm text-gray-700">
                {FEATURES.map(({ color, text }) => (
                  <div key={text} className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 ${color} rounded-full mt-2 flex-shrink-0`}
                    />
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h4 className="font-bold text-gray-900 mb-3">
                🎯 Popular Categories
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                {[
                  "Full names for characters",
                  "First names only",
                  "Last names / Surnames",
                  "Business & company names",
                  "Modern baby names",
                ].map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
