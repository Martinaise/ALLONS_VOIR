import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// composant MovieDetails reçoit l'ID du film à afficher en tant que prop.
const MovieDetails = () => {
  const [actors, setActors] = useState(null);
  const apiKey = "81ce6cccc7af79c824fe37a40903971e";
  const [movie, setMovie] = useState(null);
  const [critiques, setCritiques] = useState(null);
  const [recommandations, setRecommandations] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    // fonction de l'appel a l'api de TMDb pour récupérer les détails du film correspondant à l'ID dans l'URL
    const fetchdetailMovie = async () => {
      
      // axios pour effectuer l'appel
      const response = await axios.get(
        // recup details films
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      // pour recup les acteurs
      const reponseacteur = await axios.get(
        `http://api.themoviedb.org/3/movie/${id}/casts?api_key=${apiKey}`
      );
      // pour recup critique
      const responsecritiques = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}&language=en-US&page=1`);

      // recup recommandations
      const responserecommandations=await axios.get (`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US&page=1`)
      //axios stocke les données de réponse   utilisant la méthode setMovie.
      setMovie(response?.data);
      setActors(reponseacteur?.data);
      setCritiques(responsecritiques?.data?.results);
       setRecommandations(responserecommandations?.data?.results) 
    console.log(recommandations); 
    };

    fetchdetailMovie();
    

    // tableau de dépence de useEffect ici est fait appel a la fetchMovie autant de fois que l'id change
  },[id]);
  
  return (
    <div>
      {/* affichage du détails du film  récupérés à partir de l'API de TMDb */}
      {movie ? (
        <>
          {/* condition ternaire pour afficher un message de chargement si les données n'ont pas encore été récupérées. */}
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
          />
          {/* résumé du film  obtenue par la propriéte  overview  venant de l'objet moivie*/}
          <p>{movie.overview}</p>
          {/*   
           pour avoir les informations sur l'acteur on utilise la propreté credits de l'objet  movie.
          
          La methode slice c'est  pour limiter le nombre d'acteurs affichés à 5.
          
          La méthode map pour itérer sur chaque objet acteur et créer un élément de liste (<li>) pour chaque acteur.
          
          key pour fournir une clé unique à chaque élément de liste.

          a propriété name affichons le nom de chaque acteur*/}

          <h3>Acteurs</h3>
          <ul className="cardcontainer">
            {actors.cast.slice(0, 5).map((cast) => (
              <li className="cart" key={cast?.id}>
                <p>{cast?.name}</p>
                <div className="containerImageCard"> 
                <img src={`https://image.tmdb.org/t/p/original${cast?.profile_path}`} alt={cast?.name} />
                </div>
              </li>
            ))}
          </ul>
          <h3>Recommandations</h3>
          <ul>
            {recommandations?.slice(0, 3).map((recommandation) => (
              <li  className="cart" key={recommandation?.id}>{recommandation.overview
              }</li>
            ))}
          </ul>
          <h3>critiques</h3>
          <ul>
            {
             critiques?.map(critique => (<li>
                {critique?.author_details?.username}
                {critique?.content.split(" ").slice(0,20).join(' ') +"..."}
              </li>)) 
            }
          </ul>
          <ul>
            {movie?.similar?.results?.slice(0, 5).map((similar) => (
              <li  className="cart" key={similar?.id}>{similar?.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
};

export default MovieDetails;

