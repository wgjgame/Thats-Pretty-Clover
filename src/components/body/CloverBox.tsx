import { useDrop } from "react-dnd";
import CloverTile from "./CloverTile";
import { CardDockContext, type CardDockProps } from "../../CardDockContext";
import React from "react";

export default function CloverBox({ slot }: { slot: number }) {
  const { cardDock, setCardDock, clearTile } =
    React.useContext(CardDockContext);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item: CardDockProps) => {
      setCardDock((items) => {
        const clonedItems = [...items];

        const targetIndex = slot - 1;
        const sourceIndex = item.slot! - 1;

        const targetItem = clonedItems[targetIndex];
        const sourceItem = clonedItems[sourceIndex];

        if (targetItem.words && sourceItem.words) {
          clonedItems[targetIndex] = { ...sourceItem, slot };
          clonedItems[sourceIndex] = { ...targetItem, slot: item.slot! };
        } else {
          clonedItems[targetIndex] = { ...item, slot };
          clearTile(item, slot);
        }
        return clonedItems;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  function rotateWords(tile: CardDockProps) {
    if (!tile?.words) return;

    setCardDock((prev) =>
      prev.map((card) =>
        card.id === tile.id && card.words
          ? {
              ...card,
              words: {
                top: card.words.left,
                right: card.words.top,
                bottom: card.words.right,
                left: card.words.bottom,
              },
            }
          : card
      )
    );
  }

  const dropRefCast = dropRef as unknown as React.Ref<HTMLDivElement>;
  const droppedItem = cardDock.find((item) => item?.slot === slot);

  return (
    <div
      ref={dropRefCast}
      className={`relative m-[2.5px] w-[115px] h-[115px] flex items-center justify-center ${
        isOver ? "border-3 border-solid border-yellow-300" : ""
      }`}
    >
      <button
        onClick={() => rotateWords(droppedItem!)}
        className="absolute w-6 h-6 z-10 border rounded bg-green-400 shadow"
      />
      {droppedItem && (
        <div className="font-bold text-black">
          <CloverTile
            id={droppedItem.id}
            slot={droppedItem.slot}
            words={droppedItem.words}
          />
        </div>
      )}
    </div>
  );
}
