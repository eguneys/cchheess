import * as ct from './types';

export function fenMeta(fen: ct.Fen): ct.Maybe<ct.FenMeta> {
  let [ranksS, colorS] = fen.split(' ');

  if (!ranksS || !colorS) {
    return;
  }

  if (colorS !== "w" && colorS !== "b") {
    return;
  }

  let ranks = ranksS.split('/');

  if (ranks.length !== 8) {
    return;
  }

  return {
    fen,
    ranks,
    turn: colorS
  }
}
