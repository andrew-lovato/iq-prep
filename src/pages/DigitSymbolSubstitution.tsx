import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameState from "../components/GameState";
import { generateRandom, charCodeToSymbol } from "../utils";

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
  const initialKey = generateKeyData();
  const initialCountdown = 120;
  const [row, setRow] = useState<ChoiceCell[]>(
    generateRowData({ key: initialKey })
  );
  const [key, setKey] = useState<ChoiceKey[]>(initialKey);
  const [activeIndex, setActiveIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [countdown, setCountdown] = useState(initialCountdown);

  const handleChoiceClick = (choice: number) => {
    const updated = [...row];
    if (updated[activeIndex]) {
      updated[activeIndex].choice = choice;
    }
    setRow(updated);
    const updatedIndex = activeIndex + 1;
    if (updatedIndex === row.length) {
      setRow(generateRowData({ key }));
      setActiveIndex(0);
    } else setActiveIndex(activeIndex + 1);
    const activeSymbol = row[activeIndex].symbol;
    const selectedKey = key.find((el) => el.num === choice) || { symbol: "" };
    const selectedSymbol = selectedKey.symbol;
    const accurate = activeSymbol === selectedSymbol;

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
    setCountdown(initialCountdown);
    setRow(generateRowData({ key: initialKey }));
    setActiveIndex(0);
  };

  return (
    <div className="digit-symbol_substitution">
      <h1>Digit Symbol Substitution Test</h1>
      <GameState
        onStartClick={handleStartClick}
        onStopClick={handleStopClick}
        displayStartButton={Boolean(!intervalId)}
        displayStopButton={Boolean(intervalId)}
        countdown={countdown}
        score={count}
      />
      <CreateKey gameKey={key} />
      <CreateEmptyCells row={row} activeIndex={activeIndex} />
      <CreateOptions options={keyNums} onClick={handleChoiceClick} />
      <Link to="/">Back to home</Link>
    </div>
  );
};

const CreateOptions = ({
  options,
  onClick,
}: {
  options: number[];
  onClick: (param) => void;
}) => {
  const handleChoiceClick = (num) => {
    onClick(num);
  };
  return (
    <div className="digit-symbol_row">
      {options.map((num) => {
        return (
          <div onClick={() => handleChoiceClick(num)} className="col-box">
            {num}
          </div>
        );
      })}
    </div>
  );
};

const CreateKey = ({ gameKey }: { gameKey: ChoiceKey[] }) => {
  return (
    <div className="digit-symbol_row">
      {gameKey.map((key) => {
        return (
          <div>
            <div className="col-box">{charCodeToSymbol(key.symbol)}</div>
            <div className="col-box">{key.num}</div>
          </div>
        );
      })}
    </div>
  );
};

const CreateEmptyCells = ({
  row,
  activeIndex,
}: {
  row: ChoiceCell[];
  activeIndex: number;
}) => {
  return (
    <div className="digit-symbol_row">
      {row.map((cell, index) => {
        const isActive = index === activeIndex;
        return (
          <div className={`digit-symbol_cell ${isActive ? "--active" : ""}`}>
            <div className="col-box">{charCodeToSymbol(cell.symbol)}</div>
            <div className="col-box">{cell.choice}</div>
          </div>
        );
      })}
    </div>
  );
};

const generateRowData = ({
  key,
  rowLength = 20,
}: {
  key: any[];
  rowLength?: number;
}) => {
  const array20 = Array.from(Array(rowLength));
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

const generateKeyData = () => {
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
