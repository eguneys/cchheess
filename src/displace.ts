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

const pawnMove2 = {
  'w': sss.union(dt.DWPawn2, dt.DWPawn),
  'b': sss.union(dt.DBPawn2, dt.DBPawn)
}

const pawnMove = {
  'w': dt.DWPawn,
  'b': dt.DBPawn
}

const pawn2MoveRanks = {
  'w': 2,
  'b': 7
}

function dType(piece: ct.Piece, pos: ct.Pos): dt.Displace2 {
  if (piece.role === 'p') {
    let p2Rank = pawn2MoveRanks[piece.color];

    if (pos[1] === p2Rank) {
      return pawnMove2[piece.color];
    } else {
      return pawnMove[piece.color];
    }
  } else {
    return regulars[piece.role];
  }
}

export function get(piece: ct.Piece, pos: ct.Pos): Set<ct.Pos> {
  return dir.rrouteflat1(dType(piece, pos), pos);
}
