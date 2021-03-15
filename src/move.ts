import * as ct from './types';
import * as r from './role';
import * as p from './pos';
import * as side from './side';
import { pieces } from './db';
import { actors, moves, castles } from './actor';

export function move(before: ct.Situation, sanMeta: ct.SanMetaOrCastles): ct.Maybe<ct.Move> {
  if (side.isCastles(sanMeta)) {
    return castles(before.board, before.turn, sanMeta);
  } else {
    return _move(before, sanMeta);
  }
}

function _move(before: ct.Situation, sanMeta: ct.SanMeta): ct.Maybe<ct.Move> {

  let _actors = actors(before.board, 
                       pieces.pget(before.turn, sanMeta.role),
                       [sanMeta.file, sanMeta.rank],
                       sanMeta.promotion);

  return _actors.flatMap(actor =>
    moves(actor)
      .filter(_ => _.dest === sanMeta.to))[0];
}

export function situationAfter(move: ct.Move): ct.Situation {
  return {
    board: move.after,
    turn: r.otherColor(move.piece.color)
  }
}

export function str(move: ct.Move): string {
  return p.key(move.orig) + p.key(move.dest);
}
