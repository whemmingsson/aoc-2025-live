import { useMachines } from "../context/useMachines";
import styles from "./LampArray.module.css";

export const LampArray = () => {
  const { machine, hoveredLampIndices } = useMachines();
  const lampStates = machine?.lamps || [];
  const targetStates = machine?.targetState || [];

  if (!machine) {
    return <div>No machine selected</div>;
  }

  return (
    <div className={styles.lamps}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>Index</td>
            {lampStates.map((_, index) => (
              <td key={index}>{index}</td>
            ))}
          </tr>
          <tr>
            <td>Lamp</td>
            {lampStates.map((on, index) => (
              <td
                key={index}
                className={
                  hoveredLampIndices.includes(index) ? styles.highlighted : ""
                }
              >
                {on ? "💡" : "⚫"}
              </td>
            ))}
          </tr>
          <tr>
            <td>Target</td>
            {targetStates.map((on, index) => (
              <td key={index}>{on ? "🎯" : "⚪"}</td>
            ))}
          </tr>

          <tr>
            <td>Correct</td>
            {lampStates.map((on, index) => (
              <td key={index}>{on === targetStates[index] ? "✅" : "❌"}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
