import { data as exampleData } from "../data/input.example";
import { data as puzzleData } from "../data/input";

const xor = (a: number, b: number) => {
  return a ^ b;
};

export class LampArrayClass {
  state: number;
  id: number;
  targetState: number;
  numberOfLamps: number;
  constructor(machineId: number, targetState: string) {
    this.numberOfLamps = targetState.length;
    this.id = machineId;
    this.state = 0;
    this.targetState = bitStringToNumber(createBitString(targetState));
  }

  display() {
    console.log(this.id, this.state);
  }

  getDisplayText() {
    const bitStr = this.state.toString(2).padStart(this.numberOfLamps, "0");
    return bitStr.replaceAll("0", ".").replaceAll("1", "#");
  }

  getLamps() {
    const bitStr = this.state.toString(2).padStart(this.numberOfLamps, "0");
    return bitStr.split("").map((bit) => bit === "1");
  }

  getTargetState() {
    const bitStr = this.targetState
      .toString(2)
      .padStart(this.numberOfLamps, "0");
    return bitStr.split("").map((bit) => bit === "1");
  }

  isDone() {
    return this.state === this.targetState;
  }

  onButtonPress(config: number) {
    this.state = xor(this.state, config);
  }
}

export class ButtonClass {
  lamps: number;
  machineId: number;
  label: string;
  id: number;
  lampIndices: number[];
  constructor(
    machineId: number,
    lamps: number,
    id: number,
    lampIndices: number[]
  ) {
    this.machineId = machineId;
    this.lamps = lamps;
    this.label = lampIndices.join(",");
    this.id = id || 0;
    this.lampIndices = lampIndices;
  }

  press() {
    if (!machineMap.has(this.machineId)) {
      console.log("Unable to find machine with id", this.machineId);
    }

    const machine = machineMap.get(this.machineId);
    machine?.onButtonPress(this.lamps);
  }
}

export class MachineClass {
  lampArray: LampArrayClass;
  buttons: ButtonClass[];
  id: number;
  constructor(id: number, lampArray: LampArrayClass, buttons: ButtonClass[]) {
    this.id = id;
    this.lampArray = lampArray;
    this.buttons = buttons;
  }

  display() {
    this.lampArray.display();
  }

  solve() {
    console.log("TODO");
  }

  onButtonPress(config: number) {
    this.lampArray.onButtonPress(config);
  }

  print() {
    console.log("Machine:", this.id);
    console.log("Lamp state:", this.lampArray.getDisplayText());
  }

  getButtons() {
    return this.buttons;
  }
}

interface IButton {
  lamps: number[];
}

interface ILampArray {
  target: string;
}

interface IMachine {
  lampArray: ILampArray;
  buttons: IButton[];
}

const buildButton = (raw: string): IButton => {
  return {
    lamps: raw
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((r) => Number.parseInt(r.trim())!),
  };
};

const buildLampArray = (raw: string): ILampArray => {
  return {
    target: raw.replace("[", "").replace("]", ""),
  };
};

const bitStringToNumber = (bitString: string) => {
  return Number.parseInt(bitString, 2);
};

const createBitString = (config: string) => {
  return config.replaceAll(".", "0").replaceAll("#", "1");
};

const buttonRegex = /\([\d,]+\)/g;
const lampRegex = /(\[[.#]+\])/;

// Raw structures
let machinesRaw: IMachine[] = [];

// Class structures
let machines: MachineClass[] = [];
let machineMap: Map<number, MachineClass> = new Map();

export const parseData = (useExample: boolean): MachineClass[] => {
  machinesRaw = [];
  machines = [];
  machineMap = new Map();
  const rows = (useExample ? exampleData : puzzleData).split("\n");
  rows.forEach((row) => {
    const lamp = lampRegex.exec(row)![0];
    const buttonsStr = [...row.matchAll(buttonRegex)].map((r) => r[0]);
    const lampArray = buildLampArray(lamp);
    const buttons = buttonsStr.map((b) => buildButton(b));

    machinesRaw.push({ lampArray, buttons });
  });

  machinesRaw.forEach((m, i) => {
    const la = new LampArrayClass(i, m.lampArray.target);
    const btns = m.buttons.map((b, j) => {
      let bitStrArr = "0".repeat(m.lampArray.target.length).split("");
      b.lamps.forEach((l) => (bitStrArr[l] = "1"));
      const button = new ButtonClass(
        i,
        bitStringToNumber(bitStrArr.join("")),
        j,
        b.lamps
      );
      return button;
    });
    const machine = new MachineClass(i, la, btns);
    machines.push(machine);
    machineMap.set(i, machine);
  });

  // Demo
  console.log("Parsed", machines.length, "machines");

  return machines;
};
