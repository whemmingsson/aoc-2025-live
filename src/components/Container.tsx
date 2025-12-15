import { useMachines } from "../context/useMachines";
import { Machine } from "./Machine";
import styles from "./Container.module.css";
import { MachineSelector } from "./MachineSelector";

export const Container = () => {
  const { toggleUseExample, useExample, reset } = useMachines();

  return (
    <div className={styles.container}>
      <h1>AOC 2025 - Day 10: Factory</h1>
      <MachineSelector />
      <Machine />
      <div className={styles.actions}>
        <button onClick={reset}>Reset all</button>
        <span>
          <input
            type="checkbox"
            checked={useExample}
            onChange={() => toggleUseExample()}
          />
          Use example data
        </span>
      </div>
    </div>
  );
};
