import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import "./styles/digitSymbolSubstitution.css";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <AppRouter />
    </div>
  );
}

export default App;
