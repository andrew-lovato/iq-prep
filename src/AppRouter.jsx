import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import DigitSymbolSubstitution from "./pages/DigitSymbolSubstitution.tsx";
import SymbolSearch from "./pages/SymbolSearch";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/digit_symbol_substitution"
        element={<DigitSymbolSubstitution />}
      />
      <Route exact path="/symbol_search" element={<SymbolSearch />} />
    </Routes>
  );
};

export default AppRouter;
