export default function Starting({
  gameStart,
  setGameStart,
  initWords,
  setFailedCount,
  setMatchSuccess,
}: {
  gameStart: boolean;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  setFailedCount: React.Dispatch<React.SetStateAction<number>>;
  initWords: () => void;
  setMatchSuccess: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}) {
  function gameStarts() {
    setGameStart(!gameStart);
    setFailedCount(0);
    initWords();
    setMatchSuccess(undefined);
  }
  return (
    !gameStart && (
      <button
        className="mt-10 text-green-1000 font-bold py-2 px-4 rounded border-4 border-green-500"
        onClick={() => gameStarts()}
      >
        Game Starts
      </button>
    )
  );
}
