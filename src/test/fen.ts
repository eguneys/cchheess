import { deepeq } from './util2';
import { it, qed } from './util';

import * as ct from '../types';
import * as db2 from '../db2';
import * as f from '../fen';

export default function () {

  let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  let situation = f.situation(fen);
  let d1 = db2.poss.nget(4, 1) as ct.Pos;
  let wQ = { role: 'q', color: 'w' };
  let wP = { role: 'p', color: 'w' };

  it('fen', () => {

    let d1Q = situation.board.get(d1)
    qed('d1 Q', d1Q, wQ);

    qed('same fen', f.fen(situation), fen);
    
  });
  
}
