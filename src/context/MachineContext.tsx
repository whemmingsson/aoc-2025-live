import React from "react";
import type { MachineStateType } from "../types/app.types";

export interface MachineContextType {
  machines: MachineStateType[];
  machine: MachineStateType | null;
  selectedMachineIndex: number;
  setMachine: (index: number) => void;
  pressButton: (lampIndices: number[]) => void;
  reset: () => void;
  toggleUseExample: () => void;
  useExample: boolean;
  resetMachine: () => void;
  hoveredLampIndices: number[];
  setHoveredLampIndices: (indices: number[]) => void;
}

export const MachineContext = React.createContext<MachineContextType | null>(
  null
);
