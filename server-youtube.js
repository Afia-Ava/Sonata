require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Validate environment variables
if (!process.env.YOUTUBE_API_KEY) {
  console.error('❌ Missing YouTube API key in .env file');
  console.error('Please add YOUTUBE_API_KEY to your .env file');
  console.error('Get it from: https://console.developers.google.com/');
  process.exit(1);
}

console.log('🚀 Starting Sonata server with YouTube...');
console.log('📺 YouTube API Key:', process.env.YOUTUBE_API_KEY ? '✅ Set' : '❌ Missing');

// Function to generate mood-based search queries
function generateMoodQueries(mood) {
  const moodLower = mood.toLowerCase();
  
  // Define mood mappings with genres and descriptors
  const moodMappings = {
    'happy': ['happy songs', 'upbeat music', 'feel good songs', 'pop hits'],
    'sad': ['sad songs', 'emotional music', 'heartbreak songs', 'ballads'],
    'energetic': ['energetic music', 'workout songs', 'pump up music', 'dance hits'],
    'chill': ['chill music', 'relaxing songs', 'mellow music', 'indie songs'],
    'romantic': ['romantic songs', 'love songs', 'romantic music', 'slow songs'],
    'study': ['study music', 'focus music', 'instrumental music', 'ambient music'],
    'workout': ['workout music', 'gym songs', 'motivation music', 'high energy'],
    'party': ['party music', 'dance songs', 'club music', 'party hits'],
    'calm': ['calm music', 'peaceful songs', 'meditation music', 'relaxing'],
    'angry': ['angry music', 'aggressive songs', 'metal music', 'rock songs'],
    'nostalgic': ['nostalgic songs', 'throwback music', '90s hits', '80s music'],
    'motivational': ['motivational music', 'inspiring songs', 'uplifting music']
  };
  
  // Find matching mood keywords
  let keywords = [];
  
  // Check if the mood directly matches any key
  for (const [key, values] of Object.entries(moodMappings)) {
    if (moodLower.includes(key) || key.includes(moodLower)) {
      keywords = keywords.concat(values);
    }
  }
  
  // If no direct match, use the original mood plus some general terms
  if (keywords.length === 0) {
    keywords = [`${mood} songs`, `${mood} music`, `${mood} playlist`];
  }
  
  // Limit to 3 queries to avoid too many API calls
  return keywords.slice(0, 3);
}

app.post('/get-playlist', async (req, res) => {
  console.log('📝 Received playlist request:', req.body);
  
  const { mood } = req.body;
  if (!mood) {
    console.log('❌ No mood provided');
    return res.status(400).json({ message: 'Mood is required' });
  }

  try {
    console.log(`🎵 Searching YouTube for tracks with mood: "${mood}"`);
    
    // Create mood-based search queries
    const moodQueries = generateMoodQueries(mood);
    let allTracks = [];
    
    // Search YouTube with multiple mood-based queries
    for (const query of moodQueries) {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: process.env.YOUTUBE_API_KEY,
            q: query,
            part: 'snippet',
            type: 'video',
            videoCategoryId: '10', // Music category
            maxResults: 8,
            safeSearch: 'none',
            order: 'relevance'
          }
        });
        
        // Transform YouTube data to match our expected format
        const tracks = response.data.items.map(item => ({
          id: item.id.videoId,
          name: item.snippet.title.replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, ''), // Clean title
          artists: [{ name: item.snippet.channelTitle }],
          album: { 
            name: 'YouTube',
            images: [{ url: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default.url }]
          },
          preview_url: `https://www.youtube.com/embed/${item.id.videoId}?autoplay=1&controls=1&rel=0`,
          external_urls: { youtube: `https://www.youtube.com/watch?v=${item.id.videoId}` },
          duration_ms: null,
          popularity: 50 // Default popularity
        }));
        
        allTracks = allTracks.concat(tracks);
      } catch (queryError) {
        console.log(`⚠️ YouTube query "${query}" failed:`, queryError.message);
      }
    }
    
    // Remove duplicates based on video ID
    const uniqueTracks = allTracks.filter((track, index, self) => 
      index === self.findIndex(t => t.id === track.id)
    );
    
    // Limit to 20 tracks
    const tracks = uniqueTracks.slice(0, 20);
    
    console.log(`✅ Found ${tracks.length} YouTube tracks from ${moodQueries.length} queries`);
    res.json({ tracks });
  } catch (error) {
    console.error('❌ Error searching YouTube:', error.message);
    if (error.response) {
      console.error('YouTube API Error:', error.response.data);
    }
    
    res.status(error.response?.status || 500).json({ 
      message: 'Failed to get playlist from YouTube.', 
      error: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`🎵 Sonata server listening at http://localhost:${port}`);
  console.log('🌐 Frontend should connect to this address');
  console.log('📂 Static files served from:', __dirname);
});
