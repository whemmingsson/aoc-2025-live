import { useMachines } from "../context/useMachines";
import { ButtonHistory } from "./ButtonHistory";
import { Buttons } from "./Buttons";
import { LampArray } from "./LampArray";
import styles from "./Machine.module.css";

export const Machine = () => {
  const { machine, resetMachine, isSolved } = useMachines();

  if (!machine) {
    return <div>No machine selected</div>;
  }

  return (
    <div className={styles.machine}>
      <div>
        <h2>
          Machine: {machine.id} {isSolved && <span>[SOLVED]</span>}
        </h2>{" "}
      </div>
      <div>
        <LampArray />
      </div>
      <div>
        <Buttons />
      </div>
      <div>
        <ButtonHistory />
      </div>

      <div>
        <button onClick={resetMachine}>Reset machine</button>
      </div>
    </div>
  );
};
