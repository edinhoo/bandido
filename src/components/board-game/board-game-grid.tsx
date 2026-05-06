"use client";

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

import { Tile } from "@/components/tile";
import { TileSlot } from "@/components/tile-slot";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { ScrollArea, ScrollBar } from "@/components/ui/8bit/scroll-area";

import { MAIN_TILE } from "@/data/tiles";

import type { CenterBoardGameHandleType, MatrixType } from "@/types";

// --- helpers ---

function getEdge(matrix: MatrixType, side: 'top' | 'bottom' | 'left' | 'right'): number[] {
  if (side === 'top') return matrix[0];
  if (side === 'bottom') return matrix[matrix.length - 1];
  if (side === 'left') return matrix.map(row => row[0]);
  // right
  return matrix.map(row => row[row[0] !== undefined ? row.length - 1 : 0]);
}

function arraysEqual(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function computeValidSlots(
  placedTiles: Map<number, MatrixType>,
  activeTile: MatrixType,
  width: number,
  height: number,
): Set<number> {
  const valid = new Set<number>();

  for (const [idx] of placedTiles) {
    const row = Math.floor(idx / width);
    const col = idx % width;

    const neighbors = [
      { ni: row - 1, nj: col },
      { ni: row + 1, nj: col },
      { ni: row, nj: col - 1 },
      { ni: row, nj: col + 1 },
    ];

    for (const { ni, nj } of neighbors) {
      if (ni < 0 || ni >= height || nj < 0 || nj >= width) continue;
      const candidateIdx = ni * width + nj;
      if (placedTiles.has(candidateIdx)) continue;

      // Check all placed tiles adjacent to this candidate slot
      let allMatch = true;
      let hasPathConnection = false;

      const checks = [
        { di: -1, dj: 0, placedSide: 'bottom' as const, candidateSide: 'top' as const },
        { di: 1, dj: 0, placedSide: 'top' as const, candidateSide: 'bottom' as const },
        { di: 0, dj: -1, placedSide: 'right' as const, candidateSide: 'left' as const },
        { di: 0, dj: 1, placedSide: 'left' as const, candidateSide: 'right' as const },
      ];

      for (const { di, dj, placedSide, candidateSide } of checks) {
        const adjRow = ni + di;
        const adjCol = nj + dj;
        if (adjRow < 0 || adjRow >= height || adjCol < 0 || adjCol >= width) continue;
        const adjIdx = adjRow * width + adjCol;
        const adjMatrix = placedTiles.get(adjIdx);
        if (!adjMatrix) continue;

        const placedEdge = getEdge(adjMatrix, placedSide);
        const activeEdge = getEdge(activeTile, candidateSide);
        if (!arraysEqual(placedEdge, activeEdge)) {
          allMatch = false;
          break;
        }
        if (placedEdge.some(v => v === 1)) hasPathConnection = true;
      }

      if (allMatch && hasPathConnection) {
        valid.add(candidateIdx);
      }
    }
  }

  return valid;
}

// --- component ---

type BoardGameGridProps = {
  width?: number;
  height?: number;
  activeTile?: MatrixType | null;
  onTilePlaced?: () => void;
};

function BoardGameGridComponent(
  { width = 60, height = 60, activeTile, onTilePlaced }: BoardGameGridProps,
  ref: React.ForwardedRef<CenterBoardGameHandleType>
) {
  const containerRef = useRef<HTMLDivElement>(null);

  function centerOnMain() {
    const viewport = containerRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    const leftTile = containerRef.current?.querySelector<HTMLElement>('[data-main-tile-left]');
    const rightTile = containerRef.current?.querySelector<HTMLElement>('[data-main-tile-right]');

    if (!viewport || !leftTile || !rightTile) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const leftRect = leftTile.getBoundingClientRect();
    const rightRect = rightTile.getBoundingClientRect();
    const gapCenterX = (leftRect.right + rightRect.left) / 2;
    const tileCenterY = (leftRect.top + leftRect.bottom) / 2;

    viewport.scrollLeft = viewport.scrollLeft + gapCenterX - viewportRect.left - viewport.clientWidth / 2;
    viewport.scrollTop = viewport.scrollTop + tileCenterY - viewportRect.top - viewport.clientHeight / 2;
  }

  useImperativeHandle(ref, () => ({ centerOnMain }));

  useEffect(() => { centerOnMain(); }, []);

  const midRow = Math.floor(height / 2);
  const midColLeft = Math.floor(width / 2) - 1;
  const midColRight = Math.floor(width / 2);

  const leftIdx = midRow * width + midColLeft;
  const rightIdx = midRow * width + midColRight;

  const [placedTiles, setPlacedTiles] = useState<Map<number, MatrixType>>(
    () => new Map([[leftIdx, MAIN_TILE.matrix], [rightIdx, MAIN_TILE.matrix]])
  );

  const validSlots = useMemo(() => {
    if (!activeTile) return new Set<number>();
    return computeValidSlots(placedTiles, activeTile, width, height);
  }, [activeTile, placedTiles, width, height]);

  const handleSlotClick = (cellIndex: number) => {
    if (!activeTile || !validSlots.has(cellIndex)) return;
    setPlacedTiles(prev => new Map(prev).set(cellIndex, activeTile));
    onTilePlaced?.();
  };

  const getTileType = (index: number) => {
    const row = Math.floor(index / width);
    const col = index % width;

    if (row === midRow && col === midColLeft) return "main-left";
    if (row === midRow && col === midColRight) return "main-right";
    return "empty";
  };

  return (
    <Card className="h-full w-full py-0 bg-background">
      <CardContent className="h-full p-0">
        <div ref={containerRef} className="h-full w-full">
          <ScrollArea className="h-full w-full">
            <div
              className="grid w-max px-5.5 pt-4 pb-7.5 gap-x-5 gap-y-2"
              style={{
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows: `repeat(${height}, 1fr)`,
              }}
            >
              {Array.from(
                { length: width * height },
                (_, i) => {
                  const type = getTileType(i);

                  if (type === "main-left") {
                    return (
                      <div
                        key={i}
                        data-main-tile-left=""
                        className="w-full [&>button]:w-full [&>button]:block"
                      >
                        <Tile matrix={MAIN_TILE.matrix} />
                      </div>
                    );
                  }

                  if (type === "main-right") {
                    return (
                      <div
                        key={i}
                        data-main-tile-right=""
                        className="w-full [&>button]:w-full [&>button]:block"
                      >
                        <Tile matrix={MAIN_TILE.matrix} />
                      </div>
                    );
                  }

                  if (placedTiles.has(i)) {
                    return (
                      <div key={i} className="w-full [&>button]:w-full [&>button]:block">
                        <Tile matrix={placedTiles.get(i)!} />
                      </div>
                    );
                  }

                  if (validSlots.has(i)) {
                    return <TileSlot key={i} valid onClick={() => handleSlotClick(i)} />;
                  }

                  return <TileSlot key={i} />;
                }
              )}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

export const BoardGameGrid = forwardRef(BoardGameGridComponent);

BoardGameGrid.displayName = 'BoardGameGrid';
