import { useState } from "react";

function AddAlbumForm({ onAddAlbum } ) {
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [tags, setTags] = useState("");
    const [rating, setRating] = useState();

    function handleSubmit(event) {
        event.preventDefault();
        const newAlbum = {
            id: crypto.randomUUID(),
            title: title,
            artist: artist,
            rating: rating,
            tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        };
        onAddAlbum(newAlbum);
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <p> You typed: {title} by {artist} which is a {rating}</p>
            <button type="submit">Submit Album</button>
        </form>
    )
}

export default AddAlbumForm;