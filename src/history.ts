import * as ct from './types';
import * as m from './move';
import * as u from './util';


export function first(position: ct.Situation, sanMeta: ct.SanMeta): ct.Maybe<ct.History> {
  let move = m.move(position, sanMeta);
  if (move) {
    return [move];
  }
}

export function add(history: ct.History, sanMeta: ct.SanMeta): ct.Maybe<ct.History> {
  let lastMove = history[history.length - 1];
  let move = m.move(m.situationAfter(lastMove), sanMeta);
  if (move) {
    return [
      ...history,
      move
    ];
  }
}
