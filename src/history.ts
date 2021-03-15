import * as ct from './types';
import * as m from './move';
import * as u from './util';

export const branch = u.seqable(_branch);
export const add = u.seqable(_add);

export function first(position: ct.Situation, sanMeta: ct.SanMetaOrCastles): ct.Maybe<ct.History> {
  let move = m.move(position, sanMeta);
  if (move) {
    return [move];
  }
}

function _branch(history: ct.History, ply: ct.Ply, sanMeta: ct.SanMetaOrCastles): ct.Maybe<ct.History> {
  let lastMove = history[ply - 2];
  if (lastMove) {
    let move = m.move(m.situationAfter(lastMove), sanMeta);
    if (move) {
      return [
        move
      ];
    }
  }
}

function _add(history: ct.History, sanMeta: ct.SanMetaOrCastles): ct.Maybe<ct.History> {
  let lastMove = history[history.length - 1];
  let move = m.move(m.situationAfter(lastMove), sanMeta);
  if (move) {
    return [
      ...history,
      move
    ];
  }
}
