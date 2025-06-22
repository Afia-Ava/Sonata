// Predefined playlists for common moods and themes
// This ensures we always have music available, even without API calls

const predefinedPlaylists = {
  // Happy/Joyful moods
  happy: [
    { id: "ZbZSe6N_BXs", name: "Happy", artists: [{ name: "Pharrell Williams" }], album: { name: "Girl", images: [{ url: "https://i.ytimg.com/vi/ZbZSe6N_BXs/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs", duration_ms: 233000 },
    { id: "y6Sxv-sUYtM", name: "Can't Stop the Feeling!", artists: [{ name: "Justin Timberlake" }], album: { name: "Trolls Soundtrack", images: [{ url: "https://i.ytimg.com/vi/y6Sxv-sUYtM/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=y6Sxv-sUYtM", duration_ms: 236000 },
    { id: "ru0K8uYEZWw", name: "Good as Hell", artists: [{ name: "Lizzo" }], album: { name: "Cuz I Love You", images: [{ url: "https://i.ytimg.com/vi/ru0K8uYEZWw/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=ru0K8uYEZWw", duration_ms: 199000 },
    { id: "UceaB4D0jpo", name: "Counting Stars", artists: [{ name: "OneRepublic" }], album: { name: "Native", images: [{ url: "https://i.ytimg.com/vi/UceaB4D0jpo/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=UceaB4D0jpo", duration_ms: 258000 },
    { id: "CevxZvSJLk8", name: "Roar", artists: [{ name: "Katy Perry" }], album: { name: "Prism", images: [{ url: "https://i.ytimg.com/vi/CevxZvSJLk8/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=CevxZvSJLk8", duration_ms: 223000 },
    { id: "fLexgOxsZu0", name: "Uptown Funk", artists: [{ name: "Mark Ronson ft. Bruno Mars" }], album: { name: "Uptown Special", images: [{ url: "https://i.ytimg.com/vi/fLexgOxsZu0/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=fLexgOxsZu0", duration_ms: 270000 }
  ],

  // Sad/Emotional moods
  sad: [
    { id: "1G4isv_Fylg", name: "Someone Like You", artists: [{ name: "Adele" }], album: { name: "21", images: [{ url: "https://i.ytimg.com/vi/1G4isv_Fylg/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=1G4isv_Fylg", duration_ms: 285000 },
    { id: "ScMzIvxBSi4", name: "Stay", artists: [{ name: "Rihanna" }], album: { name: "Unapologetic", images: [{ url: "https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=ScMzIvxBSi4", duration_ms: 240000 },
    { id: "4fndeDfaWCg", name: "Hurt", artists: [{ name: "Johnny Cash" }], album: { name: "American IV", images: [{ url: "https://i.ytimg.com/vi/4fndeDfaWCg/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=4fndeDfaWCg", duration_ms: 219000 },
    { id: "hLQl3WQQoQ0", name: "Mad World", artists: [{ name: "Gary Jules" }], album: { name: "Donnie Darko Soundtrack", images: [{ url: "https://i.ytimg.com/vi/hLQl3WQQoQ0/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=hLQl3WQQoQ0", duration_ms: 191000 },
    { id: "djV11Xbc914", name: "Take Me to Church", artists: [{ name: "Hozier" }], album: { name: "Hozier", images: [{ url: "https://i.ytimg.com/vi/djV11Xbc914/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=djV11Xbc914", duration_ms: 242000 }
  ],

  // Energetic/Workout moods
  energetic: [
    { id: "kOkQ4T5WO9E", name: "Stronger", artists: [{ name: "Kelly Clarkson" }], album: { name: "My December", images: [{ url: "https://i.ytimg.com/vi/kOkQ4T5WO9E/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=kOkQ4T5WO9E", duration_ms: 242000 },
    { id: "YQHsXMglC9A", name: "Eye of the Tiger", artists: [{ name: "Survivor" }], album: { name: "Eye of the Tiger", images: [{ url: "https://i.ytimg.com/vi/YQHsXMglC9A/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=YQHsXMglC9A", duration_ms: 245000 },
    { id: "VuNIsY6JdUw", name: "You're Gonna Go Far, Kid", artists: [{ name: "The Offspring" }], album: { name: "Rise and Fall", images: [{ url: "https://i.ytimg.com/vi/VuNIsY6JdUw/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=VuNIsY6JdUw", duration_ms: 176000 },
    { id: "btPJPFnesV4", name: "Titanium", artists: [{ name: "David Guetta ft. Sia" }], album: { name: "Nothing but the Beat", images: [{ url: "https://i.ytimg.com/vi/btPJPFnesV4/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=btPJPFnesV4", duration_ms: 245000 },
    { id: "gCYcHz2k5x0", name: "Lose Yourself", artists: [{ name: "Eminem" }], album: { name: "8 Mile Soundtrack", images: [{ url: "https://i.ytimg.com/vi/gCYcHz2k5x0/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=gCYcHz2k5x0", duration_ms: 326000 }
  ],

  // Chill/Relaxing moods
  chill: [
    { id: "QUwxKWT6m7U", name: "Weightless", artists: [{ name: "Marconi Union" }], album: { name: "Weightless", images: [{ url: "https://i.ytimg.com/vi/QUwxKWT6m7U/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=QUwxKWT6m7U", duration_ms: 511000 },
    { id: "1ZYbU82GVz4", name: "River", artists: [{ name: "Eminem ft. Ed Sheeran" }], album: { name: "Revival", images: [{ url: "https://i.ytimg.com/vi/1ZYbU82GVz4/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=1ZYbU82GVz4", duration_ms: 221000 },
    { id: "YnwsMEabmSo", name: "Clair de Lune", artists: [{ name: "Claude Debussy" }], album: { name: "Classical Masterpieces", images: [{ url: "https://i.ytimg.com/vi/YnwsMEabmSo/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=YnwsMEabmSo", duration_ms: 300000 },
    { id: "5anLPw0Efmo", name: "Breathe", artists: [{ name: "Télépopmusik" }], album: { name: "Genetic World", images: [{ url: "https://i.ytimg.com/vi/5anLPw0Efmo/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=5anLPw0Efmo", duration_ms: 264000 },
    { id: "hN1a1Qf7Zag", name: "Porcelain", artists: [{ name: "Moby" }], album: { name: "Play", images: [{ url: "https://i.ytimg.com/vi/hN1a1Qf7Zag/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=hN1a1Qf7Zag", duration_ms: 241000 }
  ],

  // Romantic moods
  romantic: [
    { id: "450p7goxZqg", name: "All of Me", artists: [{ name: "John Legend" }], album: { name: "Love in the Future", images: [{ url: "https://i.ytimg.com/vi/450p7goxZqg/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=450p7goxZqg", duration_ms: 269000 },
    { id: "nfWlot6h_JM", name: "Thinking Out Loud", artists: [{ name: "Ed Sheeran" }], album: { name: "x", images: [{ url: "https://i.ytimg.com/vi/nfWlot6h_JM/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=nfWlot6h_JM", duration_ms: 281000 },
    { id: "SR6iYWJxHqs", name: "Perfect", artists: [{ name: "Ed Sheeran" }], album: { name: "÷", images: [{ url: "https://i.ytimg.com/vi/SR6iYWJxHqs/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=SR6iYWJxHqs", duration_ms: 263000 },
    { id: "JGwWNGJdvx8", name: "Shape of You", artists: [{ name: "Ed Sheeran" }], album: { name: "÷", images: [{ url: "https://i.ytimg.com/vi/JGwWNGJdvx8/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=JGwWNGJdvx8", duration_ms: 233000 },
    { id: "k2qgadSvNyU", name: "Make You Feel My Love", artists: [{ name: "Adele" }], album: { name: "19", images: [{ url: "https://i.ytimg.com/vi/k2qgadSvNyU/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=k2qgadSvNyU", duration_ms: 213000 }
  ],

  // Party/Dance moods
  party: [
    { id: "iWZmdoY1aTE", name: "Uptown Funk", artists: [{ name: "Mark Ronson ft. Bruno Mars" }], album: { name: "Uptown Special", images: [{ url: "https://i.ytimg.com/vi/iWZmdoY1aTE/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=iWZmdoY1aTE", duration_ms: 270000 },
    { id: "OPf0YbXqDm0", name: "Levitating", artists: [{ name: "Dua Lipa" }], album: { name: "Future Nostalgia", images: [{ url: "https://i.ytimg.com/vi/OPf0YbXqDm0/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=OPf0YbXqDm0", duration_ms: 203000 },
    { id: "k2qgadSvNyU", name: "Blinding Lights", artists: [{ name: "The Weeknd" }], album: { name: "After Hours", images: [{ url: "https://i.ytimg.com/vi/4NRXx6U8ABQ/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ", duration_ms: 200000 },
    { id: "mw2kKyJu9gY", name: "Livin' la Vida Loca", artists: [{ name: "Ricky Martin" }], album: { name: "Ricky Martin", images: [{ url: "https://i.ytimg.com/vi/mw2kKyJu9gY/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=mw2kKyJu9gY", duration_ms: 251000 },
    { id: "VPRjCeoBqrI", name: "Can't Feel My Face", artists: [{ name: "The Weeknd" }], album: { name: "Beauty Behind the Madness", images: [{ url: "https://i.ytimg.com/vi/VPRjCeoBqrI/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=VPRjCeoBqrI", duration_ms: 213000 }
  ],

  // Study/Focus moods
  study: [
    { id: "DWcJFNfaw9c", name: "Ludovico Einaudi - Nuvole Bianche", artists: [{ name: "Ludovico Einaudi" }], album: { name: "Una Mattina", images: [{ url: "https://i.ytimg.com/vi/DWcJFNfaw9c/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=DWcJFNfaw9c", duration_ms: 345000 },
    { id: "n61ULEU7CO0", name: "Max Richter - On The Nature of Daylight", artists: [{ name: "Max Richter" }], album: { name: "The Blue Notebooks", images: [{ url: "https://i.ytimg.com/vi/n61ULEU7CO0/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=n61ULEU7CO0", duration_ms: 378000 },
    { id: "IcrbM1l_BoI", name: "Ólafur Arnalds - Near Light", artists: [{ name: "Ólafur Arnalds" }], album: { name: "...And They Have Escaped the Weight of Darkness", images: [{ url: "https://i.ytimg.com/vi/IcrbM1l_BoI/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=IcrbM1l_BoI", duration_ms: 287000 },
    { id: "CgHW02YF50s", name: "Lo-Fi Hip Hop Beats", artists: [{ name: "ChilledCow" }], album: { name: "Lo-Fi Study", images: [{ url: "https://i.ytimg.com/vi/CgHW02YF50s/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=CgHW02YF50s", duration_ms: 7200000 },
    { id: "hHW1oY26kxQ", name: "Forest Sounds", artists: [{ name: "Nature Sounds" }], album: { name: "Ambient Nature", images: [{ url: "https://i.ytimg.com/vi/hHW1oY26kxQ/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=hHW1oY26kxQ", duration_ms: 3600000 }
  ],

  // Motivational moods
  motivational: [
    { id: "_Yhyp-_hX2s", name: "Stronger", artists: [{ name: "Kanye West" }], album: { name: "Graduation", images: [{ url: "https://i.ytimg.com/vi/_Yhyp-_hX2s/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=_Yhyp-_hX2s", duration_ms: 311000 },
    { id: "XmSdTa9kaiQ", name: "Lose Yourself", artists: [{ name: "Eminem" }], album: { name: "8 Mile Soundtrack", images: [{ url: "https://i.ytimg.com/vi/XmSdTa9kaiQ/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=XmSdTa9kaiQ", duration_ms: 326000 },
    { id: "ZXsQAXx_ao0", name: "Don't Stop Believin'", artists: [{ name: "Journey" }], album: { name: "Escape", images: [{ url: "https://i.ytimg.com/vi/ZXsQAXx_ao0/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=ZXsQAXx_ao0", duration_ms: 251000 },
    { id: "hFDcoX7s6rE", name: "We Are the Champions", artists: [{ name: "Queen" }], album: { name: "News of the World", images: [{ url: "https://i.ytimg.com/vi/hFDcoX7s6rE/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=hFDcoX7s6rE", duration_ms: 179000 },
    { id: "btPJPFnesV4", name: "Titanium", artists: [{ name: "David Guetta ft. Sia" }], album: { name: "Nothing but the Beat", images: [{ url: "https://i.ytimg.com/vi/btPJPFnesV4/maxresdefault.jpg" }] }, preview_url: "https://www.youtube.com/watch?v=btPJPFnesV4", duration_ms: 245000 }
  ]
};

// Mood mapping - maps user input to our predefined categories
const moodMapping = {
  // Happy variations
  'happy': 'happy',
  'joyful': 'happy',
  'cheerful': 'happy',
  'upbeat': 'happy',
  'positive': 'happy',
  'excited': 'happy',
  'fun': 'happy',
  'good mood': 'happy',
  'feel good': 'happy',
  'sunshine': 'happy',

  // Sad variations
  'sad': 'sad',
  'melancholy': 'sad',
  'heartbreak': 'sad',
  'emotional': 'sad',
  'crying': 'sad',
  'depressed': 'sad',
  'lonely': 'sad',
  'breakup': 'sad',
  'mourning': 'sad',
  'sorrow': 'sad',

  // Energetic variations
  'energetic': 'energetic',
  'workout': 'energetic',
  'gym': 'energetic',
  'pumped': 'energetic',
  'high energy': 'energetic',
  'intense': 'energetic',
  'powerful': 'energetic',
  'adrenaline': 'energetic',
  'fitness': 'energetic',
  'running': 'energetic',

  // Chill variations
  'chill': 'chill',
  'relaxing': 'chill',
  'calm': 'chill',
  'peaceful': 'chill',
  'mellow': 'chill',
  'laid back': 'chill',
  'easy': 'chill',
  'zen': 'chill',
  'meditation': 'chill',
  'ambient': 'chill',

  // Romantic variations
  'romantic': 'romantic',
  'love': 'romantic',
  'date': 'romantic',
  'valentine': 'romantic',
  'intimate': 'romantic',
  'tender': 'romantic',
  'passionate': 'romantic',
  'couple': 'romantic',
  'anniversary': 'romantic',
  'serenade': 'romantic',

  // Party variations
  'party': 'party',
  'dance': 'party',
  'club': 'party',
  'celebration': 'party',
  'festival': 'party',
  'nightlife': 'party',
  'disco': 'party',
  'edm': 'party',
  'rave': 'party',
  'dancing': 'party',

  // Study variations
  'study': 'study',
  'focus': 'study',
  'concentration': 'study',
  'work': 'study',
  'productivity': 'study',
  'background': 'study',
  'instrumental': 'study',
  'classical': 'study',
  'reading': 'study',
  'homework': 'study',

  // Motivational variations
  'motivational': 'motivational',
  'inspiring': 'motivational',
  'empowering': 'motivational',
  'confidence': 'motivational',
  'success': 'motivational',
  'achievement': 'motivational',
  'determination': 'motivational',
  'strength': 'motivational',
  'courage': 'motivational',
  'victory': 'motivational'
};

// Function to get playlist for a mood
function getPlaylistForMood(mood) {
  const normalizedMood = mood.toLowerCase().trim();
  
  // First, try direct mapping
  const mappedMood = moodMapping[normalizedMood];
  if (mappedMood && predefinedPlaylists[mappedMood]) {
    return {
      tracks: [...predefinedPlaylists[mappedMood]], // Return a copy
      source: 'predefined',
      mood: mappedMood
    };
  }

  // If no direct match, try partial matching
  for (const [key, category] of Object.entries(moodMapping)) {
    if (normalizedMood.includes(key) || key.includes(normalizedMood)) {
      return {
        tracks: [...predefinedPlaylists[category]],
        source: 'predefined',
        mood: category
      };
    }
  }

  // If still no match, return a mix of popular tracks
  const allTracks = Object.values(predefinedPlaylists).flat();
  const shuffled = allTracks.sort(() => 0.5 - Math.random());
  return {
    tracks: shuffled.slice(0, 10),
    source: 'mixed',
    mood: 'mixed'
  };
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { predefinedPlaylists, moodMapping, getPlaylistForMood };
}
