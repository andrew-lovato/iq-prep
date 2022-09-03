import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generateRandom } from "../utils";

const keyNums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

interface ChoiceCell {
  symbol: number;
  active: boolean;
  choice?: number;
}

interface ChoiceKey {
  symbol: number;
  num: number;
}

const DigitSymbolSubstitution = () => {
  const initialKey = generateKey();
  const [row, setRow] = useState<ChoiceCell[]>(generateRow(initialKey));
  const [key, setKey] = useState<ChoiceKey[]>(initialKey);
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);

  const handleChoiceClick = (choice: number) => {
    const updated = [...row];
    if (updated[activeIndex]) {
      updated[activeIndex].choice = choice;
    }
    setRow(updated);
    const updatedIndex = activeIndex + 1;
    if (updatedIndex === row.length) {
      setRow(generateRow(key));
      setActiveIndex(0);
    } else setActiveIndex(activeIndex + 1);
    const activeSymbol = row[activeIndex].symbol;
    const selectedKey = key.find((el) => el.num === choice) || { symbol: "" };
    const selectedSymbol = selectedKey.symbol;
    const accurate = activeSymbol === selectedSymbol;

    if (accurate) setCount(count + 1);
  };

  // handleNumClick(num)
  // this will update the row/cell with the number selected
  // It will cause the highlighter to increment
  // if final cell is highlighted, call generateInitialRow to restart the highlighted cell at hte beginning and clear the cells

  // Within this game, I want the ability to reverse the layout, choosing numbers or choosing symbols
  // This would require a button with a handleclick that updates state making the above choice

  return (
    <div>
      <h1>Digit Symbol Substitution Test</h1>
      {/* Make this hidden until timer completes */}
      <h5>Timer: Score: {count}</h5>
      <div className="digit-symbol_substitution">
        <div className="digit-symbol_row">
          {key.map((key) => {
            return (
              <div>
                <div className="col-box">{String.fromCharCode(key.symbol)}</div>
                <div className="col-box">{key.num}</div>
              </div>
            );
          })}
        </div>
        <div className="digit-symbol_row">
          {row.map((cell, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                className={`digit-symbol_cell ${isActive ? "--active" : ""}`}
              >
                <div className="col-box">
                  {String.fromCharCode(cell.symbol)}
                </div>
                <div className="col-box">{cell.choice}</div>
              </div>
            );
          })}
        </div>
        <div className="digit-symbol_row">
          {keyNums.map((num) => {
            return (
              <div onClick={() => handleChoiceClick(num)} className="col-box">
                {num}
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/">Back to home</Link>
    </div>
  );
};

const generateRow = (key) => {
  const array20 = Array.from(Array(20));
  return array20.map((num, index) => {
    let symbolFound;
    let symbol;
    while (!symbolFound) {
      const random = generateRandom({ type: "num" });
      if (random < key.length) {
        symbol = key[random].symbol;
        symbolFound = true;
      }
    }
    return { symbol, active: index === 0 ? true : false };
  });
};

const generateKey = () => {
  const symbols = [] as any;

  keyNums.forEach((el) => {
    let symbolFound;
    while (!symbolFound) {
      const symbol = generateRandom({ type: "symbol", scale: 100 });
      if (!symbols.includes(symbol)) {
        symbols.push(symbol);
        symbolFound = true;
      }
    }
  });
  return keyNums.map((num, index) => ({ num, symbol: symbols[index] }));
};

export default DigitSymbolSubstitution;
