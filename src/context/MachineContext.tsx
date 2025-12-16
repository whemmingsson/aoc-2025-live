import React from "react";
import type { ButtonStateType, MachineStateType } from "../types/app.types";

export interface MachineContextType {
  machines: MachineStateType[];
  machine: MachineStateType | null;
  selectedMachineIndex: number;
  setMachine: (index: number) => void;
  pressButton: (botton: ButtonStateType) => void;
  reset: () => void;
  toggleUseExample: () => void;
  useExample: boolean;
  resetMachine: () => void;
  hoveredLampIndices: number[];
  setHoveredLampIndices: (indices: number[]) => void;
  pressedButtons: ButtonStateType[];
  isSolved: boolean;
}

export const MachineContext = React.createContext<MachineContextType | null>(
  null
);
