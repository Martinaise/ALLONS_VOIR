import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../compenents/MovieList";
import SearchBar from "../compenents/SearchBar";

function Appfilmsppopulaire() {
  const [movies, setMovies] = useState([]);
  const apiKey = "81ce6cccc7af79c824fe37a40903971e";

  useEffect(() => {
    // Obtenir la liste de tous les films populaires
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <SearchBar onSearch={setMovies}/>
      <h1>Liste des films populaires</h1>
    
      {
        //on verifie si mouvie est different de undifined
        movies && (
          <MovieList  movies={movies} />
        )
      }
      
    </div>
  );
}

export default Appfilmsppopulaire;
