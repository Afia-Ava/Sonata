// Simple test to check if the API is working
const axios = require('axios');

async function testAPI() {
    try {
        console.log('🧪 Testing API endpoint...');
        const response = await axios.post('http://localhost:3000/get-playlist', {
            mood: 'happy'
        });
        
        console.log('✅ API Response Status:', response.status);
        console.log('📊 Number of tracks returned:', response.data.tracks?.length || 0);
        
        if (response.data.tracks && response.data.tracks.length > 0) {
            console.log('🎵 First track:', response.data.tracks[0].name);
        } else {
            console.log('❌ No tracks returned');
        }
    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testAPI();
