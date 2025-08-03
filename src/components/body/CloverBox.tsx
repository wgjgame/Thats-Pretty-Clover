import { useDrop } from "react-dnd";
import CloverTile from "./CloverTile";
import { CardDockContext, type CardDockProps } from "../../CardDockContext";
import React, { useState } from "react";

export default function CloverBox({ slot }: { slot: number }) {
  const { cardDock, setCardDock, selectedSlot, setSelectedSlot } =
    React.useContext(CardDockContext);

  const [hovered, setHovered] = useState(false);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item: CardDockProps) => {
      if (item.slot == null) return; // early exit

      setCardDock((prevItems) => {
        const clonedItems = [...prevItems];

        const sourceIndex = item.slot - 1;
        const targetIndex = slot - 1;

        const sourceItem = clonedItems[sourceIndex];
        const targetItem = clonedItems[targetIndex];

        if (!sourceItem) return prevItems;

        if (targetItem?.words && sourceItem?.words) {
          // swap
          clonedItems[targetIndex] = { ...sourceItem, slot };
          clonedItems[sourceIndex] = { ...targetItem, slot: item.slot };
        } else {
          // move item, and clear original
          clonedItems[targetIndex] = { ...item, slot };

          if (item.slot !== slot) {
            clonedItems[sourceIndex] = {
              ...clonedItems[sourceIndex],
              words: undefined,
            };
          }
        }

        return clonedItems;
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  function handleClick() {
    if (selectedSlot === null) {
      const droppedItem = cardDock.find((item) => item.slot === slot);
      if (!droppedItem?.words) return;
      setSelectedSlot(slot);
      return;
    }

    if (selectedSlot === slot) {
      setSelectedSlot(null);
      return;
    }

    setCardDock((prevItems) => {
      const cloned = [...prevItems];
      const sourceIndex = cloned.findIndex((c) => c.slot === selectedSlot);
      const targetIndex = cloned.findIndex((c) => c.slot === slot);

      if (sourceIndex === -1 || targetIndex === -1) return prevItems;

      const sourceWords = cloned[sourceIndex].words;
      const targetWords = cloned[targetIndex].words;

      cloned[sourceIndex] = { ...cloned[sourceIndex], words: targetWords };
      cloned[targetIndex] = { ...cloned[targetIndex], words: sourceWords };

      return cloned;
    });

    setSelectedSlot(null);
  }

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
  const droppedItem = cardDock.find((item) => item.slot === slot);

  return (
    <div
      ref={dropRefCast}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative m-[2.5px] w-[115px] h-[115px] flex items-center justify-center cursor-pointer ${
        selectedSlot === slot || isOver || (selectedSlot && hovered)
          ? "border-3 border-solid border-yellow-300"
          : ""
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          rotateWords(droppedItem!);
        }}
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
