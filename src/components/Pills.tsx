import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "./Button";

import { useEffect, useRef, useState } from "react";

export type PillsProps = {
  items: string[];
  selectedItem: string;
  onSelectItem: React.Dispatch<React.SetStateAction<string>>;
};

const TRANSLATE_DELTA = 200;

export function Pills({ items, selectedItem, onSelectItem }: PillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLeftVisible, setIsLeftVisible] = useState(false);

  const [isRightVisible, setIsRightVisible] = useState(false);

  const [translateOffset, setTranslateOffset] = useState(0);

  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;

      if (container == null) return;

      setIsLeftVisible(translateOffset > 0);

      setIsRightVisible(
        translateOffset + container.clientWidth < container.scrollWidth,
      );
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [items, translateOffset]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center overflow-x-hidden"
    >
      <div
        className="flex w-[max-content] transform gap-3 whitespace-nowrap transition-transform"
        style={{ transform: `translateX(-${translateOffset}px)` }}
      >
        {items.map((i) => (
          <Button
            key={i}
            variant={selectedItem === i ? "dark" : "default"}
            content="default"
            className="whitespace-nowrap rounded-lg px-3 py-1"
            onClick={() => onSelectItem(i)}
          >
            {i}
          </Button>
        ))}
      </div>
      {isLeftVisible && (
        <div className="absolute left-0 h-full w-24 bg-gradient-to-r from-white from-50% to-transparent">
          <Button
            variant="ghost"
            content="icon"
            className="aspect-square h-full w-auto py-1.5"
            onClick={() => {
              setTranslateOffset((t) => {
                const newTranslateOffset = t - TRANSLATE_DELTA;

                return newTranslateOffset <= 0 ? 0 : newTranslateOffset;
              });
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div className="absolute right-0 h-full w-24 bg-gradient-to-l from-white from-50% to-transparent">
          <Button
            variant="ghost"
            content="icon"
            className="ml-auto aspect-square h-full w-auto py-1.5"
            onClick={() => {
              setTranslateOffset((t) => {
                if (containerRef.current == null) return t;

                const newTranslate = t + TRANSLATE_DELTA;

                const edge = containerRef.current.scrollWidth;

                const width = containerRef.current.clientWidth;

                return newTranslate + width >= edge
                  ? edge - width
                  : newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
