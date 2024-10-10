import { createStore } from 'zustand/vanilla'

export type GameState = {
    score: number,
    combo: number,
    finds: number,
    inGame: boolean,
    loading: boolean,
}

export type GameActions = {
    load: () => void
    scoreUp: () => void
    gameOver: () => void
    resetCombo: () => void
}

export type GameStore = GameState & GameActions


export const defaultInitState: GameState = {
    score: 0,
    combo: 1,
    finds: 0,
    inGame: true,
    loading: true,
}

export const createGameStore = () => {
    return createStore<GameStore>()((set: any) => ({
        ...defaultInitState,
        scoreUp: () => set((state: GameState) => ({
            score: state.score + (state.combo * 10),
            combo: state.combo + 1,
            finds: state.finds + 1,
        })),
        load: () => set(() => ({
            loading: false
        })),
        resetCombo: () => set(() => ({
            combo: 1
        })),
        gameOver: () => set(() => ({
            inGame: true
        })),
    }))
}

