import * as ct from './types';
import { histories } from './db';
import * as mApi from './move';

export function first(position: ct.Situation, sanMeta: ct.SanMeta): ct.Maybe<ct.History> {
  let move = mApi.get(position, sanMeta);
  if (move) {
    return histories.get([move]);
  }
}

export function add(history: ct.History, sanMeta: ct.SanMeta): ct.Maybe<ct.History> {
  let lastMove = history[history.length - 1];
  let move = mApi.get(lastMove.situationBefore, sanMeta);
  if (move) {
    return histories.get([
      ...history,
      move
    ]);
  }
}
