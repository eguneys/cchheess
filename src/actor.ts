import * as db from './db';
import * as ct from './types';
import * as ct2 from './types2';
import * as m from './move';

export function moves({ board, piece, pos }: ct2.Actor): Array<ct.Move> {
  let situationBefore = db.situations.get({
    board,
    turn: piece.color
  });

  // piece -> directions
  // directions - pos -> routes
  // routes - board -> moves
  return [];

}
