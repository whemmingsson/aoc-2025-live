import { useMachines } from "../context/useMachines";
import type { ButtonStateType } from "../types/app.types";
import { getBestButton } from "../utils/solverUtils";
import styles from "./Buttons.module.css";

export const Buttons = () => {
  const { machine, pressButton, setHoveredLampIndices, pressedButtons } =
    useMachines();

  const handleButtonClick = (button: ButtonStateType) => {
    pressButton(button);
  };

  const handleMouseEnter = (button: ButtonStateType) => {
    setHoveredLampIndices(button.lampIndices);
  };

  const handleMouseLeave = () => {
    setHoveredLampIndices([]);
  };

  if (!machine) {
    return <div>No machine selected</div>;
  }

  const suggestedButton = getBestButton(
    machine.lamps,
    machine.targetState,
    machine.buttons,
    pressedButtons
  );

  return (
    <>
      <div className={styles.buttons}>
        {machine.buttons.map((button) => (
          <button
            className={
              suggestedButton && suggestedButton.button?.id === button.id
                ? styles.suggested
                : ""
            }
            key={button.id}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleButtonClick(button);
            }}
            onMouseEnter={() => handleMouseEnter(button)}
            onMouseLeave={handleMouseLeave}
          >
            {button.label}
          </button>
        ))}
      </div>
    </>
  );
};
