import { useMachines } from "../context/useMachines";
import type { MachineStateType } from "../types/app.types";
import styles from "./MachineSelector.module.css";

export const MachineSelector = () => {
  const { machines, selectedMachineIndex, setMachine } = useMachines();
  return (
    <div className={styles.selector}>
      <label htmlFor="machine-select" className={styles.label}>
        Select Machine:
      </label>
      <select
        id="machine-select"
        className={styles.select}
        value={selectedMachineIndex}
        onChange={(e) => setMachine(Number(e.target.value))}
      >
        {machines.map((_: MachineStateType, index: number) => (
          <option key={index} value={index}>
            Machine {index}
          </option>
        ))}
      </select>
    </div>
  );
};
