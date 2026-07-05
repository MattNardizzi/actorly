/* ============================================================================
   Actorly — mock data. Authentically Irish, plausible, no lorem ipsum.
   Faces via pravatar (stable, real portraits); production stills via picsum.
   ========================================================================== */

export const face = (n: number) => `https://i.pravatar.cc/640?img=${n}`;
export const still = (seed: string, w = 1200, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type Actor = {
  id: string;
  name: string;
  slug: string;
  img: number;
  location: string;
  gender: "Female" | "Male" | "Non-binary";
  ethnicity: string;
  ageMin: number;
  ageMax: number;
  playingAge: string;
  height: string;
  hair: string;
  eyes: string;
  build: string;
  agent: string | null;
  headline: string;
  skills: string[];
  accents: string[];
  languages: string[];
  showreel: boolean;
  voicereel: boolean;
  credits: { title: string; role: string; house: string; year: number }[];
};

export const ACTORS: Actor[] = [
  {
    id: "a1", name: "Saoirse Ní Bhraonáin", slug: "saoirse-ni-bhraonain", img: 5,
    location: "Dublin", gender: "Female", ethnicity: "White Irish", ageMin: 24, ageMax: 30,
    playingAge: "22–32", height: "5'6\"", hair: "Auburn", eyes: "Green", build: "Slim",
    agent: "The Lisa Richards Agency", headline: "Stage-trained lead with a feature reel",
    skills: ["Stage combat", "Sean-nós singing", "Horse riding"], accents: ["Dublin", "RP", "General American"],
    languages: ["English", "Gaeilge", "French"], showreel: true, voicereel: true,
    credits: [
      { title: "The Quiet Land", role: "Máire", house: "Screen Ireland", year: 2025 },
      { title: "Fair City", role: "Recurring — Dr. Nolan", house: "RTÉ", year: 2024 },
    ],
  },
  {
    id: "a2", name: "Cillian Mac Cárthaigh", slug: "cillian-mac-carthaigh", img: 12,
    location: "Cork", gender: "Male", ethnicity: "White Irish", ageMin: 31, ageMax: 39,
    playingAge: "30–42", height: "6'1\"", hair: "Dark brown", eyes: "Blue", build: "Athletic",
    agent: "Teresa Daly Associates", headline: "Screen character actor, dry wit",
    skills: ["Boxing", "Guitar", "Motorbike licence"], accents: ["Cork", "Belfast", "Estuary"],
    languages: ["English", "Gaeilge"], showreel: true, voicereel: false,
    credits: [
      { title: "Kin", role: "Guest lead", house: "RTÉ / AMC", year: 2024 },
      { title: "Sea Wall", role: "Alex", house: "Abbey Theatre", year: 2023 },
    ],
  },
  {
    id: "a3", name: "Aoife Doherty", slug: "aoife-doherty", img: 9,
    location: "Galway", gender: "Female", ethnicity: "White Irish", ageMin: 27, ageMax: 34,
    playingAge: "25–36", height: "5'8\"", hair: "Black", eyes: "Brown", build: "Slim",
    agent: null, headline: "Independent — theatre & commercial",
    skills: ["Contemporary dance", "Yoga instructor", "Swimming"], accents: ["Galway", "RP", "Scottish"],
    languages: ["English", "Gaeilge", "Spanish"], showreel: true, voicereel: true,
    credits: [{ title: "Druid — The Playboy", role: "Pegeen", house: "Druid", year: 2025 }],
  },
  {
    id: "a4", name: "Tadhg Ó Súilleabháin", slug: "tadhg-o-suilleabhain", img: 15,
    location: "Kerry", gender: "Male", ethnicity: "White Irish", ageMin: 55, ageMax: 68,
    playingAge: "55–70", height: "5'10\"", hair: "Grey", eyes: "Hazel", build: "Heavy-set",
    agent: "First Call Management", headline: "Veteran of stage and screen",
    skills: ["Sean-nós", "Fishing", "Sheepdog handling"], accents: ["Kerry", "West of Ireland", "RP"],
    languages: ["English", "Gaeilge"], showreel: false, voicereel: true,
    credits: [{ title: "The Banshees of Inisherin", role: "Featured", house: "Searchlight", year: 2022 }],
  },
  {
    id: "a5", name: "Niamh Gallagher", slug: "niamh-gallagher", img: 20,
    location: "Belfast", gender: "Female", ethnicity: "White Irish", ageMin: 19, ageMax: 24,
    playingAge: "16–24", height: "5'4\"", hair: "Blonde", eyes: "Blue", build: "Petite",
    agent: "The Lisa Richards Agency", headline: "Rising screen talent, strong Belfast voice",
    skills: ["Gymnastics", "Piano", "Roller skating"], accents: ["Belfast", "Derry", "General American"],
    languages: ["English"], showreel: true, voicereel: true,
    credits: [{ title: "Blue Lights", role: "Guest — Erin", house: "BBC", year: 2024 }],
  },
  {
    id: "a6", name: "Oisín Byrne", slug: "oisin-byrne", img: 33,
    location: "Dublin", gender: "Male", ethnicity: "White Irish", ageMin: 22, ageMax: 28,
    playingAge: "18–28", height: "5'11\"", hair: "Light brown", eyes: "Green", build: "Slim",
    agent: null, headline: "Independent — self-tape ready, comedy & drama",
    skills: ["Improv", "Skateboarding", "Beatboxing"], accents: ["Dublin", "General American", "Cockney"],
    languages: ["English", "Gaeilge"], showreel: true, voicereel: false,
    credits: [{ title: "Bóthar (short)", role: "Lead — Marcus", house: "IADT", year: 2025 }],
  },
  {
    id: "a7", name: "Chiamaka Okafor", slug: "chiamaka-okafor", img: 44,
    location: "Dublin", gender: "Female", ethnicity: "Black Irish", ageMin: 26, ageMax: 33,
    playingAge: "24–35", height: "5'9\"", hair: "Black", eyes: "Dark brown", build: "Athletic",
    agent: "Teresa Daly Associates", headline: "Screen lead, trained at the Gaiety",
    skills: ["Afro-fusion dance", "Netball", "Presenting"], accents: ["Dublin", "Nigerian", "RP"],
    languages: ["English", "Igbo", "French"], showreel: true, voicereel: true,
    credits: [{ title: "Obituary", role: "Recurring", house: "RTÉ", year: 2024 }],
  },
  {
    id: "a8", name: "Darragh Nolan", slug: "darragh-nolan", img: 51,
    location: "Limerick", gender: "Male", ethnicity: "White Irish", ageMin: 40, ageMax: 50,
    playingAge: "40–52", height: "6'3\"", hair: "Shaved", eyes: "Grey", build: "Muscular",
    agent: "First Call Management", headline: "Heavies, hard men, quiet menace",
    skills: ["Stage combat", "Weightlifting", "Rugby (ex-pro)"], accents: ["Limerick", "Dublin", "Estuary"],
    languages: ["English"], showreel: true, voicereel: false,
    credits: [{ title: "Kin", role: "Series regular", house: "RTÉ / AMC", year: 2023 }],
  },
  {
    id: "a9", name: "Róisín Ní Mhurchú", slug: "roisin-ni-mhurchu", img: 25,
    location: "Connemara", gender: "Female", ethnicity: "White Irish", ageMin: 34, ageMax: 44,
    playingAge: "34–46", height: "5'7\"", hair: "Red", eyes: "Green", build: "Average",
    agent: null, headline: "Native Irish speaker, TG4 regular",
    skills: ["Traditional singing", "Bodhrán", "Sailing"], accents: ["Connemara", "West of Ireland", "RP"],
    languages: ["Gaeilge", "English"], showreel: true, voicereel: true,
    credits: [{ title: "Ros na Rún", role: "Series regular", house: "TG4", year: 2025 }],
  },
  {
    id: "a10", name: "Wojciech Kowalski", slug: "wojciech-kowalski", img: 60,
    location: "Dublin", gender: "Male", ethnicity: "White Polish-Irish", ageMin: 29, ageMax: 37,
    playingAge: "28–38", height: "6'0\"", hair: "Dark blond", eyes: "Blue", build: "Athletic",
    agent: "Teresa Daly Associates", headline: "Bilingual lead, film & high-end TV",
    skills: ["Fencing", "Krav Maga", "Cello"], accents: ["Dublin", "Polish", "General American", "German"],
    languages: ["English", "Polish", "German"], showreel: true, voicereel: true,
    credits: [{ title: "Vikings: Valhalla", role: "Featured", house: "Netflix", year: 2023 }],
  },
  {
    id: "a11", name: "Méabh Hegarty", slug: "meabh-hegarty", img: 32,
    location: "Sligo", gender: "Female", ethnicity: "White Irish", ageMin: 45, ageMax: 55,
    playingAge: "44–58", height: "5'5\"", hair: "Salt & pepper", eyes: "Blue", build: "Average",
    agent: "The Lisa Richards Agency", headline: "Warmth, gravitas, matriarchs",
    skills: ["Choral singing", "Baking (screen)", "Gaelic football coach"], accents: ["Sligo", "Donegal", "RP"],
    languages: ["English", "Gaeilge"], showreel: false, voicereel: true,
    credits: [{ title: "The Quiet Land", role: "Bríd", house: "Screen Ireland", year: 2025 }],
  },
  {
    id: "a12", name: "Conor Whelan", slug: "conor-whelan", img: 68,
    location: "Waterford", gender: "Male", ethnicity: "White Irish", ageMin: 18, ageMax: 22,
    playingAge: "15–22", height: "5'9\"", hair: "Brown", eyes: "Brown", build: "Slim",
    agent: null, headline: "Independent — first credits, hungry",
    skills: ["Hurling (county minor)", "Guitar", "Parkour"], accents: ["Waterford", "Dublin", "General American"],
    languages: ["English"], showreel: false, voicereel: false,
    credits: [{ title: "Bland Ambition (short)", role: "Supporting", house: "Kimmage", year: 2025 }],
  },
  {
    id: "a13", name: "Priya Raghunathan", slug: "priya-raghunathan", img: 45,
    location: "Cork", gender: "Female", ethnicity: "South Asian Irish", ageMin: 30, ageMax: 38,
    playingAge: "28–40", height: "5'6\"", hair: "Black", eyes: "Dark brown", build: "Slim",
    agent: "First Call Management", headline: "Screen & commercial, medical-drama regular",
    skills: ["Bharatanatyam", "Tennis", "Voiceover"], accents: ["Cork", "RP", "General American", "Indian"],
    languages: ["English", "Tamil", "Hindi"], showreel: true, voicereel: true,
    credits: [{ title: "Smother", role: "Guest lead", house: "RTÉ", year: 2024 }],
  },
  {
    id: "a14", name: "Fionn Ó Ceallaigh", slug: "fionn-o-ceallaigh", img: 3,
    location: "Dublin", gender: "Male", ethnicity: "White Irish", ageMin: 35, ageMax: 45,
    playingAge: "34–46", height: "6'2\"", hair: "Black", eyes: "Blue", build: "Athletic",
    agent: "The Lisa Richards Agency", headline: "Leading man, international credits",
    skills: ["Horse riding", "Sword fighting", "Sailing"], accents: ["Dublin", "RP", "General American", "Scottish"],
    languages: ["English", "Gaeilge", "Italian"], showreel: true, voicereel: true,
    credits: [{ title: "Foundation", role: "Recurring", house: "Apple TV+", year: 2024 }],
  },
];

export type Role = {
  name: string;
  description: string;
  ageRange: string;
  gender: string;
  ethnicity: string;
  selfTape: boolean;
};

export type Job = {
  id: string;
  title: string;
  slug: string;
  category: string;
  house: string;
  location: string;
  deadline: string;
  paid: boolean;
  pay: string;
  logline: string;
  posted: string;
  roles: Role[];
  applicants: number;
  seed: string;
};

export const JOBS: Job[] = [
  {
    id: "j1", title: "The Quiet Land", slug: "the-quiet-land", category: "Feature Film",
    house: "Tilted Pictures / Screen Ireland", location: "Co. Mayo", deadline: "2026-07-28",
    paid: true, pay: "SAG-AFTRA scale + per diem, 6-week shoot", posted: "2026-07-01", applicants: 214,
    seed: "quietland",
    logline:
      "A widowed sheep farmer and her estranged son are forced back onto the same land during a brutal winter. A quiet, elemental drama in the tradition of the West.",
    roles: [
      { name: "MÁIRE", description: "Late 20s, fierce and grief-worn. Carries the farm and the film. Fluent Irish an advantage.", ageRange: "26–32", gender: "Female", ethnicity: "White Irish", selfTape: true },
      { name: "SEÁN", description: "Early 30s, the son who left for the city and came home hollow.", ageRange: "30–36", gender: "Male", ethnicity: "White Irish", selfTape: true },
      { name: "BRÍD", description: "50s, the neighbour who sees everything. Warmth over steel.", ageRange: "48–58", gender: "Female", ethnicity: "White Irish", selfTape: false },
    ],
  },
  {
    id: "j2", title: "Fair City — 2026 Block", slug: "fair-city-2026", category: "TV Series",
    house: "RTÉ", location: "Dublin (RTÉ Studios)", deadline: "2026-07-18",
    paid: true, pay: "Equity rate, recurring contract", posted: "2026-07-03", applicants: 341,
    seed: "faircity",
    logline: "Ireland's longest-running soap opens three recurring roles for its autumn arc set around Carrigstown's new community theatre.",
    roles: [
      { name: "DR. AMARA OKafor", description: "30s GP, sharp and principled, new to Carrigstown.", ageRange: "30–40", gender: "Female", ethnicity: "Any", selfTape: true },
      { name: "BARISTA — JAY", description: "Early 20s, cheeky, quick. Comedy timing essential.", ageRange: "18–24", gender: "Male", ethnicity: "Any", selfTape: true },
    ],
  },
  {
    id: "j3", title: "Guinness — 'The Return'", slug: "guinness-the-return", category: "Advertisement",
    house: "Diageo / BBDO Dublin", location: "Dublin & Cong", deadline: "2026-07-12",
    paid: true, pay: "€2,500 buyout, EU usage, 2 years", posted: "2026-07-02", applicants: 502,
    seed: "guinness",
    logline: "A prodigal daughter comes home to the pub she grew up in. Hero national + EU campaign. Real faces, real warmth.",
    roles: [
      { name: "THE DAUGHTER", description: "Late 20s–30s, expressive, a face that tells a whole story in silence.", ageRange: "27–36", gender: "Female", ethnicity: "Any", selfTape: true },
      { name: "THE PUBLICAN", description: "60s, weathered, kind. The heart of the pub.", ageRange: "58–70", gender: "Male", ethnicity: "White Irish", selfTape: true },
    ],
  },
  {
    id: "j4", title: "Sea Wall", slug: "sea-wall", category: "Theatre",
    house: "Abbey Theatre", location: "Dublin", deadline: "2026-08-04",
    paid: true, pay: "Abbey Equity contract, 5-week run", posted: "2026-06-29", applicants: 96,
    seed: "seawall",
    logline: "A one-man revival of Simon Stephens' devastating monologue. Seeking a single male actor to carry 40 minutes alone.",
    roles: [
      { name: "ALEX", description: "30s–40s, everyman, capable of holding an audience in the palm of his hand and then breaking it.", ageRange: "34–46", gender: "Male", ethnicity: "Any", selfTape: false },
    ],
  },
  {
    id: "j5", title: "Bóthar", slug: "bothar", category: "Short Film",
    house: "IADT Grad Films", location: "Wicklow", deadline: "2026-07-15",
    paid: false, pay: "Expenses + meals + copy of film. Festival-bound (Galway Film Fleadh submission).", posted: "2026-07-04", applicants: 58,
    seed: "bothar",
    logline: "Two strangers share a night-drive across the country and everything unspoken between them. Dialogue-light, face-forward.",
    roles: [
      { name: "MARCUS", description: "Early 20s, guarded, running from something.", ageRange: "18–26", gender: "Male", ethnicity: "Any", selfTape: true },
      { name: "ELLE", description: "Early 20s, the driver, sees straight through him.", ageRange: "18–26", gender: "Female", ethnicity: "Any", selfTape: true },
    ],
  },
];

export type Agent = {
  name: string;
  category: "Adult" | "Child" | "Model" | "UK-based";
  location: string;
  roster: number;
  email: string;
};

export const AGENTS: Agent[] = [
  { name: "The Lisa Richards Agency", category: "Adult", location: "Dublin", roster: 180, email: "casting@lisarichards.ie" },
  { name: "Teresa Daly Associates", category: "Adult", location: "Dublin", roster: 92, email: "info@teresadaly.ie" },
  { name: "First Call Management", category: "Adult", location: "Dublin", roster: 140, email: "casting@firstcall.ie" },
  { name: "The Agency (Ire)", category: "Adult", location: "Galway", roster: 64, email: "hello@theagency.ie" },
  { name: "Little Rascals Casting", category: "Child", location: "Dublin", roster: 220, email: "kids@littlerascals.ie" },
  { name: "Young Blood Talent", category: "Child", location: "Cork", roster: 130, email: "casting@youngblood.ie" },
  { name: "Morgan the Agency", category: "Model", location: "Dublin", roster: 310, email: "bookings@morgan.ie" },
  { name: "Compton Models Ireland", category: "Model", location: "Dublin", roster: 240, email: "casting@compton.ie" },
  { name: "United Agents", category: "UK-based", location: "London", roster: 520, email: "info@unitedagents.co.uk" },
  { name: "Independent Talent (UK)", category: "UK-based", location: "London", roster: 610, email: "casting@independenttalent.com" },
];

export const STATS = {
  actors: 12480,
  castingDirectors: 640,
  productionsCast: 3120,
  agents: 74,
};

/* Filter vocabularies used across the casting search UI. */
export const FILTERS = {
  gender: ["Female", "Male", "Non-binary"],
  ethnicity: ["White Irish", "Black Irish", "South Asian Irish", "East Asian Irish", "White European", "Mixed heritage", "Any"],
  hair: ["Black", "Dark brown", "Brown", "Light brown", "Blonde", "Red", "Auburn", "Grey", "Shaved"],
  eyes: ["Brown", "Dark brown", "Hazel", "Green", "Blue", "Grey"],
  build: ["Petite", "Slim", "Average", "Athletic", "Muscular", "Heavy-set"],
  hasReel: ["Has showreel", "Has voice reel", "Has self-tape on file"],
};
