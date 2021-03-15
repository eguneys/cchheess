import * as ct from './types';
import * as ct2 from './types2';
import * as dir from './direction';
import * as disp from './displace';
import * as v from './visual';
import * as b from './board';
import * as r from './role';
import * as side from './side';
import { poss, pieces } from './db';

export function castles(board: ct.Board, turn: ct.Color, castle: ct.CastleMeta): ct.Maybe<ct.Move> {

  let situationBefore = {
    board,
    turn
  };

  let king = pieces.pget(turn, 'k');
  let rook = pieces.pget(turn, 'r');

  let origKingPos = b.posOf(board, king);

  if (!origKingPos) {
    return;
  }
  let destKingPos = poss.pget(castle.king, origKingPos[1]);

  let rookTrip = 
    dir.rroute0(
      castle.trip,
      origKingPos[0]);

  let origRookPos = b.firstPosForPieceOnRoute(board, rook, origKingPos, rookTrip)
  
  if (!origRookPos) {
    return;
  }

  let destRookPos = poss.pget(castle.rook, origRookPos[1]);

  let after = b.castle(board, origKingPos, destKingPos, origRookPos, destRookPos);

  if (!after) {
    return;
  }

  return {
    piece: king,
    situationBefore,
    after,
    castle: side.ShortCastle,
    orig: origKingPos,
    dest: destKingPos,
  };

}

export function actors(board: ct.Board, 
                       piece: ct.Piece,
                       pos: Partial<ct.Pos>,
                       promotion?: ct.Role): Array<ct2.Actor> {

  let res: Array<ct2.Actor> = [];

  for (let [_pos, _piece] of board.entries()) {
    if (_piece === piece && 
      _pos[0] === (pos[0] || _pos[0]) && 
      _pos[1] === (pos[1] || _pos[1]))

      res.push({
        pos: _pos,
        piece,
        board,
        promotion
      });
  }

  return res;
}

export function moves({ board, piece, pos }: ct2.Actor): Array<ct.Move> {

  let situationBefore = {
    board,
    turn: piece.color
  };

  let projection = disp.projection(pos, piece);

  return disp.route1(pos, piece).flatMap(route0 => {
    let moves: Array<ct.Move> = [];


    for (let i = 1; i < projection + 1; i++) {
      let to = route0[i]

      if (!to) {
        continue;
      }

      if (board.get(to)) {
      } else {
        if (disp.promotes(to, piece)) {
          r.promotables.forEach(role => {
            let b1 = b.move(board, pos, to),
            after = b.promote(b1, to, role);

            if (after) {
              moves.push({
                piece,
                situationBefore,
                after,
                orig: pos,
                dest: to,
                promotion: role
              });
            }
          });
        } else {
          let after = b.move(board, pos, to)
          if (after) {
            moves.push({
              piece,
              situationBefore,
              after,
              orig: pos,
              dest: to
            });
          }
        }
      }
    }
    return moves;
  });
}
