import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Constants
import * as Constants from "../../constants";

// Components
import Grid from "../../components/Grid/Grid";
import GameCard from "../../components/GameCard/GameCard";
// import SelectMenu from "../../components/SelectMenu/SelectMenu";
// import FilterChips from "../../components/FilterChips/FilterChips";
// import CheckboxList from "../../components/Filters/CheckboxList";
// import SliderRange from "../../components/Filters/SliderRange";

// Styles
import "./browse.css";

const BrowseGames = () => {

  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames();
  }, []);

  const getGames = async () => {
    const response = await fetch("http://localhost:5000/games");
    const data = await response.json();
    setGames(data);
    console.log(data);
  };

  return (
    <div className="browseMain">
      <section className="filterContainer">
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
        <div className="filterWidget"></div>
      </section>
      <header className="header">
        <h1>Games</h1>

        <div className="sortGroup">
         
        </div>
      </header>
      <main className="mainContent">
        <Grid>
          {games.map((game) => {
            return (
              <Link key={game.id} to={`/game/${game.id}`}>
                <GameCard
                  // Card props
                  key={game.id}
                  poster={
                    Constants.baseIGDBposterURL +
                    game.cover.url.substring(
                      game.cover.url.lastIndexOf("/") + 1
                    )
                  }
                  // Overlay props
                  title={game.name}
                  score={Math.round(game.rating)}
                  year={game.release_dates[0].y}
                  description={game.summary}
                  background={
                    Constants.baseIGDBcoverURL +
                    game.cover.url.substring(
                      game.cover.url.lastIndexOf("/") + 1
                    )
                  }
                />
              </Link>
            );
          })}
        </Grid>
      </main>
      <aside className="adContainer"></aside>
    </div>
  );
};

export default BrowseGames;
