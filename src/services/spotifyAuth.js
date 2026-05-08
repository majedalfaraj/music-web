const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

const redirectUri = "http://127.0.0.1:5173/callback";

const scopes = [
  "user-read-private",
];

function generateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(
      Math.floor(Math.random() * chars.length)
    );
  }

  return result;
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest("SHA-256", data);
}

function base64encode(input) {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function loginWithSpotify() {
  const codeVerifier = generateRandomString(64);

  localStorage.setItem(
    "spotify_code_verifier",
    codeVerifier
  );

  const hashed = await sha256(codeVerifier);

  const codeChallenge = base64encode(hashed);

  const authUrl = new URL(
    "https://accounts.spotify.com/authorize"
  );

  authUrl.searchParams.set("client_id", clientId);

  authUrl.searchParams.set("response_type", "code");

  authUrl.searchParams.set("redirect_uri", redirectUri);

  authUrl.searchParams.set("scope", scopes.join(" "));

  authUrl.searchParams.set(
    "code_challenge_method",
    "S256"
  );

  authUrl.searchParams.set(
    "code_challenge",
    codeChallenge
  );

  window.location.href = authUrl.toString();
}

export function getAuthorizationCode() {
  const params = new URLSearchParams(
    window.location.search
  );

  return params.get("code");
}

export async function exchangeCodeForToken(code) {
  const codeVerifier = localStorage.getItem(
    "spotify_code_verifier"
  );

  const response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  return data;
}