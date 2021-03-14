import { it, qed } from './util';

import * as ct from '../types';
import { poss, pieces } from '../db';
import * as a from '../actor';
import * as f from '../fen';
import * as m from '../move';

export default function () {

  let initialSituation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') as ct.Situation;

  let { board, turn } = initialSituation;
  let b2 = poss.nget(2, 2) as ct.Pos;
  let wP = pieces.nget('P','P') as ct.Piece;


  it('makes moves', () => {


    let res = a.moves({
      board,
      piece: wP,
      pos: b2
    });

    qed('2 moves', res.length, 2);

    qed('b2b4 ...', res.map(m.str),
        ['b2b4', 'b2b3']);
    
  });

  it('makes actors', () => {
    let res = a.actors(board,wP,[] as Partial<ct.Pos>);

    qed('8 pawns', res.length, 8);

    res = a.actors(board,wP,[1,] as Partial<ct.Pos>);

    qed('1 pawn', res.length, 1);

  });
  
}
