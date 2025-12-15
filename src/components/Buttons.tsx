import { useMachines } from "../context/useMachines";
import type { ButtonStateType } from "../types/app.types";
import styles from "./Buttons.module.css";

export const Buttons = () => {
  const { machine, pressButton, setHoveredLampIndices } = useMachines();

  const handleButtonClick = (button: ButtonStateType) => {
    pressButton(button.lampIndices);
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

  return (
    <div className={styles.buttons}>
      {machine.buttons.map((button) => (
        <button
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
  );
};
