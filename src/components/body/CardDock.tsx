import CloverTile from "./CloverTile";
import { useDrop } from "react-dnd";
import { CardDockContext, type CardDockProps } from "../../CardDockContext";
import React from "react";

export default function CardDock({ slot }: { slot: number }) {
  const { cardDock, setCardDock } = React.useContext(CardDockContext);

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

          // clear previous only if slot changed
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
  const dropRefCast = dropRef as unknown as React.Ref<HTMLDivElement>;
  const droppedItem = cardDock.find((item) => item?.slot === slot);

  return (
    <div>
      <div
        ref={dropRefCast}
        className={`text-black relative w-[115px] h-[115px] flex items-center justify-center ${
          isOver ? "border-3 border-solid border-yellow-300" : ""
        }`}
      >
        <CloverTile
          id={droppedItem?.id}
          slot={droppedItem?.slot}
          words={droppedItem?.words}
        ></CloverTile>
      </div>
      <div className="pt-3">{`${
        slot === 10 ? "Extra card" : `Slot ${slot}`
      }`}</div>
    </div>
  );
}
