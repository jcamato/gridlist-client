import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import logo from './logo.svg';

// Components and Pages
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/home";
import Browse from "./pages/browse";
import MovieDetail from "./pages/moviedetail";
import Library from "./pages/library";

import Test from "./pages/test";

// Styles
import "./App.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/browse" exact component={Browse} />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route path="/library" component={Library} />

          <Route path="/test" component={Test} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
