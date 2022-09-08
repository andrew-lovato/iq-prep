import React from "react";
export interface StartStopButtonsProps {
  onStartClick: () => void;
  onStopClick: () => void;
  displayStartButton: boolean;
  displayStopButton: boolean;
}

const StartStopButtons = ({
  onStartClick,
  onStopClick,
  displayStartButton,
  displayStopButton,
}) => {
  const handleStartClick = () => {
    onStartClick();
  };

  const handleStopClick = () => {
    onStopClick();
  };

  return (
    <div>
      {displayStartButton && (
        <div onClick={handleStartClick} className="digit-symbol_start">
          Start
        </div>
      )}

      {displayStopButton && (
        <div onClick={handleStopClick} className="digit-symbol_stop">
          Stop
        </div>
      )}
    </div>
  );
};

export default StartStopButtons;
