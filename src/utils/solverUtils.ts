import type { ButtonStateType } from "../types/app.types";

export interface ScoreResult {
  button: ButtonStateType | null | undefined;
  isCompleted: boolean;
}

interface Button {
  button: ButtonStateType;
  config: boolean[];
}

const xor = (a: boolean[], b: boolean[]) => {
  const result: boolean[] = [];

  for (let i = 0; i < a.length; i++) {
    result.push(a[i] !== b[i]);
  }

  return result;
};

const and = (a: boolean[], b: boolean[]) => {
  const result: boolean[] = [];

  for (let i = 0; i < a.length; i++) {
    result.push(a[i] === b[i]);
  }

  return result;
};

const transform = (button: ButtonStateType, len: number): Button => {
  const config: boolean[] = [];

  for (let i = 0; i < len; i++) {
    if (button.lampIndices.indexOf(i) >= 0) {
      config.push(true);
    } else {
      config.push(false);
    }
  }
  return { button, config };
};

const score = (state: boolean[], targetState: boolean[], button: Button) => {
  const newState = xor(state, button.config);
  const matches = and(newState, targetState).filter((b) => b).length;
  return matches;
};

const isValidButton = (button: ButtonStateType, history: ButtonStateType[]) => {
  if (history.length === 0) return true;
  if (history[history.length - 1].id === button.id) return false;
  return history.filter((b) => b === button).length < 2;
};

export const getBestButton = (
  state: boolean[],
  targetState: boolean[],
  buttons: ButtonStateType[],
  history: ButtonStateType[]
): ScoreResult => {
  const transformedButtons = buttons.map((b) =>
    transform(b, targetState.length)
  );

  let bestButton: Button | null = null;
  let bestScore = 0;
  let isCompleted = false;

  for (const btn of transformedButtons.filter((b) =>
    isValidButton(b.button, history)
  )) {
    const btnScore = score(state, targetState, btn);
    if (btnScore >= bestScore) {
      bestScore = btnScore;
      bestButton = btn;
    }
    if (btnScore === targetState.length) {
      isCompleted = true;
      break;
    }
  }

  return { button: bestButton?.button, isCompleted };
};
