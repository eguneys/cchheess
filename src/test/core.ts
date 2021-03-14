import { it, jss, nac, nacc, qed, cry } from './util';
import { deepeq } from './util2';
import * as f from '../fen';
import * as ct from '../types';
import * as s from '../san';
import * as db2 from '../db2';

let { poss } = db2;

export default function() {

  it('validates san', () => {
    nac('Nf6', s.str2meta('Nf6'));

    nac('e4', s.str2meta('e4'));
  });


  it('finds positions', () => {
    
    nac('1 1', deepeq(poss.nget(1, 1), [1,1]))
    nac('1 8', deepeq(poss.nget(1, 8), [1,8]))
    nac('1 10', deepeq(poss.nget(1, 10), undefined))

  });

  it('creates board', () => {
    const situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

    if (!situation) {
      return '! situation';
    }
    let { board } = situation;

    nacc('32 pieces', board.size, 32);
    qed('w p at 2 2',
        board.get(poss.nget(2, 2) || {} as ct.Pos),
        { role: 'p', color: 'w' });

  });

  // console.log(s.san2meta('Nbe4+'));
}
