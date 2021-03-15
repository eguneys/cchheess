import * as ct from './types';

export interface Actor {
  pos: ct.Pos,
  piece: ct.Piece,
  promotion?: ct.Role,
  board: ct.Board
}
