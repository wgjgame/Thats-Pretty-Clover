import { createContext } from "react";

export interface CardDockProps {
  id: number;
  slot: number;
  words?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
}

export const CardDockContext = createContext<{
  cardDock: CardDockProps[];
  setCardDock: React.Dispatch<React.SetStateAction<CardDockProps[]>>;
  selectedSlot: number | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<number | null>>;
}>({
  cardDock: [],
  setCardDock: () => {},
  selectedSlot: null,
  setSelectedSlot: () => {},
});
