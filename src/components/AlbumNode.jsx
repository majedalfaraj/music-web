import { Handle, Position } from "@xyflow/react";

function AlbumNode({ data }) {
    const album = data.album;
    return (
        <div className="album-node">

        <button className="delete-node-button" onClick={() => data.onDeleteAlbum(album.id)}>×</button>

        <img className="album-node-icon" 
            src={album.src}
        />
        
        {/* <Handle type="target" position={Position.Left} />
        <p><strong>Title: {album.title}</strong></p>
        <p>Artist: {album.artist}</p>
        <p>Rating: {album.rating}</p>
        <Handle type="source" position={Position.Right} /> */}
        </div>
    );
}

export default AlbumNode;