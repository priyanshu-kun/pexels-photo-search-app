import React, { useEffect, useState } from "react";
import './App.css';
import { createClient } from 'pexels';
import KEY from "./cread";

function App() {

  const [photos, setPhotos] = useState([]);
  const [changeInput, setChangeInput] = useState("");

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const client = createClient(KEY.key);
    const query = changeInput;
    const photos = await client.photos.search({ query, per_page: 10, size: "small", orientation: "portrait" });
    // 
    console.log(photos.photos);
    setPhotos(photos.photos);

  }

  useEffect(() => {
    setChangeInput("");
  }, [photos, setPhotos])

  return (

    <div className="App">
      <h1 className="main-heading">Image Search App using <br /> <span>pexels API</span></h1>
      <form onSubmit={handleImageSubmit}>
        <input type="text" placeholder="Search Image Here..." value={changeInput} onChange={(e) => {
          setChangeInput(e.target.value);
        }} />
        <button>Search</button>
      </form>
      <section className="photos-grid">
        {
          photos && photos.map(photo => {
            return <img loading="lazy" src={photo.src.original} alt="site img" />
          })
        }
      </section>
    </div>
  );
}

export default App;
