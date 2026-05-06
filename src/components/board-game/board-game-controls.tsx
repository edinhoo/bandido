"use client";

import { TileSlot } from "@/components/tile-slot";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Center8bitIcon, RotateCw8BitIcon } from "@/components/ui/icons";

import type { MatrixType } from "@/types";
import { Tile } from "../tile";

type BoardGameControlsProps = {
  tiles: (MatrixType | null)[];
  activeIndex: number | null;
  onActiveChange: (i: number | null) => void;
  onRotate: () => void;
  onCenter?: () => void;
};

export function BoardGameControls({
  tiles,
  activeIndex,
  onActiveChange,
  onRotate,
  onCenter,
}: BoardGameControlsProps) {
  return (
    <Card className="bg-background py-0">
      <CardContent className="grid grid-cols-4 px-5.5 pt-4 pb-7.5 gap-x-5 gap-y-2">
        {tiles.map((matrix, i) => matrix ? (
          <Tile
            key={i}
            matrix={matrix}
            active={activeIndex === i}
            onClick={() => onActiveChange(activeIndex === i ? null : i)}
          />
        ) : (
          <TileSlot key={i} />
        ))}
        <div className="p-4 flex justify-center items-center">
          <Button
            className="w-fit aspect-square p-6!"
            disabled={activeIndex === null}
            onClick={onRotate}
          >
            <RotateCw8BitIcon className="w-6! h-6!" />
          </Button>
        </div>
        <div className="p-4 flex justify-center items-center">
          <Button className="w-fit aspect-square p-6!" onClick={onCenter}>
            <Center8bitIcon className="w-6! h-6!" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
