import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import MovieDetails from "..//src/Pages/TousLesfilms/MovieDetails";
import { AppSearbarMovie } from "./Pages/TousLesfilms/AppSearbarMovie";


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AppSearbarMovie/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
      </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
