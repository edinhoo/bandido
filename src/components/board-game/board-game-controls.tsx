"use client";

import { useEffect, useState } from "react";

import { TileSlot } from "@/components/tile-slot";
import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Center8bitIcon, RotateCw8BitIcon } from "@/components/ui/icons";

import { TILES } from "@/data/tiles";

import type { MatrixType } from "@/types";
import { Tile } from "../tile";

const HAND_SIZE = 6;

function rotate90CW(matrix: MatrixType): MatrixType {
  const rows = matrix.length;
  const cols = matrix[0].length;

  return Array.from({ length: cols }, (_, i) =>
    Array.from({ length: rows }, (_, j) => matrix[rows - 1 - j][i])
  );
}

function drawHand(): MatrixType[] {
  const pool = [...TILES];
  const hand: MatrixType[] = [];

  for (let i = 0; i < HAND_SIZE && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);

    hand.push(pool[idx].matrix);
    pool.splice(idx, 1);
  }

  return hand;
}

export function BoardGameControls({ onCenter }: { onCenter?: () => void }) {
  const [matrices, setMatrices] = useState<MatrixType[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMatrices(drawHand()); }, []);

  const slots = matrices.length > 0
    ? matrices
    : (Array(HAND_SIZE).fill(null) as null[]);

  const handleTileClick = (i: number) => {
    setActiveIndex(prev => prev === i ? null : i);
  };

  const handleRotate = () => {
    if (activeIndex === null) return;
    setMatrices(prev =>
      prev.map((m, i) => i === activeIndex ? rotate90CW(m) : m)
    );
  };

  return (
    <Card className="bg-background py-0">
      <CardContent className="grid grid-cols-4 px-5.5 pt-4 pb-4 gap-x-5 gap-y-2">
        {slots.map((matrix, i) => matrix ? (
          <Tile
            key={i}
            matrix={matrix}
            active={activeIndex === i}
            onClick={() => handleTileClick(i)}
          />
        ) : (
          <TileSlot key={i} />
        ))}
        <div className="p-4 flex justify-center items-center">
          <Button
            className="w-fit aspect-square p-6!"
            disabled={activeIndex === null}
            onClick={handleRotate}
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
