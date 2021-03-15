import * as ct from '../types';
import { poss, pieces } from '../db';
import * as p from '../pos';
import * as pi from '../piece';

export function str(board: ct.Board): string {
  let res = [];
  let ranksAreEmpty = true;
  for (let rank of p.directions) {
    let rankS = "";
    for (let file of p.rdirections) {
      let pos = poss.pget(file, rank),
      piece = board.get(pos)
      if (piece) {
        rankS = pi.toFenStr(piece) + rankS;
      } else {
        rankS = ' ' + rankS;
      }
    }
    if (rankS === "        " && ranksAreEmpty) {
    } else {
      ranksAreEmpty = false;
      res.push(rankS.trimRight());
    }
  }

  return '\n' + res.reverse().join('\n') + '\n';
}

export function board(str: string): ct.Board {

  let board = new Map()

  let ranks = str.split('\n');

  for (let irank = 0; irank < ranks.length; irank++) {
    let rankS = ranks[irank];

    for (let ifile = 0; ifile < 8; ifile++) {

      let fC = rankS[ifile];

      if (fC) {
        let p = pieces.nget(fC, fC)

        if (p) {
          let pos = poss.nget(ifile + 1, 9 - irank)
          board.set(pos, p);
        }
      }
      
    }
  }

  return board;  
}


export function moves(moves: Array<ct.Move>): Array<string> {
  return moves.map(_ => p.dopKey(_.dest));
}
