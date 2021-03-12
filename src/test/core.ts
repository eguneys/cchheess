import { it, jss, nac, nacc, cry } from './util';
import * as f from '../fen';
import * as ct from '../types';
import * as s from '../san';

export default function() {

  it('validates san', () => {
    nac('Nf6', s.isSanMeta(s.str2meta('Nf6')||''));
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
