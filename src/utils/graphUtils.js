export function buildAlbumNodes(albums) {
    return albums.map((album, index) => ({
        id: album.id,
        type: "album",
        position: {
            x: (index % 4) * 220,
            y: Math.floor(index / 4) * 160,
        },
        data: {
            album,
        },
    }));
}

export function buildAlbumEdges(albums) {
  const edges = [];
  for (let i = 0; i < albums.length; i++) {
    for (let j = i + 1; j < albums.length; j++) {
      const albumA = albums[i];
      const albumB = albums[j];
      const sharedTags = albumA.tags.filter((tag) =>
        albumB.tags.includes(tag)
      );
      if (sharedTags.length > 0) {
        edges.push({
          id: `${albumA.id}-${albumB.id}`,
          source: albumA.id,
          target: albumB.id,
          label: sharedTags.join(", "),
        });
      }
    }
  }
  return edges;
}