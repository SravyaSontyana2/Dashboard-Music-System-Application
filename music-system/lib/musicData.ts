export type Lang =
  | "english"
  | "hindi"
  | "telugu"
  | "tamil"
  | "malayalam"
  | "kannada";

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number;
  albumId: string;
  albumImage: string;
  thumbnail: string;
  audio?: string;
}

export type AlbumType = "soundtrack" | "artist" | "mood" | "genre";
export type Mood =
  | "chill"
  | "party"
  | "focus"
  | "roadtrip"
  | "workout"
  | "romantic";
export type Genre =
  | "romantic"
  | "melody"
  | "devotional"
  | "mass"
  | "classical";

export interface Album {
  id: string;
  title: string;
  artist: string;
  lang: Lang;
  year: number;
  hue: number;
  image: string;
  songs: Song[];
  type?: AlbumType;
  mood?: Mood;
  genre?: Genre;
  curator?: string;
}

export interface LanguageInfo {
  id: Lang;
  label: string;
  native: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
}

export const LANGUAGES: LanguageInfo[] = [
  { id: "english", label: "English", native: "English" },
  { id: "hindi", label: "Hindi", native: "हिन्दी" },
  { id: "telugu", label: "Telugu", native: "తెలుగు" },
  { id: "tamil", label: "Tamil", native: "தமிழ்" },
  { id: "malayalam", label: "Malayalam", native: "മലയാളം" },
  { id: "kannada", label: "Kannada", native: "ಕನ್ನಡ" },
];

const albumImageUrl = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/600`;
const thumbnailUrl = (seed: string) =>
  `https://picsum.photos/seed/${seed}/300/300`;

interface TrackInput {
  title: string;
  artist?: string;
  duration: number;
}

function buildAlbum(
  id: string,
  title: string,
  artist: string,
  lang: Lang,
  year: number,
  hue: number,
  tracks: TrackInput[]
): Album {
  const image = albumImageUrl(`${lang}-${id}`);
  const songs: Song[] = tracks.map((t, i) => {
    const songId = `${id}-s${i + 1}`;
    return {
      id: songId,
      title: t.title,
      artist: t.artist ?? artist,
      duration: t.duration,
      albumId: id,
      albumImage: image,
      thumbnail: thumbnailUrl(`${lang}-${songId}`),
    };
  });
  return { id, title, artist, lang, year, hue, image, songs };
}

export const ALBUMS: Album[] = [
  // ─────────── ENGLISH ───────────
  buildAlbum("alb-en-divide", "÷ (Divide)", "Ed Sheeran", "english", 2017, 195, [
    { title: "Eraser", duration: 232 },
    { title: "Castle on the Hill", duration: 261 },
    { title: "Dive", duration: 238 },
    { title: "Shape of You", duration: 234 },
    { title: "Perfect", duration: 263 },
    { title: "Galway Girl", duration: 170 },
    { title: "Happier", duration: 207 },
    { title: "New Man", duration: 189 },
    { title: "Hearts Don't Break Around Here", duration: 248 },
    { title: "What Do I Know?", duration: 235 },
    { title: "How Would You Feel (Paean)", duration: 280 },
  ]),
  buildAlbum("alb-en-afterhours", "After Hours", "The Weeknd", "english", 2020, 220, [
    { title: "Alone Again", duration: 250 },
    { title: "Too Late", duration: 240 },
    { title: "Hardest to Love", duration: 211 },
    { title: "Scared to Live", duration: 191 },
    { title: "Snowchild", duration: 247 },
    { title: "Escape from LA", duration: 296 },
    { title: "Heartless", duration: 198 },
    { title: "Faith", duration: 283 },
    { title: "Blinding Lights", duration: 200 },
    { title: "In Your Eyes", duration: 237 },
    { title: "Save Your Tears", duration: 215 },
  ]),
  buildAlbum("alb-en-future", "Future Nostalgia", "Dua Lipa", "english", 2020, 280, [
    { title: "Future Nostalgia", duration: 184 },
    { title: "Don't Start Now", duration: 183 },
    { title: "Cool", duration: 215 },
    { title: "Physical", duration: 193 },
    { title: "Levitating", duration: 203 },
    { title: "Pretty Please", duration: 197 },
    { title: "Hallucinate", duration: 213 },
    { title: "Love Again", duration: 258 },
    { title: "Break My Heart", duration: 222 },
    { title: "Good in Bed", duration: 218 },
    { title: "Boys Will Be Boys", duration: 173 },
  ]),

  // ─────────── HINDI ───────────
  buildAlbum("alb-hi-aashiqui2", "Aashiqui 2", "Various Artists", "hindi", 2013, 305, [
    { title: "Tum Hi Ho", artist: "Arijit Singh", duration: 262 },
    { title: "Sun Raha Hai", artist: "Ankit Tiwari", duration: 286 },
    { title: "Chahun Main Ya Naa", artist: "Arijit Singh & Palak Muchhal", duration: 311 },
    { title: "Hum Mar Jayenge", artist: "Arijit Singh & Tulsi Kumar", duration: 308 },
    { title: "Bhula Dena", artist: "Mustafa Zahid", duration: 293 },
    { title: "Piya Aaye Na", artist: "KK & Tulsi Kumar", duration: 338 },
    { title: "Aasan Nahin Yahan", artist: "Arijit Singh", duration: 294 },
    { title: "Meri Aashiqui", artist: "Palak Muchhal", duration: 288 },
    { title: "Sun Raha Hai (Female)", artist: "Shreya Ghoshal", duration: 286 },
    { title: "Milne Hai Mujhse Aayi", artist: "Arijit Singh", duration: 314 },
  ]),
  buildAlbum("alb-hi-brahmastra", "Brahmastra", "Pritam", "hindi", 2022, 335, [
    { title: "Kesariya", artist: "Arijit Singh", duration: 268 },
    { title: "Deva Deva", artist: "Arijit Singh & Jonita Gandhi", duration: 261 },
    { title: "Rasiya", artist: "Shreya Ghoshal & Tushar Joshi", duration: 251 },
    { title: "Dance Ka Bhoot", artist: "Arijit Singh", duration: 218 },
    { title: "Kesariya - Dance Mix", artist: "Arijit Singh", duration: 242 },
    { title: "Mahadev Theme", artist: "Pritam", duration: 198 },
    { title: "Brahmastra Theme", artist: "Pritam", duration: 215 },
    { title: "Premam Bhaavam", artist: "Pritam", duration: 187 },
    { title: "Beend Bola", artist: "Pritam", duration: 203 },
    { title: "Astras' Theme", artist: "Pritam", duration: 175 },
  ]),
  buildAlbum("alb-hi-kabir", "Kabir Singh", "Various Artists", "hindi", 2019, 5, [
    { title: "Bekhayali", artist: "Sachet Tandon", duration: 367 },
    { title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", duration: 281 },
    { title: "Pehla Pyaar", artist: "Armaan Malik", duration: 287 },
    { title: "Mere Sohneya", artist: "Sachet Tandon & Parampara Thakur", duration: 261 },
    { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva & Tulsi Kumar", duration: 258 },
    { title: "Yeh Aaina", artist: "Shreya Ghoshal", duration: 264 },
    { title: "Kaise Hua", artist: "Vishal Mishra", duration: 240 },
    { title: "Kabira", artist: "Tochi Raina & Rekha Bhardwaj", duration: 254 },
    { title: "Tu Itni Khoobsurat Hai", artist: "Rahat Fateh Ali Khan", duration: 299 },
    { title: "Tujhe Kitna Chahne Lage (Reprise)", artist: "Mithoon", duration: 224 },
  ]),

  // ─────────── TELUGU ───────────
  buildAlbum("alb-te-ala", "Ala Vaikunthapurramuloo", "Thaman S", "telugu", 2020, 320, [
    { title: "Butta Bomma", artist: "Armaan Malik", duration: 246 },
    { title: "Ramuloo Ramulaa", artist: "Anurag Kulkarni & Mangli", duration: 287 },
    { title: "Samajavaragamana", artist: "Sid Sriram", duration: 296 },
    { title: "OMG Daddy", artist: "Roll Rida & Rahul Sipligunj", duration: 272 },
    { title: "Sittharala Sirpadu", artist: "Penchal Das", duration: 278 },
    { title: "Bommas!", artist: "Sahithi Chaganti", duration: 215 },
    { title: "You Are My MM", artist: "Thaman S", duration: 168 },
    { title: "Ala Vaikunthapurramuloo Theme", artist: "Thaman S", duration: 192 },
    { title: "Ramuloo Ramulaa - Reprise", artist: "Mangli", duration: 246 },
    { title: "Samajavaragamana - Pathos", artist: "Thaman S", duration: 184 },
  ]),
  buildAlbum("alb-te-pushpa", "Pushpa: The Rise", "Devi Sri Prasad", "telugu", 2021, 25, [
    { title: "Srivalli", artist: "Sid Sriram", duration: 251 },
    { title: "Saami Saami", artist: "Mounika Yadav", duration: 213 },
    { title: "Oo Antava Oo Oo Antava", artist: "Indravathi Chauhan", duration: 277 },
    { title: "Daakko Daakko Meka", artist: "Shivam Mahadevan & Nakash Aziz", duration: 251 },
    { title: "Eyy Bidda Idhi Naa Adda", artist: "Nakash Aziz", duration: 231 },
    { title: "Pushpa Pushpa", artist: "Mika Singh & Nakash Aziz", duration: 197 },
    { title: "Jaago Jaago Bakre", artist: "Devi Sri Prasad", duration: 173 },
    { title: "Toofan", artist: "Devi Sri Prasad", duration: 165 },
    { title: "Pushpa Title Track", artist: "Devi Sri Prasad", duration: 138 },
    { title: "Oo Antava (Telugu)", artist: "Devi Sri Prasad", duration: 225 },
  ]),
  buildAlbum("alb-te-rrr", "RRR", "M. M. Keeravani", "telugu", 2022, 350, [
    { title: "Naatu Naatu", artist: "Rahul Sipligunj & Kaala Bhairava", duration: 211 },
    { title: "Dosti", artist: "Hemachandra & Amit Trivedi", duration: 219 },
    { title: "Komuram Bheemudo", artist: "Kaala Bhairava", duration: 263 },
    { title: "Janani", artist: "Mounima", duration: 268 },
    { title: "Etthara Jenda", artist: "Vishal Mishra", duration: 226 },
    { title: "Sholay", artist: "Vivek Hariharan", duration: 178 },
    { title: "Ramam Raghavam", artist: "Bhairava", duration: 232 },
    { title: "Roar of RRR", artist: "M. M. Keeravani", duration: 211 },
    { title: "Raamam Bheemam", artist: "Kaala Bhairava", duration: 218 },
    { title: "RRR Theme", artist: "M. M. Keeravani", duration: 169 },
  ]),

  // ─────────── TAMIL ───────────
  buildAlbum("alb-ta-master", "Master", "Anirudh Ravichander", "tamil", 2021, 220, [
    { title: "Vaathi Coming", artist: "Anirudh Ravichander & Gana Balachandar", duration: 219 },
    { title: "Kutti Story", artist: "Thalapathy Vijay", duration: 227 },
    { title: "Beat of Master", artist: "Anirudh Ravichander", duration: 221 },
    { title: "Polakatum Para Para", artist: "Anirudh Ravichander", duration: 229 },
    { title: "Andha Kanna Paathaakaa", artist: "Thalapathy Vijay", duration: 279 },
    { title: "Vaathi Raid", artist: "Anirudh Ravichander", duration: 205 },
    { title: "Master Theme", artist: "Anirudh Ravichander", duration: 192 },
    { title: "Quit Pannuda", artist: "Arivu", duration: 217 },
    { title: "Bhavani BGM", artist: "Anirudh Ravichander", duration: 163 },
    { title: "Beat of Master - Reprise", artist: "Anirudh Ravichander", duration: 188 },
  ]),
  buildAlbum("alb-ta-96", "96", "Govind Vasantha", "tamil", 2018, 200, [
    { title: "Kaathalae Kaathalae", artist: "Chinmayi Sripaada", duration: 270 },
    { title: "Vaanam Mella", artist: "Pradeep Kumar", duration: 297 },
    { title: "Anthaathi", artist: "Chinmayi & Govind Vasantha", duration: 292 },
    { title: "Life of Ram", artist: "Pradeep Kumar", duration: 286 },
    { title: "The Last Coffee", artist: "Govind Vasantha", duration: 162 },
    { title: "Yaen", artist: "Chinmayi", duration: 245 },
    { title: "Photograph", artist: "Govind Vasantha", duration: 198 },
    { title: "Kaathalae - Reprise", artist: "Chinmayi", duration: 254 },
    { title: "Old School Memories", artist: "Govind Vasantha", duration: 175 },
    { title: "96 Title Track", artist: "Govind Vasantha", duration: 213 },
  ]),
  buildAlbum("alb-ta-vikram", "Vikram", "Anirudh Ravichander", "tamil", 2022, 12, [
    { title: "Pathala Pathala", artist: "Kamal Haasan", duration: 250 },
    { title: "Once Upon a Time", artist: "Anirudh Ravichander", duration: 242 },
    { title: "My Name Is Vikram", artist: "Anirudh Ravichander", duration: 234 },
    { title: "Wasted Wasteman", artist: "Anirudh Ravichander", duration: 215 },
    { title: "Porkanda Singam", artist: "Anirudh Ravichander", duration: 211 },
    { title: "Vikram Title Track", artist: "Anirudh Ravichander", duration: 198 },
    { title: "Hunting the Ghost", artist: "Anirudh Ravichander", duration: 189 },
    { title: "OG Reveal", artist: "Anirudh Ravichander", duration: 207 },
    { title: "Sandhanam", artist: "Anirudh Ravichander", duration: 173 },
    { title: "Final Fight", artist: "Anirudh Ravichander", duration: 182 },
  ]),

  // ─────────── MALAYALAM ───────────
  buildAlbum("alb-ml-premam", "Premam", "Rajesh Murugesan", "malayalam", 2015, 160, [
    { title: "Malare", artist: "Vijay Yesudas", duration: 263 },
    { title: "Aluva Puzhayude Theerathu", artist: "Vineeth Sreenivasan", duration: 210 },
    { title: "Rockaankuthu", artist: "Sachin Warrier", duration: 251 },
    { title: "Kalippu", artist: "Job Kurian", duration: 235 },
    { title: "Scene Contra", artist: "Rajesh Murugesan", duration: 179 },
    { title: "Chethi Mandaram Thulasi", artist: "K. J. Yesudas", duration: 314 },
    { title: "En Ammede Sthothram", artist: "Rajesh Murugesan", duration: 152 },
    { title: "Premam Theme", artist: "Rajesh Murugesan", duration: 191 },
    { title: "Malare - Reprise", artist: "Vijay Yesudas", duration: 242 },
    { title: "Malare (Female)", artist: "Shreya Ghoshal", duration: 263 },
  ]),
  buildAlbum("alb-ml-bangalore", "Bangalore Days", "Gopi Sundar", "malayalam", 2014, 180, [
    { title: "Maangalyam", artist: "Vijay Yesudas & Vineeth Sreenivasan", duration: 240 },
    { title: "Thumbi Penne", artist: "Haricharan & Janani Sivanesan", duration: 257 },
    { title: "Etho Mazhayil", artist: "Mithun Eshwar", duration: 273 },
    { title: "Ootty Pattanam", artist: "Vineeth Sreenivasan", duration: 226 },
    { title: "Nyabagam", artist: "Karthik", duration: 255 },
    { title: "Maangalyam (Reprise)", artist: "Vineeth Sreenivasan", duration: 212 },
    { title: "Mangaly", artist: "Vijay Yesudas", duration: 242 },
    { title: "Bangalore Days Theme", artist: "Gopi Sundar", duration: 184 },
    { title: "Thirike Thirike", artist: "Yazin Nizar", duration: 268 },
    { title: "Ee Pathiravum", artist: "Sayanora Philip", duration: 231 },
  ]),
  buildAlbum("alb-ml-hridayam", "Hridayam", "Hesham Abdul Wahab", "malayalam", 2022, 140, [
    { title: "Darshana", artist: "Hesham Abdul Wahab", duration: 263 },
    { title: "Manorathangal", artist: "Hesham Abdul Wahab", duration: 232 },
    { title: "Pranayame", artist: "Hesham Abdul Wahab", duration: 254 },
    { title: "Mukilo", artist: "K. S. Harisankar", duration: 246 },
    { title: "Madhuram", artist: "Hesham Abdul Wahab", duration: 283 },
    { title: "Vijanathayil", artist: "Vineeth Sreenivasan", duration: 294 },
    { title: "Hridayam Theme", artist: "Hesham Abdul Wahab", duration: 174 },
    { title: "Mounamayi", artist: "Hesham Abdul Wahab", duration: 251 },
    { title: "Pinneyum Pinneyum", artist: "Hesham Abdul Wahab", duration: 225 },
    { title: "Kaiyethum Doorath", artist: "Hesham Abdul Wahab", duration: 217 },
  ]),

  // ─────────── KANNADA ───────────
  buildAlbum("alb-kn-kgf2", "KGF Chapter 2", "Ravi Basrur", "kannada", 2022, 350, [
    { title: "Toofan", artist: "Ravi Basrur", duration: 232 },
    { title: "Sulthana", artist: "Ravi Basrur & Mohan Krishna", duration: 261 },
    { title: "Mehbooba", artist: "Ananya Bhat", duration: 264 },
    { title: "The Monster Song", artist: "Adithi Sagar", duration: 217 },
    { title: "Gagana", artist: "Ravi Basrur", duration: 198 },
    { title: "Salaam Rocky Bhai", artist: "Santhosh Venky", duration: 184 },
    { title: "Rocky's Theme", artist: "Ravi Basrur", duration: 156 },
    { title: "Adheera Theme", artist: "Ravi Basrur", duration: 174 },
    { title: "KGF Title Track", artist: "Ravi Basrur", duration: 211 },
    { title: "Mother Theme", artist: "Ravi Basrur", duration: 168 },
  ]),
  buildAlbum("alb-kn-charlie", "777 Charlie", "Nobin Paul", "kannada", 2022, 30, [
    { title: "Lifeu Ondhu Sotta Sotta", artist: "Sanjith Hegde", duration: 251 },
    { title: "Charlie Theme", artist: "Nobin Paul", duration: 213 },
    { title: "Yaava Mohana Murali", artist: "Charan Raj", duration: 288 },
    { title: "Naane Naa", artist: "Sanjith Hegde", duration: 246 },
    { title: "Lifeu Ondhu - Sad", artist: "Sanjith Hegde", duration: 231 },
    { title: "777 Travel Theme", artist: "Nobin Paul", duration: 204 },
    { title: "Lonely Soul", artist: "Nobin Paul", duration: 178 },
    { title: "Find Charlie", artist: "Nobin Paul", duration: 196 },
    { title: "Together Forever", artist: "Nobin Paul", duration: 218 },
    { title: "Goodbye Charlie", artist: "Nobin Paul", duration: 252 },
  ]),
  buildAlbum("alb-kn-kantara", "Kantara", "B. Ajaneesh Loknath", "kannada", 2022, 15, [
    { title: "Varaha Roopam", artist: "Sai Vignesh", duration: 232 },
    { title: "Singara Siriye", artist: "Vijay Prakash", duration: 251 },
    { title: "Rage of Kantara", artist: "B. Ajaneesh Loknath", duration: 178 },
    { title: "Kaadu Bandu Ninthitamma", artist: "Vijaylaxmi", duration: 264 },
    { title: "Kantara Theme", artist: "B. Ajaneesh Loknath", duration: 192 },
    { title: "Bhootha Kola", artist: "B. Ajaneesh Loknath", duration: 216 },
    { title: "Daiva Sandhi", artist: "B. Ajaneesh Loknath", duration: 184 },
    { title: "Shiva's Theme", artist: "B. Ajaneesh Loknath", duration: 165 },
    { title: "Forest Reverie", artist: "B. Ajaneesh Loknath", duration: 207 },
    { title: "Climax Battle", artist: "B. Ajaneesh Loknath", duration: 248 },
  ]),

  // ─────────── ARTIST · ENGLISH ───────────
  {
    ...buildAlbum("alb-en-taylor", "Taylor Swift Greatest", "Taylor Swift", "english", 2023, 320, [
      { title: "Cruel Summer", duration: 178 },
      { title: "Anti-Hero", duration: 200 },
      { title: "Blank Space", duration: 231 },
      { title: "Shake It Off", duration: 219 },
      { title: "Love Story", duration: 235 },
      { title: "Bad Blood", duration: 211 },
      { title: "Wildest Dreams", duration: 220 },
      { title: "Lover", duration: 221 },
      { title: "Cardigan", duration: 239 },
      { title: "Style", duration: 231 },
    ]),
    type: "artist",
    curator: "Taylor Swift",
  },

  // ─────────── MOOD · ENGLISH ───────────
  {
    ...buildAlbum("alb-en-chill", "Chill Vibes Only", "Various Artists", "english", 2024, 200, [
      { title: "Heat Waves", artist: "Glass Animals", duration: 238 },
      { title: "Watermelon Sugar", artist: "Harry Styles", duration: 174 },
      { title: "Sunflower", artist: "Post Malone & Swae Lee", duration: 158 },
      { title: "Stay", artist: "The Kid LAROI & Justin Bieber", duration: 141 },
      { title: "Good Days", artist: "SZA", duration: 279 },
      { title: "Easy On Me", duration: 224, artist: "Adele" },
      { title: "Drivers License", artist: "Olivia Rodrigo", duration: 242 },
      { title: "Riptide", artist: "Vance Joy", duration: 204 },
      { title: "Lost in Japan", artist: "Shawn Mendes", duration: 200 },
      { title: "Falling", artist: "Harry Styles", duration: 240 },
    ]),
    type: "mood",
    mood: "chill",
    curator: "Chill Vibes",
  },
  {
    ...buildAlbum("alb-en-roadtrip", "Road Trip Essentials", "Various Artists", "english", 2024, 30, [
      { title: "Mr. Brightside", artist: "The Killers", duration: 222 },
      { title: "Don't Stop Believin'", artist: "Journey", duration: 250 },
      { title: "Born to Run", artist: "Bruce Springsteen", duration: 270 },
      { title: "Africa", artist: "Toto", duration: 295 },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: 356 },
      { title: "Take Me Home, Country Roads", artist: "John Denver", duration: 192 },
      { title: "Life Is a Highway", artist: "Rascal Flatts", duration: 275 },
      { title: "Drive", artist: "Incubus", duration: 232 },
      { title: "Free Fallin'", artist: "Tom Petty", duration: 257 },
      { title: "Wagon Wheel", artist: "Darius Rucker", duration: 322 },
    ]),
    type: "mood",
    mood: "roadtrip",
    curator: "Highway Sessions",
  },
  {
    ...buildAlbum("alb-en-workout", "Workout Energy EDM", "Various Artists", "english", 2024, 0, [
      { title: "Titanium", artist: "David Guetta", duration: 245 },
      { title: "Wake Me Up", artist: "Avicii", duration: 247 },
      { title: "Animals", artist: "Martin Garrix", duration: 184 },
      { title: "Don't You Worry Child", artist: "Swedish House Mafia", duration: 213 },
      { title: "Levels", artist: "Avicii", duration: 199 },
      { title: "Lean On", artist: "Major Lazer & DJ Snake", duration: 178 },
      { title: "Stronger", artist: "Kanye West", duration: 312 },
      { title: "Bangarang", artist: "Skrillex", duration: 215 },
      { title: "Turn Down for What", artist: "DJ Snake & Lil Jon", duration: 213 },
      { title: "Faded", artist: "Alan Walker", duration: 212 },
    ]),
    type: "mood",
    mood: "workout",
    curator: "Pulse Drive",
  },

  // ─────────── GENRE · ENGLISH ───────────
  {
    ...buildAlbum("alb-en-romantic", "Romantic English Ballads", "Various Artists", "english", 2024, 350, [
      { title: "Perfect", artist: "Ed Sheeran", duration: 263 },
      { title: "All of Me", artist: "John Legend", duration: 269 },
      { title: "A Thousand Years", artist: "Christina Perri", duration: 285 },
      { title: "Just the Way You Are", artist: "Bruno Mars", duration: 220 },
      { title: "Make You Feel My Love", artist: "Adele", duration: 212 },
      { title: "Marry You", artist: "Bruno Mars", duration: 230 },
      { title: "I Will Always Love You", artist: "Whitney Houston", duration: 273 },
      { title: "Lover", artist: "Taylor Swift", duration: 221 },
      { title: "Until I Found You", artist: "Stephen Sanchez", duration: 175 },
      { title: "Photograph", artist: "Ed Sheeran", duration: 258 },
    ]),
    type: "genre",
    genre: "romantic",
    curator: "Love Notes",
  },

  // ─────────── ARTIST · HINDI ───────────
  {
    ...buildAlbum("alb-hi-arijit", "Arijit Singh Hits", "Arijit Singh", "hindi", 2023, 295, [
      { title: "Channa Mereya", duration: 285 },
      { title: "Raabta", duration: 269 },
      { title: "Kabira", duration: 234 },
      { title: "Hawayein", duration: 318 },
      { title: "Ae Watan", duration: 287 },
      { title: "Pal", duration: 254 },
      { title: "Apna Bana Le", duration: 233 },
      { title: "Phir Bhi Tumko Chaahunga", duration: 292 },
      { title: "Tera Yaar Hoon Main", duration: 258 },
      { title: "Sajni", duration: 291 },
    ]),
    type: "artist",
    curator: "Arijit Singh",
  },
  {
    ...buildAlbum("alb-hi-rahman", "A. R. Rahman Magic", "A. R. Rahman", "hindi", 2023, 210, [
      { title: "Kun Faya Kun", artist: "A. R. Rahman, Mohit Chauhan & Javed Ali", duration: 459 },
      { title: "Jai Ho", artist: "A. R. Rahman, Sukhwinder Singh", duration: 320 },
      { title: "Maa Tujhe Salaam", artist: "A. R. Rahman", duration: 415 },
      { title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh & Sapna Awasthi", duration: 416 },
      { title: "Tu Hi Re", artist: "Hariharan & Kavita Krishnamurthy", duration: 401 },
      { title: "Khwaja Mere Khwaja", artist: "A. R. Rahman", duration: 388 },
      { title: "Yeh Jo Des Hai Tera", artist: "A. R. Rahman", duration: 397 },
      { title: "Roja Jaaneman", artist: "S. P. Balasubrahmanyam", duration: 333 },
      { title: "Pal Pal Hai Bhaari", artist: "Madhushree", duration: 391 },
      { title: "Tere Bina", artist: "A. R. Rahman & Chinmayi", duration: 379 },
    ]),
    type: "artist",
    curator: "A. R. Rahman",
  },

  // ─────────── MOOD · HINDI ───────────
  {
    ...buildAlbum("alb-hi-party", "Bollywood Party", "Various Artists", "hindi", 2024, 320, [
      { title: "London Thumakda", artist: "Labh Janjua, Sonu Kakkar & Neha Kakkar", duration: 232 },
      { title: "Saturday Saturday", artist: "Indeep Bakshi", duration: 230 },
      { title: "Kala Chashma", artist: "Amar Arshi & Badshah", duration: 226 },
      { title: "Badtameez Dil", artist: "Benny Dayal", duration: 237 },
      { title: "Galla Goodiyaan", artist: "Yashita Sharma & Manish Kumar Tipu", duration: 295 },
      { title: "Aankh Marey", artist: "Mika Singh & Neha Kakkar", duration: 200 },
      { title: "Nashe Si Chadh Gayi", artist: "Arijit Singh", duration: 282 },
      { title: "Ilahi", artist: "Arijit Singh", duration: 304 },
      { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal & Osman Mir", duration: 253 },
      { title: "Cutiepie", artist: "Pardeep Singh Sran & Nakash Aziz", duration: 197 },
    ]),
    type: "mood",
    mood: "party",
    curator: "Bollywood Nights",
  },

  // ─────────── GENRE · HINDI ───────────
  {
    ...buildAlbum("alb-hi-devotional", "Bhakti Devotional Hits", "Various Artists", "hindi", 2023, 50, [
      { title: "Hanuman Chalisa", artist: "Hariharan", duration: 538 },
      { title: "Om Jai Jagdish Hare", artist: "Anuradha Paudwal", duration: 369 },
      { title: "Shri Ram Chandra Kripalu", artist: "Anup Jalota", duration: 320 },
      { title: "Vaishnav Jan To", artist: "Lata Mangeshkar", duration: 275 },
      { title: "Govinda Bolo", artist: "Krishna Das", duration: 415 },
      { title: "Achyutam Keshavam", artist: "Vikram Hazra", duration: 372 },
      { title: "Shiv Tandav Stotram", artist: "Shankar Mahadevan", duration: 391 },
      { title: "Gayatri Mantra", artist: "Anuradha Paudwal", duration: 426 },
      { title: "Aigiri Nandini", artist: "Rajalakshmee Sanjay", duration: 358 },
      { title: "Maa Durga Chalisa", artist: "Anuradha Paudwal", duration: 511 },
    ]),
    type: "genre",
    genre: "devotional",
    curator: "Bhakti Sangam",
  },

  // ─────────── ARTIST · TELUGU ───────────
  {
    ...buildAlbum("alb-te-spb", "SPB Telugu Classics", "S. P. Balasubrahmanyam", "telugu", 2020, 35, [
      { title: "Telisi Rama Chudu", duration: 263 },
      { title: "Aakasamlo Oka Tara", duration: 287 },
      { title: "Andala Bommavu", duration: 253 },
      { title: "Premikuda", duration: 246 },
      { title: "Aadi Bhikshuvu", duration: 242 },
      { title: "Andamaina Lokam", duration: 238 },
      { title: "Kanne Pillavani", duration: 295 },
      { title: "Ee Velalo Neevu", duration: 275 },
      { title: "Inthalo Ennenni", duration: 269 },
      { title: "Naa Cheli Rojavule", duration: 283 },
    ]),
    type: "artist",
    curator: "S. P. Balasubrahmanyam",
  },
  {
    ...buildAlbum("alb-te-sidsriram", "Sid Sriram Romance", "Sid Sriram", "telugu", 2024, 305, [
      { title: "Inkem Inkem Inkem Kaavaale", duration: 251 },
      { title: "Samajavaragamana", duration: 296 },
      { title: "Adiga Adiga", duration: 285 },
      { title: "Yenti Yenti", duration: 272 },
      { title: "Maguva Maguva", duration: 260 },
      { title: "Em Sandeham Ledhu", duration: 249 },
      { title: "Telisinde Kaadhey", duration: 263 },
      { title: "Cheliyaa", duration: 318 },
      { title: "Nuvvante Naaku", duration: 281 },
      { title: "Srivalli", duration: 251 },
    ]),
    type: "artist",
    curator: "Sid Sriram",
    genre: "romantic",
  },
  {
    ...buildAlbum("alb-te-allu", "Allu Arjun Playlist", "Various Artists", "telugu", 2023, 12, [
      { title: "Butta Bomma", artist: "Armaan Malik", duration: 246 },
      { title: "Ramuloo Ramulaa", artist: "Anurag Kulkarni & Mangli", duration: 287 },
      { title: "Samajavaragamana", artist: "Sid Sriram", duration: 296 },
      { title: "Srivalli", artist: "Sid Sriram", duration: 251 },
      { title: "Saami Saami", artist: "Mounika Yadav", duration: 213 },
      { title: "Oo Antava Oo Oo Antava", artist: "Indravathi Chauhan", duration: 277 },
      { title: "Cinema Choopistha Mava", artist: "Benny Dayal", duration: 257 },
      { title: "Top Lechipoddi", artist: "Devi Sri Prasad", duration: 244 },
      { title: "Seeti Maar", artist: "Devi Sri Prasad & Rita", duration: 218 },
      { title: "Daakko Daakko Meka", artist: "Shivam Mahadevan & Nakash Aziz", duration: 251 },
    ]),
    type: "artist",
    curator: "Allu Arjun",
  },

  // ─────────── MOOD · TELUGU (mass) ───────────
  {
    ...buildAlbum("alb-te-dspmass", "DSP Mass Hits", "Devi Sri Prasad", "telugu", 2022, 25, [
      { title: "Ringa Ringa", artist: "Mallikarjun & Suchith Suresan", duration: 286 },
      { title: "Daddy Mummy", artist: "Vishnupriya & Christopher Stanley", duration: 247 },
      { title: "Bhaja Bhaja", artist: "Shankar Mahadevan", duration: 254 },
      { title: "Cinema Choopistha Mava", artist: "Benny Dayal", duration: 257 },
      { title: "Bhole Shankara", artist: "Sahithi Chaganti", duration: 273 },
      { title: "Saami Saami", artist: "Mounika Yadav", duration: 213 },
      { title: "Oo Antava Oo Oo Antava", artist: "Indravathi Chauhan", duration: 277 },
      { title: "Pakka Local", artist: "Devi Sri Prasad", duration: 251 },
      { title: "Surrender Aithe", artist: "Devi Sri Prasad", duration: 245 },
      { title: "Pushpa Pushpa", artist: "Mika Singh & Nakash Aziz", duration: 197 },
    ]),
    type: "mood",
    mood: "party",
    genre: "mass",
    curator: "Devi Sri Prasad",
  },

  // ─────────── ARTIST · TAMIL ───────────
  {
    ...buildAlbum("alb-ta-anirudh", "Anirudh Ravichander Special", "Anirudh Ravichander", "tamil", 2023, 215, [
      { title: "Why This Kolaveri Di", duration: 252 },
      { title: "Po Nee Po", duration: 274 },
      { title: "Maari Thara Local", duration: 261 },
      { title: "Aaluma Doluma", duration: 242 },
      { title: "Kannamma", duration: 247 },
      { title: "Vaathi Coming", duration: 219 },
      { title: "Pathala Pathala", artist: "Kamal Haasan", duration: 250 },
      { title: "Surviva", duration: 214 },
      { title: "Jimikki Kammal", duration: 232 },
      { title: "Naan Un", duration: 235 },
    ]),
    type: "artist",
    curator: "Anirudh Ravichander",
  },
  {
    ...buildAlbum("alb-ta-ilaiyaraaja", "Ilaiyaraaja Classics", "Ilaiyaraaja", "tamil", 1990, 180, [
      { title: "Ilamai Itho Itho", duration: 268 },
      { title: "Sundari Kannal Oru Sethi", duration: 343 },
      { title: "Janani Janani", duration: 305 },
      { title: "Mandram Vandha", duration: 296 },
      { title: "Kanmani Anbodu", duration: 388 },
      { title: "Rakkamma Kaiyathattu", duration: 326 },
      { title: "Ennodu Vaa Vaa", duration: 312 },
      { title: "Kuyile Kuyile", duration: 287 },
      { title: "Ennavale", duration: 320 },
      { title: "Andhi Mazhai Pozhigirathu", duration: 310 },
    ]),
    type: "artist",
    curator: "Ilaiyaraaja",
    genre: "classical",
  },

  // ─────────── GENRE · TAMIL ───────────
  {
    ...buildAlbum("alb-ta-mass", "Tamil Mass Anthems", "Various Artists", "tamil", 2023, 5, [
      { title: "Vaathi Coming", artist: "Anirudh Ravichander", duration: 219 },
      { title: "Aaluma Doluma", artist: "Anirudh Ravichander", duration: 242 },
      { title: "Surviva", artist: "Yogi B", duration: 214 },
      { title: "Verithanam", artist: "Thalapathy Vijay", duration: 251 },
      { title: "Vaa Machaney", artist: "Santhosh Narayanan", duration: 232 },
      { title: "Singam Theme", artist: "Devi Sri Prasad", duration: 196 },
      { title: "Kutti Story", artist: "Thalapathy Vijay", duration: 227 },
      { title: "Petta Paraak", artist: "Anirudh Ravichander", duration: 222 },
      { title: "Mersal Arasan", artist: "A. R. Rahman", duration: 246 },
      { title: "Karuppu Vellai", artist: "Bharath Sankar", duration: 217 },
    ]),
    type: "genre",
    genre: "mass",
    mood: "workout",
    curator: "Mass Drop",
  },
  {
    ...buildAlbum("alb-ta-romance", "Tamil Romance", "Various Artists", "tamil", 2023, 340, [
      { title: "Munbe Vaa", artist: "A. R. Rahman, Naresh Iyer & Shreya Ghoshal", duration: 309 },
      { title: "Vellai Pookal", artist: "A. R. Rahman", duration: 278 },
      { title: "Anbe Anbe", artist: "Hariharan", duration: 320 },
      { title: "Kaathalae Kaathalae", artist: "Chinmayi Sripaada", duration: 270 },
      { title: "Kannukkul Pothi", artist: "Vijay Yesudas", duration: 296 },
      { title: "Yaen", artist: "Chinmayi", duration: 245 },
      { title: "Vaa Vaa Pakkam", artist: "Karthik & Shweta Mohan", duration: 287 },
      { title: "Anbe Anbe", artist: "Hariharan & Sadhana Sargam", duration: 320 },
      { title: "Kannukku Mai Azhagu", artist: "Vijay Yesudas", duration: 312 },
      { title: "Nenjukkul Peidhidum", artist: "Hariharan", duration: 304 },
    ]),
    type: "genre",
    genre: "romantic",
    curator: "Tamil Hearts",
  },

  // ─────────── ARTIST · MALAYALAM ───────────
  {
    ...buildAlbum("alb-ml-yesudas", "K. J. Yesudas Classics", "K. J. Yesudas", "malayalam", 1985, 165, [
      { title: "Pavizham Pol", duration: 312 },
      { title: "Mounamen Bhaashayil", duration: 287 },
      { title: "Thaarake", duration: 264 },
      { title: "Devadundubhi", duration: 271 },
      { title: "Aakaasham Pondikku", duration: 294 },
      { title: "Janmasaaphalyam", duration: 305 },
      { title: "Engane Nee Marakkum", duration: 318 },
      { title: "Anuraagatheerum", duration: 286 },
      { title: "Harivarasanam", duration: 270 },
      { title: "Manjal Prasadavum", duration: 309 },
    ]),
    type: "artist",
    curator: "K. J. Yesudas",
    genre: "classical",
  },
  {
    ...buildAlbum("alb-ml-vineeth", "Vineeth Sreenivasan Hits", "Vineeth Sreenivasan", "malayalam", 2018, 175, [
      { title: "Aluva Puzhayude Theerathu", duration: 210 },
      { title: "Maangalyam", artist: "Vineeth Sreenivasan & Vijay Yesudas", duration: 240 },
      { title: "Olichirikkan", duration: 253 },
      { title: "Ee Mizhi Randilum", duration: 287 },
      { title: "Mizhiyil Ninnum", duration: 244 },
      { title: "Vaikkom Mukku", duration: 268 },
      { title: "Aanandham Paramaanandham", duration: 232 },
      { title: "Panchamiyo", duration: 211 },
      { title: "Nilavinte Nattilekku", duration: 297 },
      { title: "Veene Veene", duration: 256 },
    ]),
    type: "artist",
    curator: "Vineeth Sreenivasan",
  },

  // ─────────── GENRE · MALAYALAM ───────────
  {
    ...buildAlbum("alb-ml-melody", "Malayalam Melody Masters", "Various Artists", "malayalam", 2023, 195, [
      { title: "Malare", artist: "Vijay Yesudas", duration: 263 },
      { title: "Darshana", artist: "Hesham Abdul Wahab", duration: 263 },
      { title: "Pavizhamalliye", artist: "P. Jayachandran", duration: 286 },
      { title: "Kaathirunnu Kaathirunnu", artist: "Vijay Yesudas & K. S. Chithra", duration: 308 },
      { title: "Ennodonichu Cherum", artist: "Vijay Yesudas", duration: 254 },
      { title: "Kondoram", artist: "Madhu Balakrishnan", duration: 287 },
      { title: "Pranayame", artist: "Hesham Abdul Wahab", duration: 254 },
      { title: "Manorathangal", artist: "Hesham Abdul Wahab", duration: 232 },
      { title: "Etho Mazhayil", artist: "Mithun Eshwar", duration: 273 },
      { title: "Thumbi Penne", artist: "Haricharan & Janani Sivanesan", duration: 257 },
    ]),
    type: "genre",
    genre: "melody",
    curator: "Malayalam Melodies",
  },

  // ─────────── ARTIST · KANNADA ───────────
  {
    ...buildAlbum("alb-kn-spb", "SPB Kannada Hits", "S. P. Balasubrahmanyam", "kannada", 2000, 40, [
      { title: "Naane Mareyale", duration: 285 },
      { title: "Hubli Huduga", duration: 262 },
      { title: "Yaava Mohana Murali", duration: 311 },
      { title: "Geleya Geleya", duration: 274 },
      { title: "Karpoorada Bombe", duration: 283 },
      { title: "Hadidare Madidare", duration: 296 },
      { title: "Chandanada Gombe", duration: 268 },
      { title: "Naa Ninna Mareyalare", duration: 330 },
      { title: "Yaaru Tumbalaararu", duration: 278 },
      { title: "Akashadinda Banda Athidhi", duration: 256 },
    ]),
    type: "artist",
    curator: "S. P. Balasubrahmanyam",
  },

  // ─────────── MOOD · KANNADA ───────────
  {
    ...buildAlbum("alb-kn-mass", "Sandalwood Mass", "Various Artists", "kannada", 2023, 355, [
      { title: "Toofan", artist: "Ravi Basrur", duration: 232 },
      { title: "Sulthana", artist: "Ravi Basrur & Mohan Krishna", duration: 261 },
      { title: "Mehbooba", artist: "Ananya Bhat", duration: 264 },
      { title: "The Monster Song", artist: "Adithi Sagar", duration: 217 },
      { title: "Salaam Rocky Bhai", artist: "Santhosh Venky", duration: 184 },
      { title: "Varaha Roopam", artist: "Sai Vignesh", duration: 232 },
      { title: "Singara Siriye", artist: "Vijay Prakash", duration: 251 },
      { title: "Ondhu Ondhu", artist: "Aditi Sagar", duration: 218 },
      { title: "Dheera Dheera", artist: "Ravi Basrur", duration: 196 },
      { title: "Gagana", artist: "Ravi Basrur", duration: 198 },
    ]),
    type: "mood",
    mood: "workout",
    genre: "mass",
    curator: "Sandalwood Beats",
  },

  // ─────────── GENRE · KANNADA ───────────
  {
    ...buildAlbum("alb-kn-romance", "Kannada Romance", "Various Artists", "kannada", 2023, 340, [
      { title: "Yaava Mohana Murali", artist: "Charan Raj", duration: 288 },
      { title: "Naane Naa", artist: "Sanjith Hegde", duration: 246 },
      { title: "Lifeu Ondhu Sotta Sotta", artist: "Sanjith Hegde", duration: 251 },
      { title: "Nooru Janmaku", artist: "Sonu Nigam", duration: 286 },
      { title: "Krishna Krishna", artist: "Vijay Prakash", duration: 270 },
      { title: "Hrudayadali Idenidu", artist: "Rajesh Krishnan", duration: 263 },
      { title: "Yaaru Neenu", artist: "Vijay Prakash", duration: 252 },
      { title: "Cheluve Cheluve", artist: "S. P. Balasubrahmanyam", duration: 277 },
      { title: "Belakina Hadu", artist: "Ravi Basrur", duration: 261 },
      { title: "Manase", artist: "Shivani Rao & Karan", duration: 240 },
    ]),
    type: "genre",
    genre: "romantic",
    curator: "Kannada Hearts",
  },
];

export const ALL_SONGS: Song[] = ALBUMS.flatMap((a) => a.songs);

export function albumsForLang(lang: Lang): Album[] {
  return ALBUMS.filter((a) => a.lang === lang);
}

export function findAlbum(id: string): Album | undefined {
  return ALBUMS.find((a) => a.id === id);
}

export function findSong(id: string): Song | undefined {
  return ALL_SONGS.find((s) => s.id === id);
}

function tokens(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);
}

export function searchSongs(query: string): Song[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const qs = tokens(q);

  type Scored = { song: Song; score: number };
  const scored: Scored[] = [];

  for (const song of ALL_SONGS) {
    const album = findAlbum(song.albumId);
    const title = song.title.toLowerCase();
    const artist = song.artist.toLowerCase();
    const albumTitle = (album?.title ?? "").toLowerCase();
    const albumArtist = (album?.artist ?? "").toLowerCase();
    const lang = (album?.lang ?? "").toLowerCase();
    const type = (album?.type ?? "").toLowerCase();
    const mood = (album?.mood ?? "").toLowerCase();
    const genre = (album?.genre ?? "").toLowerCase();
    const curator = (album?.curator ?? "").toLowerCase();
    const haystack = `${title} | ${artist} | ${albumTitle} | ${albumArtist} | ${lang} | ${type} | ${mood} | ${genre} | ${curator}`;

    let score = 0;
    if (title === q) score += 14;
    else if (title.startsWith(q)) score += 10;
    else if (title.includes(q)) score += 6;

    if (artist === q) score += 8;
    else if (artist.includes(q)) score += 4;

    if (albumArtist.includes(q)) score += 4;
    if (curator.includes(q)) score += 4;
    if (albumTitle.includes(q)) score += 3;
    if (lang === q) score += 2;
    if (mood && (mood === q || mood.includes(q))) score += 5;
    if (genre && (genre === q || genre.includes(q))) score += 5;
    if (type && type === q) score += 3;

    if (qs.length > 1) {
      const allTokensMatch = qs.every((t) => haystack.includes(t));
      if (allTokensMatch) score += 5;
    }

    if (score > 0) scored.push({ song, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.song);
}

export function albumsByType(type: AlbumType): Album[] {
  return ALBUMS.filter((a) => a.type === type);
}

export function albumsByMood(mood: Mood): Album[] {
  return ALBUMS.filter((a) => a.mood === mood);
}

export function albumsByGenre(genre: Genre): Album[] {
  return ALBUMS.filter((a) => a.genre === genre);
}
