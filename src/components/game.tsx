"use client"

import { useGameStore } from "@/store/game-store";
import { GameSetup } from "@/components/game-setup";
import { GameBoard } from "@/components/game-board";

export function Game() {
  const { gameStarted } = useGameStore();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Secret Word Card Game</h1>
      {gameStarted ? <GameBoard /> : <GameSetup />}
    </div>
  );
}