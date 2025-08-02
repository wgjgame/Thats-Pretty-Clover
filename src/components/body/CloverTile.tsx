import { useDrag } from "react-dnd";

type CloverTileProps = {
  id?: number;
  slot?: number;
  words?: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
};

export default function CloverTile({ id, slot, words }: CloverTileProps) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "CARD",
      item: () => ({ id, slot, words }),
      collect: (monitor) => {
        const isDragging = monitor.isDragging();
        return { isDragging };
      },
    }),
    [id, slot, words]
  );

  const dragRefCast = dragRef as unknown as React.Ref<HTMLDivElement>;

  return (
    words && (
      <div
        ref={dragRefCast}
        className={`relative w-[110px] h-[110px] rounded`}
        style={{
          zIndex: isDragging ? 1 : 0,
          opacity: isDragging ? 0.5 : 1,
          cursor: "grab",
          borderRadius: "10px",
          background:
            "linear-gradient(45deg, #ffeb13ef, #99fd56ff, #f1ffc6d9, #9bffc6d9)",
        }}
      >
        <div className="absolute top-[5px] left-1/2 -translate-x-1/2 text-sm">
          {words?.top}
        </div>
        <div className="absolute right-[-30px] top-1/2 -translate-y-1/2 text-sm w-[90px] rotate-[90deg]">
          {words?.right}
        </div>
        <div className="absolute bottom-[-0px] left-1/2 -translate-x-1/2 h-[25px] text-sm">
          {words?.bottom}
        </div>
        <div className="absolute left-[-30px] top-1/2 -translate-y-1/2 w-[90px] text-sm rotate-[270deg]">
          {words?.left}
        </div>
      </div>
    )
  );
}
