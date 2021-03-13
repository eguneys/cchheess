import { deepeq } from './util2';
import { it, jss, nacc, nac } from './util';

import * as ct from '../types';
import * as db from '../db';
import * as a from '../actor';
import * as f from '../fen';


export default function () {

  let initialBoard = f.board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') as ct.Board;

  it('makes moves', () => {

    let pos = db.poss.nget(2, 2) as ct.Pos;
    let piece = db.pieces.nget('P','P') as ct.Piece;

    let res = a.moves({
      board: initialBoard,
      piece,
      pos
    });

    nac('moves', !deepeq(res, []));
    
  });
  
}
