import React from "react";
import StartStopButtons, { StartStopButtonsProps } from "./StartStopButtons";

interface Props extends StartStopButtonsProps {
  countdown: number;
  score: number;
}

const GameState = ({
  countdown,
  score,
  onStartClick,
  onStopClick,
  displayStartButton,
  displayStopButton,
}) => {
  return (
    <div>
      <h5>
        Timer:{countdown} Score: {score}
      </h5>
      <StartStopButtons
        onStartClick={onStartClick}
        onStopClick={onStopClick}
        displayStartButton={Boolean(displayStartButton)}
        displayStopButton={Boolean(displayStopButton)}
      />
    </div>
  );
};

export default GameState;
