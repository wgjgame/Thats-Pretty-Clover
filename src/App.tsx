import "./App.css";
import CardDock from "./components/body/CardDock";
import Header from "./components/header/Header";
import CloverContainer from "./components/body/CloverContainer";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useEffect, useState } from "react";
import { CardDockContext, type CardDockProps } from "./CardDockContext";
import CheckMatch from "./components/body/CheckMatch";
import Starting from "./components/starting/Starting";
import chinese from "../src/assets/chinese_nouns_5000.json";
import ResponseBanner from "./components/body/ResponseBanner";
import clover_background from "./assets/clover_background.jpeg";
import Rules from "./components/body/Rules";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [revealCards, setRevealCards] = useState(false);
  const [savedCards, setSavedCards] = useState<CardDockProps[]>([]);
  const [failedCount, setFailedCount] = useState(0);
  const [matchingWords, setMatchingWords] = useState<string[]>([]);
  const [showRules, setShowRules] = useState(false);
  const [warning, setWarning] = useState({
    showWarning: false,
    type: "",
  });
  const [matchSuccess, setMatchSuccess] = useState<boolean | undefined>(
    undefined
  );
  const [cardDock, setCardDock] = useState<CardDockProps[]>(
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      slot: i + 1,
    }))
  );

  useEffect(() => {
    if (matchSuccess === false && failedCount <= 7) {
      const timer = setTimeout(() => {
        setMatchSuccess(undefined);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [matchSuccess, failedCount]);

  useEffect(() => {
    if (!gameStart) {
      setCardDock(
        Array.from({ length: 5 }, (_, i) => ({
          id: i,
          slot: i + 1,
        }))
      );
      setSavedCards([]);
      setRevealCards(false);
      setMatchingWords([]);
    }
  }, [gameStart]);

  function initWords() {
    const updated = [...cardDock];

    // Make a shallow copy and shuffle it
    const shuffled = [...chinese].sort(() => Math.random() - 0.5);

    const totalNeeded = 4 * 5; // 4 slots × 4 words = 16
    const selected = shuffled.slice(0, totalNeeded);

    for (let i = 0; i < 5; i++) {
      const wordGroup = selected.slice(i * 4, i * 4 + 4);
      const slotIndex = 5 + i;

      updated[slotIndex] = {
        id: slotIndex,
        slot: slotIndex + 1,
        words: {
          top: wordGroup[0],
          right: wordGroup[1],
          bottom: wordGroup[2],
          left: wordGroup[3],
        },
      };
    }

    setCardDock(updated);
  }

  function clearTile(item: CardDockProps, slot: number) {
    if (item?.slot === slot) return;

    setCardDock((prev) =>
      prev.map((card) =>
        card.slot === item.slot ? { ...card, words: undefined } : card
      )
    );
  }

  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${clover_background})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          zIndex: -1,
        }}
      />
      <button
        onClick={() => setShowRules((prev) => !prev)}
        className="absolute top-4 right-4 z-50 px-4 py-2"
      >
        Rules
      </button>
      <Header gameStart={gameStart} />
      {showRules && <Rules />}
      {(matchSuccess !== undefined || warning.showWarning) && (
        <ResponseBanner
          warning={warning}
          failedCount={failedCount}
          matchSuccess={matchSuccess}
        />
      )}
      <Starting
        gameStart={gameStart}
        setFailedCount={setFailedCount}
        setGameStart={setGameStart}
        initWords={initWords}
        setMatchSuccess={setMatchSuccess}
      ></Starting>
      {gameStart && !matchSuccess && failedCount <= 7 && (
        <CardDockContext.Provider
          value={{ cardDock, setCardDock, clearTile: clearTile }}
        >
          <DndProvider backend={HTML5Backend}>
            {savedCards.length > 0 && (
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #fff64cef, #b4f367ff, #29be5fd9)",
                }}
                className="flex gap-4 mt-8 p-4 bg-green-200 rounded-xl"
              >
                {cardDock.slice(0, revealCards ? 4 : 5).map((card) => (
                  <CardDock key={card.slot} slot={card.slot} />
                ))}
                {revealCards &&
                  (() => {
                    const lastSaved = savedCards.at(-1);
                    return lastSaved?.words ? (
                      <CardDock key={lastSaved.slot} slot={lastSaved.slot} />
                    ) : null;
                  })()}
              </div>
            )}
            <CloverContainer
              savedCards={savedCards}
              matchingWords={matchingWords}
              setMatchingWords={setMatchingWords}
            ></CloverContainer>
          </DndProvider>
          <CheckMatch
            matchingWords={matchingWords}
            cardDock={cardDock}
            setCardDock={setCardDock}
            setMatchSuccess={setMatchSuccess}
            revealCards={revealCards}
            setRevealCards={setRevealCards}
            savedCards={savedCards}
            setSavedCards={setSavedCards}
            failedCount={failedCount}
            setFailedCount={setFailedCount}
            warning={warning}
            setWarning={setWarning}
            setGameStart={setGameStart}
          ></CheckMatch>
        </CardDockContext.Provider>
      )}
    </div>
  );
}

export default App;
