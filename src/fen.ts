import * as ct from './types';
import * as p from './piece';
import * as d from './direction';
import * as db from './db';
import * as sz from './sanitizes';;

export function fen(situation: ct.Situation): ct.Fen {
  return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
}

function make(): Map<ct.Pos, ct.Piece> {
  return new Map()
}

export function board(fen: string): ct.Maybe<ct.Board & sz.Sanitized> {

  let pieces = make()

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

  for (let i = 0; i < ranks.length; i++) {
    let rank = i + 1;
    let file = 1;
    for (let j = 0; j < ranks[i].length; j++) {
      let c = ranks[i][j];
      let piece = db.pieces.nget(c, c);

      if (piece) {
        let pos = db.poss.nget(file, rank);
        if (pos && piece) {
          pieces.set(pos, piece);
        }
        file += 1
      } else {
        let _s = space(c);
        if (_s) {
          file += _s
        }
      }
    }
  }

  let board = db.boards.get(pieces);

  for (let [pos, piece] of pieces.entries()) {
    db.actors.get({pos, 
                   piece,
                   board});
  };
  
  return board;  
}

export function space(c: string): ct.Maybe<number> {
  if (c.match(/[1-8]/)) {
    return parseInt(c);
  }
}
