import { NUM_SPOTS, TIMEOUT } from "@/consts";
import { createStore } from "zustand/vanilla";

type GameStatus = "loading" | "playing" | "gameover"
type GameResults = "win" | "lose" | undefined

export type GameState = {
  time: number;
  status: GameStatus;
  result: GameResults;
  finds: boolean[];

  ghost: number;
  spotted: boolean;
  isScreaming: boolean;
};

export type GameActions = {
  tick: () => void;
  load: () => void;
  scream: () => void;
  shutup: () => void;
  unmark: () => void;
  spot: (ghost: number) => void;
  gameOver: (result: GameResults) => void;
};

export type GameStore = GameState & GameActions;

export const defaultInitState: GameState = {
  time: TIMEOUT,
  status: "loading",
  result: undefined,
  finds: Array(NUM_SPOTS).fill(false),

  ghost: -1,
  spotted: false,
  isScreaming: false,
};

export const createGameStore = () => {
  return createStore<GameStore>()((set) => ({
    ...defaultInitState,
    tick: () =>
      set((state: GameState) => ({
        time: state.time - 1
      })),
    spot: (ghost: number) =>
      set((state: GameState) => {
        console.log(state.finds.filter((spot) => spot === false).length)
        return {
          finds: state.finds.map((_, index) => {
            if (index === ghost) return true;
            return state.finds[index];
          }),
          ghost: ghost,
          spotted: true,
          status: state.finds.filter((spot) => spot === false).length === 1 ? "gameover" : "playing",
          result: state.finds.filter((spot) => spot === false).length === 1 ? "win" : undefined
        }
      }),
    load: () =>
      set(() => ({
        status: "playing"
      })),
    gameOver: (reason: GameResults) =>
      set(() => ({
        status: "gameover",
        result: reason
      })),
    scream: () =>
      set(() => ({
        isScreaming: true,
      })),
    shutup: () =>
      set(() => ({
        isScreaming: false,
      })),
    unmark: () =>
      set(() => ({
        spotted: false,
      })),
  }));
};
