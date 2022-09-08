import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameState from "../components/GameState";
import StartStopButtons from "../components/StartStopButtons";
import { charCodeToSymbol, generateRandom } from "../utils";

const SymbolSearch = () => {
  const initialCountdown = 120;
  const [rows, setRows] = useState<any[]>(generateSymbolsRows());
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [countdown, setCountdown] = useState(initialCountdown);

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
    setCount(0);
  };

  const handleStopClick = () => {
    handleGameFinished();
  };

  const handleGameFinished = (interval?: any) => {
    clearInterval(interval ? interval : intervalId);
    setIntervalId(undefined);
    setCountdown(initialCountdown);
    setRows(generateSymbolsRows());
    setActiveIndex(0);
  };

  return (
    <div>
      <h1>Symbol Search</h1>
      <GameState
        onStartClick={handleStartClick}
        onStopClick={handleStopClick}
        displayStartButton={Boolean(!intervalId)}
        displayStopButton={Boolean(intervalId)}
        countdown={countdown}
        score={count}
      />

      <div>
        {rows.map((row) => {
          return (
            <div className="symbol-search_row">
              <div className="symbol-search_options">
                {" "}
                {row.options.map((option) => charCodeToSymbol(option))}{" "}
              </div>
              <div className="symbol-search_symbols">
                {row.symbols.map((symbol) => (
                  <span className="symbol-search_symbol">
                    {charCodeToSymbol(symbol)}
                  </span>
                ))}
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
    if (includesCount >= 1) row.answer = true;

    rows.push(row);
  }

  return rows;
};

export default SymbolSearch;
