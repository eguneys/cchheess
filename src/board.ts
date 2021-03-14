import * as ct from './types';
import * as p from './pos';
import * as pi from './piece';
import * as r from './role';
import * as db from './db';
import * as db2 from './db2';
import * as sz from './sanitizes';
import * as u from './util';

export const move = sz.sanitizedU(db.boards, u.seqable(_move));

export function fen(board: ct.Board): string {
  let res = [];
  for (let rank of p.directions.slice(0).reverse()) {
    let rankS = '';
    let space = 0;
    for (let file of p.directions) {
      let piece = board.get(db2.poss.pget(file, rank));
      if (piece) {
        if (space !== 0) {
          rankS += space;
          space = 0;
        }
        rankS += pi.toFenStr(piece);
      } else {
        space++;
      }
    }
    if (space !== 0) {
      rankS += space;
    }
    res.push(rankS);
  }
  return res.join('/');
}

function _move(board: ct.Board, pos: ct.Pos, to: ct.Pos): ct.Maybe<ct.Board> {
  let { actors } = db;

  if (!board.has(to)) {
    let p = board.get(pos)
    if (p) {
      let b2 = new Map([...board])

      b2.delete(pos);
      
      b2.set(to, p);

      for (let [pos, piece] of b2.entries()) {
        actors.get({pos, 
                    piece,
                    board: b2});
      };

      return b2;
    }
  }
}
