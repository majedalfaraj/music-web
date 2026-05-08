export async function searchAlbums(query) {
    const search = encodeURIComponent(
        `releasegroup:"${query}" AND primarytype:album`
    );

    const url =
        `https://musicbrainz.org/ws/2/release-group` +
        `?query=${search}` +
        `&limit=15` +
        `&fmt=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to search albums");
    }

    const data = await response.json();
    const results = data["release-groups"] ?? [];

    return (results
        .filter((album) => album["primary-type"] === "Album")
        .sort((a, b) => scoreAlbumResult(b, query) - scoreAlbumResult(a, query))
    );
}

function normalise(text) {
  return text.toLowerCase().trim();
}

function scoreAlbumResult(album, query) {
  const title = normalise(album.title ?? "");
  const artist = normalise(album["artist-credit"]?.[0]?.name ?? "");
  const q = normalise(query);

  let score = album.score ?? 0;

  if (title === q) score += 100;
  if (title.includes(q)) score += 40;

  if (album["primary-type"] === "Album") score += 30;

  const secondaryTypes = album["secondary-types"] ?? [];
  if (secondaryTypes.length === 0) score += 10;

//   if (title === "blonde" && artist === "frank ocean") score += 200;

  return score;
}