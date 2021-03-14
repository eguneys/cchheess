import * as ct from './types';
import * as p from './pos';
import * as pi from './piece';
import * as r from './role';
import * as u from './util';
import { poss } from './db';

export const move = u.seqable(_move);

export function fen(board: ct.Board): string {
  let res = [];
  for (let rank of p.directions.slice(0).reverse()) {
    let rankS = '';
    let space = 0;
    for (let file of p.directions) {
      let piece = board.get(poss.pget(file, rank));
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

  if (!board.has(to)) {
    let p = board.get(pos)
    if (p) {
      let b2 = new Map([...board])
      b2.delete(pos);
      b2.set(to, p);

      return b2;
    }
  }
}
