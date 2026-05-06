"use client";

import { useRef } from "react";

import { BoardGameGrid } from "@/components/board-game";
import { BoardGameControls } from "./board-game-controls";

import type { CenterBoardGameHandleType } from "@/types";

export function BoardGame({ width, height }: { width: number; height: number }) {
  const gridRef = useRef<CenterBoardGameHandleType>(null);

  return (
    <>
      <div className="flex-1 min-h-0">
        <BoardGameGrid ref={gridRef} width={width} height={height} />
      </div>
      <div className="w-full shrink-0">
        <BoardGameControls onCenter={() => gridRef.current?.centerOnMain()} />
      </div>
    </>
  );
}
