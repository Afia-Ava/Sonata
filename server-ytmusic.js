const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const YoutubeMusicApi = require('youtube-music-api');
const { getPlaylistForMood } = require('./playlist-data');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

console.log('🚀 Starting Sonata server with YouTube Music API...');

const api = new YoutubeMusicApi();
let isInitialized = false;

// Initialize the API
async function initializeAPI() {
  try {
    console.log('🎵 Initializing YouTube Music API...');
    await api.initalize(); // Note: the package has a typo in the method name
    isInitialized = true;
    console.log('✅ YouTube Music API initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize YouTube Music API:', error.message);
    isInitialized = false;
  }
}

// Function to generate mood-based search queries
function generateMoodQueries(mood) {
  const moodLower = mood.toLowerCase();
  
  // Define mood mappings with genres and descriptors
  const moodMappings = {
    'happy': ['happy songs', 'upbeat music', 'feel good songs', 'pop music'],
    'sad': ['sad songs', 'emotional music', 'heartbreak songs', 'melancholy music'],
    'energetic': ['energetic music', 'workout songs', 'pump up music', 'high energy'],
    'chill': ['chill music', 'relaxing songs', 'mellow music', 'lo-fi music'],
    'romantic': ['romantic songs', 'love songs', 'romantic music', 'love ballads'],
    'study': ['study music', 'focus music', 'instrumental music', 'ambient music'],
    'workout': ['workout music', 'gym songs', 'motivation music', 'fitness music'],
    'party': ['party music', 'dance songs', 'club music', 'party hits'],
    'calm': ['calm music', 'peaceful songs', 'meditation music', 'relaxing music'],
    'angry': ['angry music', 'aggressive songs', 'metal music', 'rock music'],
    'nostalgic': ['nostalgic songs', 'throwback music', 'classic hits', 'oldies'],
    'motivational': ['motivational music', 'inspiring songs', 'uplifting music', 'empowerment']
  };
  
  // Find matching mood keywords
  let keywords = [];
  
  // Check if the mood directly matches any key
  for (const [key, values] of Object.entries(moodMappings)) {
    if (moodLower.includes(key) || key.includes(moodLower)) {
      keywords = keywords.concat(values);
      break; // Use first match to avoid too many results
    }
  }
  
  // If no direct match, use the original mood plus some general terms
  if (keywords.length === 0) {
    keywords = [`${mood} songs`, `${mood} music`];
  }
  
  // Limit to 2 queries to avoid too many API calls
  return keywords.slice(0, 2);
}

app.post('/get-playlist', async (req, res) => {
  console.log('📝 Received playlist request:', req.body);
  
  const { mood } = req.body;
  if (!mood) {
    console.log('❌ No mood provided');
    return res.status(400).json({ message: 'Mood is required' });
  }

  try {
    console.log(`🎵 Searching for tracks with mood: "${mood}"`);
    
    // First, try to get predefined playlist
    const predefinedResult = getPlaylistForMood(mood);
    
    if (predefinedResult.tracks && predefinedResult.tracks.length > 0) {
      console.log(`✅ Found ${predefinedResult.tracks.length} predefined tracks for mood: ${predefinedResult.mood}`);
      console.log(`📊 Source: ${predefinedResult.source}`);
      
      return res.json({ 
        tracks: predefinedResult.tracks,
        source: predefinedResult.source,
        mappedMood: predefinedResult.mood
      });
    }

    // Fallback to YouTube Music API if no predefined tracks
    if (!isInitialized) {
      console.log('⏳ YouTube Music API not initialized, trying to initialize...');
      await initializeAPI();
      if (!isInitialized) {
        // Return empty result if both predefined and API fail
        console.log('❌ Both predefined playlists and YouTube Music API unavailable');
        return res.json({ tracks: [], source: 'none' });
      }
    }

    console.log('🔍 Falling back to YouTube Music API search...');
    
    // Create mood-based search queries
    const moodQueries = generateMoodQueries(mood);
    let allTracks = [];
    
    // Search YouTube Music with multiple mood-based queries
    for (const query of moodQueries) {
      try {
        console.log(`🔍 YouTube Music search for: "${query}"`);
        const searchResult = await api.search(query, "song");
        
        if (searchResult && searchResult.content) {
          // Transform YouTube Music data to match our expected format
          const tracks = searchResult.content.slice(0, 8).map(item => ({
            id: item.videoId,
            name: item.name || 'Unknown Song',
            artists: item.artist ? (Array.isArray(item.artist) ? item.artist : [{ name: item.artist }]) : [{ name: 'Unknown Artist' }],
            album: { 
              name: item.album?.name || 'YouTube Music',
              images: item.thumbnails ? [{ url: item.thumbnails[0]?.url }] : []
            },
            preview_url: `https://www.youtube.com/watch?v=${item.videoId}`, // Full song URL
            external_urls: { youtube: `https://www.youtube.com/watch?v=${item.videoId}` },
            duration_ms: item.duration || null,
            popularity: 70 // Default popularity for YouTube Music
          }));
          
          allTracks = allTracks.concat(tracks);
        }
      } catch (queryError) {
        console.log(`⚠️ YouTube Music query "${query}" failed:`, queryError.message);
      }
    }
    
    // Remove duplicates based on video ID
    const uniqueTracks = allTracks.filter((track, index, self) => 
      index === self.findIndex(t => t.id === track.id)
    );
    
    // Limit to 15 tracks
    const tracks = uniqueTracks.slice(0, 15);
    
    console.log(`✅ Found ${tracks.length} YouTube Music tracks from ${moodQueries.length} queries`);
    res.json({ tracks, source: 'youtube-music' });
  } catch (error) {
    console.error('❌ Error searching for playlist:', error.message);
    
    // Final fallback - return empty but don't error
    res.json({ 
      tracks: [], 
      source: 'error',
      message: 'Unable to find tracks at the moment. Please try again later.' 
    });
  }
});

// Initialize API when server starts
initializeAPI();

app.listen(port, () => {
  console.log(`🎵 Sonata server listening at http://localhost:${port}`);
  console.log('🌐 Frontend should connect to this address');
  console.log('📂 Static files served from:', __dirname);
});
