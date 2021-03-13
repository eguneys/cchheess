import { it, jss, nac, nacc, cry } from './util';
import { deepeq } from './util2';
import * as f from '../fen';
import * as ct from '../types';
import * as s from '../san';
import * as db from '../db';

export default function() {

  it('validates san', () => {
    nac('Nf6', s.str2meta('Nf6'));

    nac('e4', s.str2meta('e4'));
  });


  it('finds positions', () => {

    let { poss } = db;
    
    nac('1 1', deepeq(poss.nget(1, 1), [1,1]))
    nac('1 8', deepeq(poss.nget(1, 8), [1,8]))
    nac('1 10', deepeq(poss.nget(1, 10), undefined))

  });

  it('creates board', () => {
    const board = f.board('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

    if (!board) {
      return '! board';
    }

    nacc('32 pieces', board.size, 32);
    // console.log(b.piece(board, db.pos('e4')));

  });

  // console.log(s.san2meta('Nbe4+'));
}
