import * as ct from './types';
import * as b from './board';
import * as p from './piece';
import * as d from './direction';
import * as db2 from './db2';
import * as db from './db';
import * as sz from './sanitizes';;

let { pieces, poss } = db2;
let { actors, boards } = db;

export function fen(situation: ct.Situation): ct.Fen {
  let color = situation.turn;
  let rest = "KQkq - 0 1";
  return `${b.fen(situation.board)} ${color} ${rest}`;
}

export const situation = sz.sanitized(db.situations, _situation);

function _situation(fen: string): ct.Maybe<ct.Situation> {

  let _pieces = new Map()

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
    let rank = 8 - i;
    let file = 1;
    for (let j = 0; j < ranks[i].length; j++) {
      let c = ranks[i][j];
      let piece = pieces.nget(c, c);

      if (piece) {
        let pos = poss.nget(file, rank);
        if (pos && piece) {
          _pieces.set(pos, piece);
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

  let board = boards.get(_pieces);

  for (let [pos, piece] of _pieces.entries()) {
    actors.get({pos, 
                piece,
                board});
  };
  
  return {
    board,
    turn: colorS
  };
}

export function space(c: string): ct.Maybe<number> {
  if (c.match(/[1-8]/)) {
    return parseInt(c);
  }
}
