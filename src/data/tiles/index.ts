
import { TileType } from "@/types";

export const TILE_01: TileType = {
  id: 'card-01',
  matrix: [
    [0, 0, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

export const TILE_02: TileType = {
  id: 'card-02',
  matrix: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

export const TILE_03: TileType = {
  id: 'card-03',
  matrix: [
    [0, 0, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
};

export const TILE_04: TileType = {
  id: 'card-04',
  matrix: [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 0],
  ],
};

export const TILE_05: TileType = {
  id: 'card-05',
  matrix: [
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
};

export const TILE_06: TileType = {
  id: 'card-06',
  matrix: [
    [0, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
};

export const TILE_07: TileType = {
  id: 'card-07',
  matrix: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

export const TILE_08: TileType = {
  id: 'card-08',
  matrix: [
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
  ],
};

export const TILE_09: TileType = {
  id: 'card-08',
  matrix: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

export const TILE_10: TileType = {
  id: 'card-08',
  matrix: [
    [0, 1, 0],
    [0, 1, 1],
    [0, 1, 0],
  ],
};

export const TILE_11: TileType = {
  id: 'card-08',
  matrix: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ],
};

export const TILES: TileType[] = [
  ...Array.from({ length: 21 }, (_, i) => ({ ...TILE_01, id: `${TILE_01.id}-${i}` })),
  ...Array.from({ length: 19 }, (_, i) => ({ ...TILE_02, id: `${TILE_02.id}-${i}` })),
  ...Array.from({ length: 7 }, (_, i) => ({ ...TILE_03, id: `${TILE_03.id}-${i}` })),
  ...Array.from({ length: 15 }, (_, i) => ({ ...TILE_04, id: `${TILE_04.id}-${i}` })),
  ...Array.from({ length: 12 }, (_, i) => ({ ...TILE_05, id: `${TILE_05.id}-${i}` })),
  ...Array.from({ length: 4 }, (_, i) => ({ ...TILE_06, id: `${TILE_06.id}-${i}` })),
  ...Array.from({ length: 13 }, (_, i) => ({ ...TILE_07, id: `${TILE_07.id}-${i}` })),
  ...Array.from({ length: 5 }, (_, i) => ({ ...TILE_08, id: `${TILE_08.id}-${i}` })),
  ...Array.from({ length: 21 }, (_, i) => ({ ...TILE_09, id: `${TILE_09.id}-${i}` })),
  ...Array.from({ length: 12 }, (_, i) => ({ ...TILE_10, id: `${TILE_10.id}-${i}` })),
  ...Array.from({ length: 11 }, (_, i) => ({ ...TILE_11, id: `${TILE_11.id}-${i}` })),
]
