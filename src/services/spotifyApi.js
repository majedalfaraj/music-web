const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const accessToken = localStorage.getItem("spotify_access_token");

export async function searchAlbums(query) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();

  console.log(data);

  return data;
}