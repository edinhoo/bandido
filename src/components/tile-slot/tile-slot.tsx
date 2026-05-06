import { Card, CardContent } from "@/components/ui/8bit/card";

import type { MatrixType } from "@/types";

type TileSlotProps = {
  matrix?: MatrixType;
  active?: boolean;
  valid?: boolean;
  onClick?: () => void;
};

export function TileSlot({ active, valid, onClick }: TileSlotProps) {
  const borderClass = valid
    ? "border-lime-500!"
    : active
      ? "border-white!"
      : "ring-muted border-transparent!";

  return (
    <Card
      className={`w-full py-0 bg-background cursor-pointer transition-colors ${borderClass}`}
      onClick={onClick}
    >
      <CardContent className="px-0">
        <div className="w-18 h-18 flex items-center justify-center text-secondary">
          <span className="text-4xl">?</span>
        </div>
      </CardContent>
    </Card>
  );
};
