import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Card = {
  id: number;
  content: string;
  isFlipped: boolean;
  isSpy: boolean;
};

type GameState = {
  numberOfPlayers: number;
  currentPlayerIndex: number;
  cards: Card[];
  gameStarted: boolean;
  secretWord: string;
  // Actions
  setNumberOfPlayers: (number: number) => void;
  startGame: (secretWord: string) => void;
  resetGame: () => void;
  flipCard: (cardId: number) => void;
  nextCard: () => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      numberOfPlayers: 3,
      currentPlayerIndex: 0,
      cards: [],
      gameStarted: false,
      secretWord: '',

      setNumberOfPlayers: (number) => {
        set({ numberOfPlayers: number });
      },

      startGame: (secretWord) => {
        const { numberOfPlayers } = get();
        const cards: Card[] = [];
        
        // Create cards for each player
        for (let i = 0; i < numberOfPlayers; i++) {
          cards.push({
            id: i,
            content: secretWord,
            isFlipped: false,
            isSpy: false,
          });
        }
        
        // Randomly select one player to be the spy
        const spyIndex = Math.floor(Math.random() * numberOfPlayers);
        cards[spyIndex].isSpy = true;
        cards[spyIndex].content = 'SPY';
        
        // Shuffle the cards
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
        
        set({
          cards: shuffledCards,
          gameStarted: true,
          secretWord,
          currentPlayerIndex: 0,
        });
      },

      resetGame: () => {
        set({
          cards: [],
          gameStarted: false,
          secretWord: '',
          currentPlayerIndex: 0,
        });
      },

      flipCard: (cardId) => {
        const { cards } = get();
        const updatedCards = cards.map((card) =>
          card.id === cardId ? { ...card, isFlipped: !card.isFlipped } : card
        );
        set({ cards: updatedCards });
      },

      nextCard: () => {
        const { currentPlayerIndex, numberOfPlayers } = get();
        const nextIndex = (currentPlayerIndex + 1) % numberOfPlayers;
        set({ currentPlayerIndex: nextIndex });
      },
    }),
    {
      name: 'game-storage',
    }
  )
);