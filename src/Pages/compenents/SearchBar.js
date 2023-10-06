import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  // mettre le champs vide avec query et setQuery pour mettre a jour l'etat
  const [query, setQuery] = useState("");
  console.log(process.env.REACT_APP_TMDB_API_KEY);
  // fonction handleSubmit appélé a la soumission de formilaire de recherche
  const handleSubmit = async (event) => {
    //preventDefault empeche la page de se recharger a la soumission du formulaire
    event.preventDefault();
    //on envoit une requête à l'API de TMDb en utilisant la clé d'API fournie et la requête de recherche saisie par l'utilisateur.
    const apiKey = "81ce6cccc7af79c824fe37a40903971e";

    /* affichage de tous les films*/

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
    );
console.log(response)
    //on appel la fonction onSearch avec les résultats de la recherche pour les afficher dans le composant MovieList.
    onSearch(response.data.results);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher un film"
        // mettre le champs vide
        value={query}
        //écoute l'événement onChange qui se produit lorsque le champ de saisie est modifié.  une fonction fléchée qui prend un événement en argument et met à jour l'état query en utilisant la valeur event.target.value, qui correspond à la valeur actuelle du champ de saisie.
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchBar;
