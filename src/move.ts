import * as ct from './types';
import * as db from './db';
import * as db2 from './db2';
import * as sz from './sanitizes';
import * as b from './board';
import * as r from './role';
import * as p from './pos';

export function get(before: ct.Situation, sanMeta: ct.SanMeta): ct.Maybe<ct.Move> {
  let { poss, pieces, actorMoves }  = db2;
  let { actors } = db;

  let _actors = actors.query({
    pos: poss.query([sanMeta.file || "*", sanMeta.rank || "*"]),
    piece: pieces.query({
      role: sanMeta.role,
      color: before.turn
    }),
    board: before.board
  });

  return actorMoves.querz(_actors, "*")
    .flatMap(([actor, moves]) => {
      let move = moves.find(move => 
        move.dest === sanMeta.to);

      if (move) {
        return [move];
      } else {
        return [];
      }
    })[0];
}

export const situationAfter = sz.sanitized(db.situations, _situationAfter);

export function _situationAfter(move: ct.Move): ct.Situation {
  return {
    board: move.after,
    turn: r.otherColor(move.piece.color)
  }
}
