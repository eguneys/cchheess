import * as ct from './types';
import * as ct2 from './types2';
import * as disp from './displace';
import * as v from './visual';
import * as b from './board';

export function actors(board: ct.Board, 
                       piece: ct.Piece,
                       pos: Partial<ct.Pos>): Array<ct2.Actor> {

  let res: Array<ct2.Actor> = [];

  for (let [_pos, _piece] of board.entries()) {
    if (_piece === piece && 
      _pos[0] === (pos[0] || _pos[0]) && 
      _pos[1] === (pos[1] || _pos[1]))

      res.push({
        pos: _pos,
        piece,
        board
      });
  }

  return res;
}

export function moves({ board, piece, pos }: ct2.Actor): Array<ct.Move> {

  return disp.displace(piece, pos).flatMap(route0 => {
    let moves: Array<ct.Move> = [];

    for (let i = 1; i < 2; i++) {
      let to = route0[i]

      if (board.get(to)) {
      } else {

        let after = b.move(board, pos, to)
        if (after) {
          let move = {
            piece,
            situationBefore: {
              board,
              turn: piece.color
            },
            after,
            orig: pos,
            dest: to,
            enpassant: false
          };

          moves.push(move);
        }
      }
    }
    return moves;
  });
}
