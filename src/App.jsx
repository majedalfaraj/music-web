import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AlbumNode from './components/AlbumNode'
import GraphView from './components/GraphView'
import AddAlbumForm from './components/AddAlbumForm'
import {albums as starterAlbums} from './data/albums'

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
        <button className="form-button" onClick={() => setIsFormOpen((cur) => !cur)}> {isFormOpen ? "×" : "+"} </button>
        {isFormOpen && <AddAlbumForm onAddAlbum={handleAddAlbum} />}
        <GraphView albums={albumList} onDeleteAlbum={handleDeleteAlbum}/>
      </div>
  );
}

export default App;
