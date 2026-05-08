import { useState } from "react";
// import { searchAlbums } from "../services/musicBrainzApi";
import { searchAlbums } from "../services/spotifyAPI";

function AddAlbumForm({ onAddAlbum } ) {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [tags, setTags] = useState("");
    const [rating, setRating] = useState();
    const [imgSrc, setImgSrc] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const newAlbum = {
            id: crypto.randomUUID(),
            title: title,
            artist: artist,
            rating: rating,
            tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
            src: imgSrc,
        };
        onAddAlbum(newAlbum);
    }

    async function handleSearch() {
        const results = await searchAlbums(searchQuery);

        console.log(results);

        setSearchResults(results.albums.items);
        }


    return (
        <div>
            <div className="search-row">
                <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Searching Album..."
                />
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
                
            </div>
            {searchResults.length > 0 && (
            <div className="search-results">
                {searchResults.map((result) => (
                <button
                    key={result.id}
                    type="button"
                    className="search-result-item"
                    onClick={() => {
                        setTitle(result.name);
                        setArtist(result.artists?.[0]?.name ?? "");
                        setSearchResults([]);
                        setSearchQuery("");
                        setImgSrc(result.images?.[0]?.url ?? "");
                    }}
                    >
                    <img className="search-result-image"
                        src={result.images?.[0]?.url}
                        alt={result.name}
                    />
                    <span className="search-result-title">
                        {result.name}
                    </span>

                    <span className="search-result-meta">
                        {result.artists?.[0]?.name ?? "Unknown artist"}
                        {result.release_date ? ` • ${result.release_date.slice(0, 4)}` : ""}
                    </span>
                </button>
                ))}
            </div>
            )}
            <form className="add-album-form" onSubmit={handleSubmit}>
                <h2> Create Album </h2>
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Album Title"
                />
                <input
                    value={artist}
                    onChange={(event) => setArtist(event.target.value)}
                    placeholder="Album Artist"
                />
                <input
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                    placeholder="Album Rating"
                />
                <input
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                    placeholder="Album Tags"
                />
                {/* <p> You typed: {title} by {artist} which is a {rating}</p> */}
                <button type="submit">Submit Album</button>
            </form>
        </div>
    )
}

export default AddAlbumForm;