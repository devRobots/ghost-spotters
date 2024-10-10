"use client"

import { useStore } from 'zustand'
import { type ReactNode, createContext, useRef, useContext } from 'react'

import { type GameStore, createGameStore } from '../stores/game'

export type GameStoreApi = ReturnType<typeof createGameStore>

export const GameStoreContext = createContext<GameStoreApi>(createGameStore())


export const GameStoreProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<GameStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createGameStore()
  }

  return (
    <GameStoreContext.Provider value={storeRef.current} >
      {children}
    </GameStoreContext.Provider>
  )
}

export const useGameStore = <T,>(
  selector: (store: GameStore) => T,
): T => {
  const gameStoreContext = useContext(GameStoreContext)

  if (!gameStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(gameStoreContext, selector)
}
