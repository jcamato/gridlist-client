import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { toast } from "react-toastify";

// import logo from './logo.svg';

// Pages
import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";

// Pages
import Home from "./pages/home";
import BrowseMovies from "./pages/browse/movies";
// import BrowseGames from "./pages/browse/games";
import DetailMovie from "./pages/detail/movie";
// import DetailGame from "./pages/detail/game";
import LibraryMovies from "./pages/library/movies";
import SearchResults from "./pages/searchresults";
import About from "./pages/about";

import Test1 from "./pages/test1";
import Test2 from "./pages/test2";
// import Test3 from "./pages/test3";

import NotFound from "./pages/notfound";

// Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  return (
    <Router>
      <ScrollToTop />
      <UserProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movies" exact component={BrowseMovies} />
            {/* <Route path="/games" exact component={BrowseGames} /> */}
            <Route path="/movie/:id" component={DetailMovie} />
            {/* <Route path="/game/:id" component={DetailGame} /> */}
            <Route path="/library/movies" exact component={LibraryMovies} />

            <Route path="/test1" exact component={Test1} />
            <Route path="/test2" exact component={Test2} />
            {/* <Route path="/test3" exact component={Test3} /> */}

            <Route path="/search/:searchtext" component={SearchResults} />

            <Route path="/about" component={About} />

            <Route component={NotFound} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
