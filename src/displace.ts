import * as sss from './sss';
import * as ct from './types';
import * as dir from './direction';
import * as dt from './dtypes';

let regulars = {
  'n': dt.DKnight,
  'r': dt.DRook,
  'b': dt.DBishop,
  'q': dt.DQueen,
  'k': dt.DKing
};

let pawns = {
  'w': dt.DWPawn,
  'b': dt.DBPawn,
};

const regularProjection = {
  'p': 1,
  'n': 1,
  'r': 8,
  'b': 8,
  'q': 8,
  'k': 1
}

const pawn2MoveRanks = {
  'w': 2,
  'b': 7
}

const pawnPromoteRanks = {
  'w': 8,
  'b': 1
}

export function promotes(to: ct.Pos, piece: ct.Piece): boolean {
  return piece.role === 'p' &&
    to[1] === pawnPromoteRanks[piece.color];
}

export type Projection = number;

export function route1(pos: ct.Pos, piece: ct.Piece): dir.Route1<ct.Pos> {
  if (piece.role === 'p') {
    return dir.rroute2(pawns[piece.color], pos);
  }
  return dir.rroute2(regulars[piece.role], pos);
}

export function projection(pos: ct.Pos, piece: ct.Piece): Projection {
  if (piece.role === 'p') {
    if (pawn2MoveRanks[piece.color] === pos[1]) {
      return 2;
    }
  }
  return regularProjection[piece.role];
}

export function displace(a: ct.Direction, b: ct.Direction): dt.Displace0 {
  return (a - b) as dt.Displace0;
}

export function opposite(a: dt.Displace0): dt.Displace0 {
  return a * -1 as dt.Displace0;
}
