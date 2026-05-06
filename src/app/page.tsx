import { BoardGame } from "@/components/board-game";

import { TILES } from "@/data/tiles";

export default function Home() {
  const grid = Math.ceil((TILES.length + 2) / 2);

  return (
    <main className="h-screen overflow-hidden p-6">
      <BoardGame width={grid} height={grid} />
    </main>
  )
};
