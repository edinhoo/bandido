"use client";

import { TileSlot } from "@/components/tile-slot";

import { Button } from "@/components/ui/8bit/button";
import { Card, CardContent } from "@/components/ui/8bit/card";
import { Center8bitIcon, RotateCw8BitIcon } from "@/components/ui/icons";

export function BoardGameControls({ onCenter }: { onCenter?: () => void }) {
  return (
    <Card className="bg-background">
      <CardContent className="grid grid-cols-4 gap-x-5 gap-y-2">
        {Array.from({ length: 6 }, (_, i) => <TileSlot key={i} />)}
        <div className="p-4 flex justify-center items-center">
          <Button className="w-fit aspect-square p-6!">
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
