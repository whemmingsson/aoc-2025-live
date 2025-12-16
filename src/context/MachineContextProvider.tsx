import React from "react";
import { MachineContext } from "./MachineContext";
import { MachineClass, parseData } from "../utils/dataUtils";
import type { ButtonStateType, MachineStateType } from "../types/app.types";

export const MachineContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [machineState, setMachineState] = React.useState<MachineStateType[]>(
    []
  );
  const [machine, setMachine] = React.useState<MachineStateType | null>(null);
  const [selectedMachineIndex, setSelectedMachineIndex] =
    React.useState<number>(0);
  const initialized = React.useRef(false);
  const [useExample, setUseExample] = React.useState(true);
  const [hoveredLampIndices, setHoveredLampIndices] = React.useState<number[]>(
    []
  );
  const [pressedButtons, setPressedButtons] = React.useState<ButtonStateType[]>(
    []
  );

  const transform = (machine: MachineClass): MachineStateType => {
    return {
      id: machine.id,
      lamps: machine.lampArray.getLamps(),
      targetState: machine.lampArray.getTargetState(),
      buttons: machine.buttons.map((button, i) => ({
        id: i,
        label: button.label,
        lampIndices: button.lampIndices,
      })),
    };
  };

  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const machines = parseData(useExample);
    const transformedMachines = machines.map(transform);

    setMachineState(transformedMachines);
    setSelectedMachineIndex(0);
    if (machines.length > 0) {
      setMachine(transform(machines[0]));
    }
  }, [useExample]);

  const handleSetMachine = (index: number) => {
    const selectedMachine = machineState[index];
    if (selectedMachine) {
      setSelectedMachineIndex(index);
      setMachine(selectedMachine);
      setPressedButtons([]);
    }
  };

  const handleButtonPress = (button: ButtonStateType) => {
    if (!machine) return;
    const lampIndices = button.lampIndices;
    const newLamps = [...machine.lamps];
    lampIndices.forEach((index) => {
      newLamps[index] = !newLamps[index];
    });
    setPressedButtons((prev) => [...prev, button]);
    setMachine({ ...machine, lamps: newLamps });
  };

  const reset = () => {
    const machines = parseData(useExample);
    const transformedMachines = machines.map(transform);
    console.log("Resetting machines to initial state", transformedMachines);
    setMachineState(transformedMachines);
    setSelectedMachineIndex(0);
    if (machines.length > 0) {
      setMachine(transform(machines[0]));
    }
  };

  const toggleUseExample = () => {
    initialized.current = false;
    setUseExample((prev) => !prev);
  };

  const resetMachine = () => {
    console.log("Resetting current machine to initial state");
    if (!machine) return;
    const newLamps = new Array(machine.lamps.length).fill(false);
    setMachine({ ...machine, lamps: newLamps });
    setPressedButtons([]);
  };

  return (
    <MachineContext.Provider
      value={{
        machines: machineState,
        machine,
        selectedMachineIndex,
        setMachine: handleSetMachine,
        pressButton: handleButtonPress,
        reset,
        toggleUseExample,
        useExample,
        resetMachine,
        hoveredLampIndices,
        setHoveredLampIndices,
        pressedButtons,
        isSolved:
          machine?.lamps.every((l, i) => l == machine.targetState[i]) ?? false,
      }}
    >
      {children}
    </MachineContext.Provider>
  );
};
