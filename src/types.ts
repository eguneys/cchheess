export type Maybe<A> = A | undefined

export type Line = 
  | FenLine
  | MoveLine

export type FenLine = Situation

export interface MoveLine {
  parent: Line,
  history: History
}

export function isFenLine(_: Line): _ is FenLine {
  return !(isMoveLine(_));
}

export function isMoveLine(_: Line): _ is MoveLine {
  return ((_ as MoveLine).parent !== undefined);
}

export type History = Array<MoveWithPly>

export interface MoveWithPly {
  move: Move,
  ply: Ply
}

export interface Move {
  before: Situation,
  after: Situation,
  sanMeta: SanMeta
}

export interface Situation {
  board: Board,
  turn: Color
}

export interface Piece {
  color: Color,
  role: Role,
}

export interface Pos {
  file: File,
  rank: Rank
}

export type Board = Map<Pos, Piece>

export type Fen = string
export type San = string
export type SanMeta = string
export type Uci = string
export type Color = 'w' | 'b'
export type Role = 'r' | 'b' | 'n' | 'p' | 'q' | 'k'
export type File = Direction
export type Rank = Direction
export type Direction = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Ply = number
