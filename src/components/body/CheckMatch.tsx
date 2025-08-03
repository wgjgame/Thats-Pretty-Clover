import { useEffect, useRef } from "react";
import type { CardDockProps } from "../../CardDockContext";

export default function CheckMatch({
  cardDock,
  savedCards,
  revealCards,
  failedCount,
  matchingWords,
  warning,
  setCardDock,
  setSavedCards,
  setFailedCount,
  setMatchSuccess,
  setRevealCards,
  setWarning,
  setGameStart,
  setSelectedSlot,
}: {
  cardDock: CardDockProps[];
  savedCards: CardDockProps[];
  revealCards: boolean;
  failedCount: number;
  matchingWords: string[];
  warning: { showWarning: boolean; type: string };
  setCardDock: React.Dispatch<React.SetStateAction<CardDockProps[]>>;
  setMatchSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setRevealCards: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedCards: React.Dispatch<React.SetStateAction<CardDockProps[]>>;
  setFailedCount: React.Dispatch<React.SetStateAction<number>>;
  setWarning: React.Dispatch<
    React.SetStateAction<{ showWarning: boolean; type: string }>
  >;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSlot: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const prevCardDockRef = useRef<CardDockProps[] | null>(null);

  useEffect(() => {
    if (warning.showWarning === true) {
      const timer = setTimeout(() => {
        setWarning({ showWarning: false, type: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [setWarning, warning]);

  function saveCards() {
    const lastFour = cardDock.slice(-5);
    if (lastFour.some((card) => card.words === undefined)) {
      setWarning({ showWarning: true, type: "lastFour" });
      return;
    } else if (
      matchingWords.length < 4 ||
      matchingWords.some((word) => word === undefined)
    ) {
      setWarning({ showWarning: true, type: "match" });
      return;
    }
    const filled = cardDock.filter((card) => card.words) as CardDockProps[];
    setSavedCards(filled);
    setRevealCards(false);
    setSelectedSlot(null);

    const cleared = cardDock.map(
      (card) => ({ ...card, words: undefined } as CardDockProps)
    );

    const targetIndices = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);

    const rotatedCards = filled.map((card) => {
      const rotations = Math.floor(Math.random() * 4);
      let { top, right, bottom, left } = card.words!;
      for (let i = 0; i < rotations; i++) {
        [top, right, bottom, left] = [left, top, right, bottom];
      }
      return {
        ...card,
        words: { top, right, bottom, left },
      };
    });

    for (let i = 0; i < rotatedCards.length; i++) {
      const idx = targetIndices[i];
      cleared[idx] = {
        ...cleared[idx],
        words: rotatedCards[i].words,
      };
    }

    setCardDock(cleared);
  }

  function checkMatch() {
    const placedCards = cardDock.slice(5, 9);
    const matchResult = savedCards.slice(0, 4).every((savedCard, i) => {
      const dockCard = placedCards[i];
      if (!savedCard.words || !dockCard.words) return false;
      return savedCard.words.top === dockCard.words.top;
    });
    if (!matchResult) {
      setFailedCount(failedCount + 1);
      if (failedCount > 6) {
        setGameStart(false);
      }
    } else if (matchResult) {
      setGameStart(false);
    }
    if (savedCards.length > 0) {
      setMatchSuccess(matchResult);
    }
  }

  function showMatchedCards() {
    if (savedCards.length === 0) return;
    if (!revealCards) {
      prevCardDockRef.current = [...cardDock];
      setRevealCards(!revealCards);
      setCardDock(
        cardDock.map((card) => ({
          ...card,
          words: savedCards.find((savedCard) => savedCard.slot === card.slot)
            ?.words,
        }))
      );
    } else {
      setRevealCards(!revealCards);
      setCardDock(prevCardDockRef.current!);
    }
  }

  return (
    <div className="my-10 flex justify-center gap-8 items-center">
      {savedCards?.length === 0 && (
        <button
          className="py-2 px-4"
          onClick={() => {
            saveCards();
          }}
        >
          Save Match
        </button>
      )}
      {savedCards?.length > 0 && (
        <button
          className="py-2 px-4"
          onClick={() => {
            checkMatch();
          }}
        >
          Check Match
        </button>
      )}
      {savedCards?.length > 0 && (
        <button
          className="py-2 px-4"
          onClick={() => {
            showMatchedCards();
          }}
        >
          {revealCards ? "Hide Cards" : "Reavel Cards"}
        </button>
      )}
    </div>
  );
}
