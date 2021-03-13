import * as ct from './types';
import * as db from './db';
import * as b from './board';

export function get(before: ct.Situation, sanMeta: ct.SanMeta): ct.Maybe<ct.Move> {

  let actors = db.actors.query({
    pos: db.poss.query([sanMeta.file || "*", sanMeta.rank || "*"]),
    piece: db.pieces.query({
      role: sanMeta.role,
      color: before.turn
    }),
    board: before.board
  });

  return db.actorMoves.querz(actors, "*")
    .map(_ => _[1][0])[0];
}
