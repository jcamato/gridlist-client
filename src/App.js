import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

// import logo from './logo.svg';

// Components and Pages
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home";
// import Browse from "./pages/browse";
import Browse from "./pages/browse";
import BrowseGames from "./pages/games/browse-games";
import MovieDetail from "./pages/moviedetail";
import Library from "./pages/library";
import SearchResults from "./pages/searchresults";

import Test from "./pages/test";

// Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/browse" exact component={Browse} /> */}
          <Route path="/movies" exact component={Browse} />
          <Route path="/games" exact component={BrowseGames} />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route path="/library" component={Library} />

          <Route path="/test" component={Test} />

          <Route path="/search" component={SearchResults} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
