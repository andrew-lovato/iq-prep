import React from "react";
import { Link } from "react-router-dom";
import { generateRandom } from "../utils";

const DigitSymbolSubstitution = () => {
  const generateRow = () => {
    return generateRandom(20, "num")
      .split("")
      .map((num) => {
        return (
          <div>
            <div className="col-box">{num}</div>
            <div className="col-box"></div>
          </div>
        );
      });
  };

  const generateKey = () => {
    return generateRandom(9, "symbol")
      .split("")
      .map((symbol, index) => {
        return (
          <div>
            <div className="col-box">{index + 1}</div>
            <div className="col-box">{symbol}</div>
          </div>
        );
      });
  };

  return (
    <div>
      <h1>Digit Symbol Substitution Test</h1>
      <div className="digit-symbol-substitution">
        <div className="digit-symbol-row">{generateKey()}</div>
        <div className="digit-symbol-row">{generateRow()}</div>
        <div className="digit-symbol-row">{generateRow()}</div>
        <div className="digit-symbol-row">{generateRow()}</div>
        <div className="digit-symbol-row">{generateRow()}</div>
      </div>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default DigitSymbolSubstitution;
