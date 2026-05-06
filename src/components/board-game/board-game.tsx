"use client";

import { useEffect, useRef, useState } from "react";

import { BoardGameGrid } from "@/components/board-game";
import { BoardGameControls } from "./board-game-controls";

import { TILES } from "@/data/tiles";

import type { CenterBoardGameHandleType, MatrixType } from "@/types";

const HAND_SIZE = 6;

function rotate90CW(matrix: MatrixType): MatrixType {
  const rows = matrix.length;
  const cols = matrix[0].length;

  return Array.from({ length: cols }, (_, i) =>
    Array.from({ length: rows }, (_, j) => matrix[rows - 1 - j][i])
  );
}

export function BoardGame({ width, height }: { width: number; height: number }) {
  const gridRef = useRef<CenterBoardGameHandleType>(null);

  const [hand, setHand] = useState<(MatrixType | null)[]>(Array(HAND_SIZE).fill(null));
  const [pool, setPool] = useState<MatrixType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const shuffled = [...TILES].sort(() => Math.random() - 0.5);
    const initialHand = shuffled.slice(0, HAND_SIZE).map(t => t.matrix);
    const initialPool = shuffled.slice(HAND_SIZE).map(t => t.matrix);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHand(initialHand);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPool(initialPool);
  }, []);

  const handleActiveChange = (i: number | null) => {
    setActiveIndex(prev => (prev === i ? null : i));
  };

  const handleRotate = () => {
    if (activeIndex === null) return;
    setHand(prev =>
      prev.map((m, i) => (i === activeIndex && m ? rotate90CW(m) : m))
    );
  };

  const handleTilePlaced = () => {
    if (activeIndex === null) return;

    setHand(prev => {
      const next = [...prev];
      next[activeIndex] = pool.length > 0 ? pool[0] : null;
      return next;
    });

    setPool(prev => prev.slice(1));
    setActiveIndex(null);
  };

  const activeTile = activeIndex !== null && hand[activeIndex] ? hand[activeIndex] : null;

  return (
    <>
      <div className="flex-1 min-h-0">
        <BoardGameGrid
          ref={gridRef}
          width={width}
          height={height}
          activeTile={activeTile}
          onTilePlaced={handleTilePlaced}
        />
      </div>
      <div className="w-full shrink-0">
        <BoardGameControls
          tiles={hand}
          activeIndex={activeIndex}
          onActiveChange={handleActiveChange}
          onRotate={handleRotate}
          onCenter={() => gridRef.current?.centerOnMain()}
        />
      </div>
    </>
  );
}
