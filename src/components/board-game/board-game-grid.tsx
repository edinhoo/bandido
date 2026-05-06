"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import { Tile } from "@/components/tile";
import { TileSlot } from "@/components/tile-slot";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { ScrollArea, ScrollBar } from "@/components/ui/8bit/scroll-area";

import { MAIN_TILE } from "@/data/tiles";

import type { CenterBoardGameHandleType } from "@/types";

function BoardGameGridComponent(
  { width = 60, height = 60 }: { width?: number; height?: number },
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

  useEffect(() => { centerOnMain() }, []);

  const midRow = Math.floor(height / 2);
  const midColLeft = Math.floor(width / 2) - 1;
  const midColRight = Math.floor(width / 2);

  const getTileType = (index: number) => {
    const row = Math.floor(index / width);
    const col = index % width;

    if (row === midRow && col === midColLeft) {
      return "main-left";
    }

    if (row === midRow && col === midColRight) {
      return "main-right";
    }

    return "empty";
  }

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
