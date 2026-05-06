import { Card, CardContent } from "@/components/ui/8bit/card";

import { cn } from "@/lib/utils";

import type { MatrixType } from "@/types";

export function Tile({ matrix }: { matrix: MatrixType }) {
  const cols = matrix[0]?.length ?? 0;

  return (
    <Card className="w-full py-0">
      <CardContent
        className="grid px-0"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr` }}
      >
        {matrix.flat().map((cell, index) => (
          <div
            key={index}
            className={cn('w-full aspect-square', cell === 1 ? 'bg-lime-500' : 'bg-black')}
          />
        ))}
      </CardContent>
    </Card>
  )
};
