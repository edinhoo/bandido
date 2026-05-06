import { Card, CardContent } from "@/components/ui/8bit/card";

import { cn } from "@/lib/utils";

import type { MatrixType } from "@/types";

export function Tile({ matrix, active = false, onClick }: {
  matrix: MatrixType;
  active?: boolean;
  onClick?: () => void;
}) {
  const cols = matrix[0]?.length ?? 0;

  return (
    <button onClick={onClick}>
      <Card className={cn('w-full py-0', active && 'border-primary!')}>
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
    </button>
  )
};
