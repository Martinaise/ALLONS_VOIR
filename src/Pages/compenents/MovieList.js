import React from "react";
import { Link } from "react-router-dom";
import "../TousLesfilms/TousLesfilms.css";

const MovieList = ({ movies }) => {
  console.log(movies);
  return (
    <ul className="cardcontainer">
      {/* la méthode map() pour parcourir la liste de films et afficher chaque film dans un élément <li>. */}
      {movies?.map((movie) => (
        //  L'attribut key est utilisé pour aider React à identifier chaque élément de la liste de manière unique.
        <li className="cart" key={movie.id}>
          {/*  Link  de  react-router-dom pour créer un lien vers une page de DetailsFilms en utilisant l'ID du film dans l'URL */}
          <Link to={`/movie/${movie.id}`}>
            <div className="containerImageCard"> 
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
