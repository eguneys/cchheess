import * as ct from './types';
import * as p from './piece';
import * as d from './direction';
import * as db from './db';

export function fen(situation: ct.Situation): ct.Fen {
  return "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
}


export function board(fen: string): ct.Maybe<ct.Board> {

  let pieces: Map<ct.Pos, ct.Piece> = new Map()

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

    for (let j = 0; j < ranks[i].length; j++) {
      let file = i + 1;

      let c = ranks[i][j];
      let piece = db.piece(c);

      if (piece) {
        let pos = db.pos(file, rank);

        if (piece && pos) {
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

  return pieces;
  
}

export function space(c: string): ct.Maybe<number> {
  if (c.match(/[1-8]/)) {
    return parseInt(c);
  }
}
