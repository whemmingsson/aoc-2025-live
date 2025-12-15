import { useMachines } from "../context/useMachines";
import { Buttons } from "./Buttons";
import { LampArray } from "./LampArray";
import styles from "./Machine.module.css";

export const Machine = () => {
  const { machine, resetMachine } = useMachines();

  if (!machine) {
    return <div>No machine selected</div>;
  }

  return (
    <div className={styles.machine}>
      <div>
        <h2>Machine: {machine.id}</h2>{" "}
      </div>
      <div>
        <LampArray />
      </div>
      <div>
        <Buttons />
      </div>

      <div>
        <button onClick={resetMachine}>Reset machine</button>
      </div>
    </div>
  );
};
