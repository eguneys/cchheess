export type Maybe<A> = A | undefined

export interface Move {
  piece: Piece,
  situationBefore: Situation,
  after: Board,
  orig: Pos,
  dest: Pos,
  capture?: Pos,
  promotion?: Role,
  castle?: CastleMeta,
  enpassant?: Pos
}

export interface Situation {
  board: Board,
  turn: Color
}

export interface Piece {
  color: Color,
  role: Role,
}

export type Pos = [Direction, Direction] 

export type Board = Map<Pos, Piece>

export interface SanMeta {
  role: Role,
  file?: File,
  rank?: Rank,
  capture?: boolean,
  to: Pos,
  promotion?: Role,
  check?: boolean,
  mate?: boolean  
}

export type CastleMeta = {
  king: File,
  rook: File,
  trip: 1 | -1
}

export type SanMetaOrCastles = SanMeta | CastleMeta

export type Fen = string
export type San = string
export type San2 = string
export type Uci = string
export type Color = 'w' | 'b'
export type Role = 'r' | 'b' | 'n' | 'p' | 'q' | 'k'
export type File = Direction
export type Rank = Direction
export type Direction = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Ply = number
