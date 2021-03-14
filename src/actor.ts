import * as db from './db';
import * as ct from './types';
import * as ct2 from './types2';
import * as m from './move';
import * as b from './board';
import * as u from './util';
import * as p from './pos';
import * as sz from './sanitizes';
import * as disp from './displace';

export function moves({ board, piece, pos }: ct2.Actor): Array<ct.Move> {
  let situationBefore = db.situations.get({
    board,
    turn: piece.color
  });

  let displaces = disp.get(piece, pos);
  let res: Array<ct.Move> = [];
  for (let to of displaces) {
    let b1 = board as ct.Board & sz.Sanitized,
    b3 = b.move(b1, pos, to);
    if (b3) {
      let m = {
        piece,
        situationBefore,
        after: b3,
        orig: pos,
        dest: to,
        enpassant: false
      };

      res.push(m);
    }
  }

  // });
  // let routes = db.routes.queryz(dirs, pos);
  // let moves = db.moves.queryz(routes, board);
  
  // piece -> directions
  // directions - pos -> routes
  // routes - board -> moves
  return res;

}
