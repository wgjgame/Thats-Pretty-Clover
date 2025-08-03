import CloverTile from "./CloverTile";
import { useDrop } from "react-dnd";
import { CardDockContext, type CardDockProps } from "../../CardDockContext";
import React, { useState } from "react";

export default function CardDock({ slot }: { slot: number }) {
  const { cardDock, setCardDock, selectedSlot, setSelectedSlot } =
    React.useContext(CardDockContext);

  const [hovered, setHovered] = useState(false);

  const droppedItem = cardDock.find((item) => item?.slot === slot);

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item: CardDockProps) => {
      if (item.slot == null) return;

      setCardDock((prevItems) => {
        const clonedItems = [...prevItems];

        const sourceIndex = clonedItems.findIndex((c) => c.slot === item.slot);
        const targetIndex = clonedItems.findIndex((c) => c.slot === slot);

        if (sourceIndex === -1 || targetIndex === -1) return prevItems;

        const sourceItem = clonedItems[sourceIndex];
        const targetItem = clonedItems[targetIndex];

        if (!sourceItem) return prevItems;

        if (targetItem?.words && sourceItem?.words) {
          clonedItems[targetIndex] = { ...sourceItem, slot };
          clonedItems[sourceIndex] = { ...targetItem, slot: item.slot };
        } else {
          clonedItems[targetIndex] = { ...sourceItem, slot };
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

  const containerRef = dropRef as unknown as React.Ref<HTMLDivElement>;

  return (
    <div>
      <div
        ref={containerRef}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`text-black relative w-[116px] h-[116px] flex items-center justify-center cursor-pointer
          ${
            selectedSlot === slot || isOver || (selectedSlot && hovered)
              ? "border-3 border-solid border-yellow-300"
              : ""
          }
        `}
      >
        <CloverTile
          id={droppedItem?.id}
          slot={droppedItem?.slot}
          words={droppedItem?.words}
        />
      </div>
      <div className="pt-3">{slot === 10 ? "Extra card" : `Slot ${slot}`}</div>
    </div>
  );
}
