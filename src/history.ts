import * as ct from './types';
import { histories } from './db';
import * as m from './move';
import * as db from './db';
import * as u from './util';
import * as db2 from './db2';
import * as sz from './sanitizes';

export function first(position: ct.Situation, sanMeta: ct.SanMeta): ct.Maybe<ct.History> {
  let move = m.get(position, sanMeta);
  if (move) {
    return histories.get([move]);
  }
}

export const add = sz.sanitizedU(db.histories, u.seqable(_add));

function _add(history: ct.History, sanMeta: ct.SanMeta): ct.Maybe<ct.History> {
  let lastMove = history[history.length - 1];
  let move = m.get(m.situationAfter(lastMove), sanMeta);
  if (move) {
    return histories.get([
      ...history,
      move
    ]);
  }
}
