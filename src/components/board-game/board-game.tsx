"use client";

import { useEffect, useRef } from "react";

import { Tile } from "@/components/tile";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { ScrollArea, ScrollBar } from "@/components/ui/8bit/scroll-area";

import { MAIN_TILE } from "@/data/tiles";

export function BoardGame({ width = 60, height = 60 }: { width?: number; height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = containerRef.current?.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]'
    );
    const leftTile = containerRef.current?.querySelector<HTMLElement>('[data-main-tile-left]')
    const rightTile = containerRef.current?.querySelector<HTMLElement>('[data-main-tile-right]')

    if (!viewport || !leftTile || !rightTile) {
      return
    }

    const viewportRect = viewport.getBoundingClientRect();
    const leftRect = leftTile.getBoundingClientRect();
    const rightRect = rightTile.getBoundingClientRect();
    const gapCenterX = (leftRect.right + rightRect.left) / 2;
    const tileCenterY = (leftRect.top + leftRect.bottom) / 2;

    viewport.scrollLeft = viewport.scrollLeft + gapCenterX - viewportRect.left - viewport.clientWidth / 2;
    viewport.scrollTop = viewport.scrollTop + tileCenterY - viewportRect.top - viewport.clientHeight / 2;
  }, []);

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
              {Array.from({ length: width * height }, (_, i) => {
                const type = getTileType(i);
                if (type === "main-left") return (
                  <div key={i} data-main-tile-left="">
                    <Tile matrix={MAIN_TILE.matrix} />
                  </div>
                );
                if (type === "main-right") return (
                  <div key={i} data-main-tile-right="">
                    <Tile matrix={MAIN_TILE.matrix} />
                  </div>
                );
                return (
                  <Card
                    key={i}
                    className="w-full py-0 border-transparent! ring-muted bg-background snap-center"
                  >
                    <CardContent className="px-0 ">
                      <div className="w-18 h-18 flex items-center justify-center text-secondary">
                        {i + 1}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
