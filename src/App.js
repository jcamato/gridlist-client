import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { toast } from "react-toastify";

// import logo from './logo.svg';

// Pages
import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/home";
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
      <UserProvider>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movies" exact component={Browse} />
            <Route path="/games" exact component={BrowseGames} />
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="/library" exact component={Library} />

            <Route path="/test" exact component={Test} />

            <Route path="/search" component={SearchResults} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
