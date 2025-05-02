import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GameCard } from "@/components/game-card";
import { useGameStore } from "@/store/game-store";

export function GameBoard() {
  const { cards, currentPlayerIndex, flipCard, nextCard, resetGame } = useGameStore();
  const [showNextPlayer, setShowNextPlayer] = useState(false);

  const handleFlip = (cardId: number) => {
    flipCard(cardId);
  };

  const handleNext = () => {
    setShowNextPlayer(true);
  };

  const handleNextPlayerTurn = () => {
    nextCard();
    setShowNextPlayer(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (showNextPlayer) {
    return (
      <motion.div 
        className="w-full h-full flex flex-col items-center justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.h1 
          className="text-4xl font-bold text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          Next Player's Turn
        </motion.h1>
        <Button 
          size="lg" 
          onClick={handleNextPlayerTurn}
          className="mt-4"
        >
          Ready
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="flex justify-between w-full">
          <Button 
            variant="outline" 
            onClick={resetGame}
          >
            New Game
          </Button>
          <h2 className="text-xl font-semibold">
            Player {currentPlayerIndex + 1}'s Turn
          </h2>
        </div>

        <motion.div 
          className="flex justify-center flex-wrap gap-8 mt-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {cards.length > 0 && (
            <motion.div 
              variants={item}
              className="w-full flex justify-center"
            >
              <GameCard
                card={cards[currentPlayerIndex]}
                isActive={true}
                onFlip={() => handleFlip(cards[currentPlayerIndex].id)}
                onNext={handleNext}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}