"use client";
import { useState, createContext } from "react";

export const GameContext = createContext({
  score: 0,
  combo: 1,
  finds: 0,
  gameOver: false,
  setScore: (prev) => { },
  setCombo: (prev) => { },
  setFinds: (prev) => { },
  setGameOver: (prev) => { },
});

export function GameContextProvider({ children }) {
  const [score, setScore] = useState(0);
  const [finds, setFinds] = useState(0);
  const [combo, setCombo] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  return (
    <GameContext.Provider value={{
      score, combo, finds,
      setScore, setCombo, setFinds,
      gameOver, setGameOver
    }}>
      {children}
    </GameContext.Provider>
  );
}