import { useMachines } from "../context/useMachines";
import styles from "./ButtonHistory.module.css";

export const ButtonHistory = () => {
  const { pressedButtons } = useMachines();

  if (pressedButtons.length === 0) {
    return false;
  }

  return (
    <>
      <h4>History</h4>
      <ul className={styles.buttonList}>
        {pressedButtons.map((b, i) => (
          <li key={b.id + "_" + i}>{b.label}</li>
        ))}
      </ul>
    </>
  );
};
