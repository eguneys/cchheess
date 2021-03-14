import { deepeq } from './util2';
import { it, qed } from './util';

import * as ct from '../types';
import * as db2 from '../db2';
import { str2meta } from '../san';
import * as f from '../fen';
import * as m from '../move';
import * as a from '../actor';

export default function () {

  let situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  let e4 = str2meta('e4') as ct.SanMeta;
  let wP = { role: 'p', color: 'w' };

  it('actors', () => {

    let oneE4 = m.get(situation, e4);

    if (!oneE4) {
      return '! 1. e4';
    }

    qed('1. e4', oneE4.piece, wP);

    qed("b's turn", m.situationAfter(oneE4).turn, "b");
    
  });
  
}
