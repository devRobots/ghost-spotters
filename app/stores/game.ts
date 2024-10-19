import { NUM_SPOTS, TIMEOUT } from "@/consts";
import { createStore } from "zustand/vanilla";

type GameStatus = "loading" | "playing" | "gameover"
type GameResults = "win" | "lose" | undefined

export type GameState = {
  time: number;
  score: number;
  combo: number;
  status: GameStatus;
  result: GameResults;
  finds: boolean[];
  ghost: number;
  isScreaming: boolean;
};

export type GameActions = {
  tick: () => void;
  load: () => void;
  scoreUp: (ghost: number) => void;
  gameOver: (result: GameResults) => void;
  resetCombo: () => void;
  stopScream: () => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  time: TIMEOUT,
  score: 0,
  combo: 1,
  status: "loading",
  result: undefined,
  finds: Array(NUM_SPOTS).fill(false),
  ghost: -1,
  isScreaming: false,
};

export const createGameStore = () => {
  return createStore<GameStore>()((set) => ({
    ...defaultInitState,
    tick: () =>
      set((state: GameState) => ({
        time: state.time - 1
      })),
    scoreUp: (ghost: number) =>
      set((state: GameState) => ({
        score: state.score + state.combo * 10,
        combo: state.combo * 2,
        finds: state.finds.map((_, index) => {
          if (index === ghost) return true;
          return state.finds[index];
        }),
        ghost: ghost,
      })),
    load: () =>
      set(() => ({
        status: "playing"
      })),
    resetCombo: () =>
      set(() => ({
        combo: 1,
      })),
    gameOver: (reason: GameResults) =>
      set(() => ({
        status: "gameover",
        result: reason
      })),
    stopScream: () =>
      set(() => ({
        isScreaming: false,
      })),
  }));
};
