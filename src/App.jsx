import { useState, useEffect } from 'react'
import './App.css'
import AlbumNode from './components/AlbumNode'
import GraphView from './components/GraphView'
import AddAlbumForm from './components/AddAlbumForm'
import {albums as starterAlbums} from './data/albums'
import {loginWithSpotify, getAuthorizationCode, exchangeCodeForToken,} from "./services/spotifyAuth";

const hasToken = localStorage.getItem("spotify_access_token") != null;

function App() {
  const [albumList, setAlbumList] = useState(() => {
    try {
      const savedAlbums = localStorage.getItem("albums");
      if (savedAlbums) {
        return JSON.parse(savedAlbums);
      }
      return starterAlbums;
    } catch (error) {
      console.error("Failed to load albums:", error);
      return starterAlbums;
    }
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("albums", JSON.stringify(albumList));
  }, [albumList]);

  useEffect(() => {
      const code = getAuthorizationCode();

      if (!code) {
        return;
      }

      const alreadyUsedCode = localStorage.getItem("spotify_auth_code_used");

      if (alreadyUsedCode === code) {
        return;
      }

      localStorage.setItem("spotify_auth_code_used", code);

      exchangeCodeForToken(code).then((data) => {
        if (data.access_token) {
          localStorage.setItem("spotify_access_token", data.access_token);

          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
      });
    }, []);

  function handleAddAlbum(newAlbum) {
      setAlbumList([...albumList, newAlbum]);
      setIsFormOpen(false);
  }

  function handleDeleteAlbum(albumID) {
      setAlbumList(albumList.filter((album) => album.id != albumID));
  }

  return (
      <div>
        <h1> Music Web </h1>
        {!hasToken && <button onClick={loginWithSpotify}>
          Login with Spotify
        </button>}
        <div className="add-album-widget">
          <button className="form-button" onClick={() => setIsFormOpen((cur) => !cur)}> {isFormOpen ? "×" : "+"} </button>
          {isFormOpen && <AddAlbumForm onAddAlbum={handleAddAlbum} />}
        </div>
        <GraphView albums={albumList} onDeleteAlbum={handleDeleteAlbum}/>
      </div>
  );
}

export default App;
