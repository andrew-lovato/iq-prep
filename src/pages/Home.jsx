import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <Link to="/digit_symbol_substitution">
        Digit Symbol Substitution Test
      </Link>
      <Link to="/symbol_search">Symbol Search</Link>
    </div>
  );
};

export default Home;
