import { motion } from "framer-motion";
import { Card } from "@/store/game-store";
import { cn } from "@/lib/utils";

interface GameCardProps {
  card: Card;
  isActive: boolean;
  onFlip: () => void;
  onNext: () => void;
}

export function GameCard({ card, isActive, onFlip, onNext }: GameCardProps) {
  const handleClick = () => {
    if (!isActive) return;
    
    if (card.isFlipped) {
      onNext();
    } else {
      onFlip();
    }
  };

  return (
    <motion.div
      className={cn(
        "relative w-64 h-96 cursor-pointer perspective-1000",
        !isActive && "opacity-50 cursor-not-allowed"
      )}
      whileHover={isActive ? { scale: 1.05 } : {}}
      whileTap={isActive ? { scale: 0.95 } : {}}
      onClick={handleClick}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-500"
        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl flex items-center justify-center"
        >
          <h2 className="text-white text-4xl font-bold">?</h2>
        </motion.div>
        
        {/* Back of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-xl bg-white shadow-xl flex items-center justify-center rotate-y-180"
        >
          <h2 className={cn(
            "text-2xl font-bold",
            card.isSpy ? "text-red-500" : "text-gray-800"
          )}>
            {card.content}
          </h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}