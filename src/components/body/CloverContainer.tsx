import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CloverBox from "./CloverBox";
import clover_container from "../../assets/clover_container.png";
import type { CardDockProps } from "../../CardDockContext";

export default function CloverContainer({
  savedCards,
  matchingWords,
  setMatchingWords,
}: {
  savedCards: CardDockProps[];
  matchingWords: string[];
  setMatchingWords: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function handleChange(e: { target: { value: string } }, index: number) {
    const newWords = [...matchingWords];
    newWords[index] = e.target.value;
    setMatchingWords(newWords);
  }
  return (
    <div className="mt-10 flex items-center justify-center">
      <div
        className="flex items-center justify-center"
        style={{
          width: "355px", // fixed size
          height: "400px",

          backgroundImage: `url(${clover_container})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      >
        <div className="relative w-[240px] h-[240px] text-lg">
          <DndProvider backend={HTML5Backend}></DndProvider>
          <div className="flex flex-wrap gap-0 justify-content-center">
            {[6, 7, 8, 9].map((slot) => (
              <CloverBox key={slot} slot={slot} />
            ))}
          </div>

          <div className="absolute top-[-45px] left-1/2 -translate-x-1/2 h-[45px] flex items-center justify-center">
            <input
              style={{
                background:
                  "linear-gradient(45deg, #ffffff, rgb(251, 255, 14), #27e82ad9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              disabled={!!savedCards.length}
              value={matchingWords[0] ?? ""}
              type="text"
              className="h-[30px] text-center outline-none"
              onChange={(e) => {
                handleChange(e, 0);
              }}
            />
          </div>

          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 font-bold">
            <input
              style={{
                background:
                  "linear-gradient(45deg, #158e00ff, #2e9556ff ,rgba(19, 67, 0, 1),rgba(0, 0, 0, 1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              disabled={!!savedCards.length}
              value={matchingWords[1] ?? ""}
              type="text"
              className="text-center outline-none"
              onChange={(e) => {
                handleChange(e, 1);
              }}
            />
          </div>

          <div className="absolute left-[-130px] top-1/2 -translate-y-1/2 font-bold rotate-[-90deg]">
            <input
              style={{
                background:
                  "linear-gradient(45deg, #ffffff, rgb(251, 255, 14), #27e82ad9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              disabled={!!savedCards.length}
              value={matchingWords[2] ?? ""}
              type="text"
              className="text-center outline-none"
              onChange={(e) => {
                handleChange(e, 2);
              }}
            />
          </div>

          <div className="absolute right-[-130px] top-1/2 -translate-y-1/2 rotate-[90deg]">
            <input
              style={{
                background:
                  "linear-gradient(45deg, #158e00ff, #2e9556ff ,rgba(19, 67, 0, 1),rgba(0, 0, 0, 1))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              disabled={!!savedCards.length}
              value={matchingWords[3] ?? ""}
              type="text"
              className="text-center outline-none"
              onChange={(e) => {
                handleChange(e, 3);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
