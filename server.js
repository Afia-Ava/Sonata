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

console.log('🚀 Starting Sonata server...');
console.log('� YouTube API Key:', process.env.YOUTUBE_API_KEY ? '✅ Set' : '❌ Missing');

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

const grantAccessToken = async () => {
  try {
    console.log('Requesting Spotify access token...');
    const data = await spotifyApi.clientCredentialsGrant();
    accessToken = data.body['access_token'];
    spotifyApi.setAccessToken(accessToken);
    console.log('✅ Access token granted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error getting access token:', error.message);
    if (error.body) {
      console.error('Error details:', error.body);
    }
    accessToken = ''; // Reset token on error
    return false;
  }
};

grantAccessToken();
setInterval(grantAccessToken, 1000 * 60 * 55); // Refresh token every 55 minutes

app.post('/get-playlist', async (req, res) => {
  console.log('📝 Received playlist request:', req.body);
  
  const { mood } = req.body;
  if (!mood) {
    console.log('❌ No mood provided');
    return res.status(400).json({ message: 'Mood is required' });
  }

  if (!accessToken) {
    console.log('❌ No access token available');
    const tokenGranted = await grantAccessToken();
    if (!tokenGranted) {
      return res.status(503).json({ message: 'Spotify service is temporarily unavailable. Please try again in a few seconds.' });
    }
  }
  try {
    console.log(`🎵 Searching for tracks with mood: "${mood}"`);
    
    // Create mood-based search queries
    const moodQueries = generateMoodQueries(mood);
    let allTracks = [];
      // Search with multiple mood-based queries
    for (const query of moodQueries) {
      try {
        // Add market parameter to get tracks more likely to have previews
        const response = await spotifyApi.searchTracks(query, { 
          limit: 15, 
          market: 'US'  // US market typically has more previews
        });
        allTracks = allTracks.concat(response.body.tracks.items);
      } catch (queryError) {
        console.log(`⚠️ Query "${query}" failed:`, queryError.message);
      }
    }
    
    // Remove duplicates based on track ID
    const uniqueTracks = allTracks.filter((track, index, self) => 
      index === self.findIndex(t => t.id === track.id)
    );
    
    // Prioritize tracks with previews and sort by popularity
    const tracksWithPreviews = uniqueTracks.filter(track => track.preview_url);
    const tracksWithoutPreviews = uniqueTracks.filter(track => !track.preview_url);
    
    // Sort by popularity (higher first)
    tracksWithPreviews.sort((a, b) => b.popularity - a.popularity);
    tracksWithoutPreviews.sort((a, b) => b.popularity - a.popularity);
    
    // Combine: previews first, then others, limit to 24 total
    const tracks = [...tracksWithPreviews, ...tracksWithoutPreviews].slice(0, 24);
    
    console.log(`✅ Found ${tracks.length} tracks (${tracksWithPreviews.length} with previews) from ${moodQueries.length} queries`);
    res.json({ tracks });
  } catch (error) {
    console.error('❌ Error searching tracks:', error.message);
    if (error.body) {
      console.error('Error details:', error.body);
    }
      // If token expired, try to refresh it
    if (error.statusCode === 401) {
      console.log('🔄 Token expired, refreshing...');
      const tokenGranted = await grantAccessToken();
      if (tokenGranted) {
        try {
          // Retry with the same improved search logic
          const moodQueries = generateMoodQueries(mood);
          let allTracks = [];
            for (const query of moodQueries) {
            try {
              const response = await spotifyApi.searchTracks(query, { 
                limit: 15, 
                market: 'US' 
              });
              allTracks = allTracks.concat(response.body.tracks.items);
            } catch (queryError) {
              console.log(`⚠️ Retry query "${query}" failed:`, queryError.message);
            }
          }
          
          const uniqueTracks = allTracks.filter((track, index, self) => 
            index === self.findIndex(t => t.id === track.id)
          );
          
          // Prioritize tracks with previews
          const tracksWithPreviews = uniqueTracks.filter(track => track.preview_url);
          const tracksWithoutPreviews = uniqueTracks.filter(track => !track.preview_url);
          
          tracksWithPreviews.sort((a, b) => b.popularity - a.popularity);
          tracksWithoutPreviews.sort((a, b) => b.popularity - a.popularity);
          
          const tracks = [...tracksWithPreviews, ...tracksWithoutPreviews].slice(0, 24);
          
          console.log(`✅ Retry successful: Found ${tracks.length} tracks (${tracksWithPreviews.length} with previews)`);
          return res.json({ tracks });
        } catch (retryError) {
          console.error('❌ Retry failed:', retryError.message);
        }
      }
    }
    
    res.status(error.statusCode || 500).json({ 
      message: 'Failed to get playlist from Spotify.', 
      error: error.message 
    });
  }
});



app.listen(port, () => {
  console.log(`🎵 Sonata server listening at http://localhost:${port}`);
  console.log('🌐 Frontend should connect to this address');
  console.log('📂 Static files served from:', __dirname);
});
