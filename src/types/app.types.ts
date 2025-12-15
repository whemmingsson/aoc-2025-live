export interface ButtonStateType {
  id: number;
  label: string;
  lampIndices: number[];
}

export interface MachineStateType {
  id: number;
  lamps: boolean[];
  targetState: boolean[];
  buttons: ButtonStateType[];
}
