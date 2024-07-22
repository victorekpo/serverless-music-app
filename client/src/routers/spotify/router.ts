import { fetchApi } from "@/fetch";

export const spotifyHandler = async () => {
  const res = await showTracks();
  return new Response(JSON.stringify(res), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};


const client_id = '1bde819c0d254b24846b09591307a182';
const client_secret = 'f1ae8aa5c7ef4c4abb80ffe29309ff35';

async function fetchToken() {
  const { data, error } = await fetchApi('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + client_id + '&client_secret=' + client_secret,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log("TOKEN DATA", data, error)
  return data.access_token;
}

async function fetchRecommendations() {
  const token = await fetchToken();
  console.log("token", token);
  // Sample recommendation request with seed parameters
  const { data } = await fetchApi('https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // optional
    }
  });
  console.log("RECOMMENDATIONS RESPONSE", data);
  return data;
}

async function showTracks() {
  const recommendationsResponse = await fetchRecommendations();
  const recommendations = recommendationsResponse.tracks;

  for (const track of recommendations) {
    console.log("*********")
    console.log("artists", track.artists.map(artist => artist.name).join(", "));
    console.log("track", track.name)
    console.log("duration", formatDuration(track.duration_ms));
    console.log("album", track.album.name)
    console.log("*********\n\n")
  }
  return recommendations;
}

function formatDuration(duration_ms) {
  // Convert milliseconds to seconds
  let seconds = Math.floor(duration_ms / 1000);

  // Calculate hours, minutes, and remaining seconds
  let hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  let minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Format the duration as HH:MM:SS
  let formattedDuration = "";
  if (hours > 0) {
    formattedDuration += `${hours}:`;
  }
  formattedDuration += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return formattedDuration;
}

showTracks();