import { useContext } from "react";
import { MachineContext } from "./MachineContext";

export const useMachines = () => {
  const context = useContext(MachineContext);

  if (!context) {
    throw new Error("useMachines must be used within a MachineContextProvider");
  }

  return context;
};
