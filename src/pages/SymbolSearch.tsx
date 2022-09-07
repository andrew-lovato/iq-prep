import React, { useState } from "react";
import { Link } from "react-router-dom";
import { generateRandom } from "../utils";

const SymbolSearch = () => {
  /* 
    each row has three items: targetSymbols, optionSymbols, yes/no buttons
    generate your option symbols from allSymbols
    generate your two targetSymbols also from allSymbols, but limit to two matching 

    I also need to generate a 'correct answer' for each row, submit that answer with the answer from user
    if they match, add to the count
    Set a timer etc.
*/
  const [rows, setRows] = useState<any[]>(generateSymbolsRows());
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [countdown, setCountdown] = useState(10);

  const handleChoiceClick = (choice: boolean) => {
    const updated = [...rows];
    if (updated[activeIndex]) {
      updated[activeIndex].choice = choice;
    }
    setRows(updated);
    const updatedIndex = activeIndex + 1;
    if (updatedIndex === rows.length) {
      setRows(generateSymbolsRows());
      setActiveIndex(0);
    } else setActiveIndex(activeIndex + 1);
    const correctAnswer = rows[activeIndex].answer;
    const accurate = choice === correctAnswer;

    if (accurate) setCount(count + 1);
  };

  const handleStartClick = () => {
    const interval = setInterval(() => {
      setCountdown((cd) => {
        if (cd === 0) {
          handleGameFinished(interval);
          clearInterval(interval);
          return 0;
        } else return cd - 1;
      });
    }, 1000);
    setIntervalId(interval);
  };

  const handleStopClick = () => {
    handleGameFinished();
  };

  const handleGameFinished = (interval?: any) => {
    clearInterval(interval ? interval : intervalId);
    setIntervalId(undefined);
    setCountdown(10);
    setRows(generateSymbolsRows());
  };

  return (
    <div>
      <h1>Symbol Search</h1>
      <h5>
        Timer:{countdown} Score: {count}
      </h5>
      <div>
        {rows.map((row) => {
          console.log("object :>> ", `--${row.choice}`);
          return (
            <div className="symbol-search_row">
              <div className="symbol-search_options">
                {" "}
                {row.options.map((option) => String.fromCharCode(option))}{" "}
              </div>
              <div className="symbol-search_symbols">
                {row.symbols.map((symbol) => String.fromCharCode(symbol))}
              </div>
              <div className="symbol-search_buttons ">
                <button
                  className={`symbol-search_button_yes --${row.choice}`}
                  type="button"
                  onClick={() => handleChoiceClick(true)}
                >
                  Yes
                </button>
                <button
                  className={`symbol-search_button_no --${row.choice}`}
                  type="button"
                  onClick={() => handleChoiceClick(false)}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}
        {!intervalId && (
          <div onClick={handleStartClick} className="digit-symbol_start">
            Start
          </div>
        )}

        {intervalId && (
          <div onClick={handleStopClick} className="digit-symbol_stop">
            Stop
          </div>
        )}
      </div>
      <Link to="/">Back to home</Link>
    </div>
  );
};

const generateSymbolsRows = (rowCount = 20, length = 6) => {
  const rows = [] as any;
  while (rows.length < rowCount) {
    const symbols = [] as any;
    const options = [] as any;
    while (options.length < 2) {
      const symbol = generateRandom({ type: "symbol" });
      if (!options.includes(symbol)) {
        options.push(symbol);
      }
    }

    const row = { symbols, options, answer: false };

    while (symbols.length < length) {
      const symbol = generateRandom({ type: "symbol" });
      if (!symbols.includes(symbol)) {
        symbols.push(symbol);
      }
    }

    row.symbols = symbols;
    let includesCount = 0;
    for (const option of options) {
      if (symbols.includes(option)) includesCount += 1;
    }
    if (includesCount === 2) row.answer = true;

    rows.push(row);
  }

  return rows;
};

export default SymbolSearch;
