import { deepeq } from './util2';
import { it, qed } from './util';

import * as ct from '../types';
import * as db2 from '../db2';
import { str2meta } from '../san';
import * as f from '../fen';
import * as h from '../history';
import * as m from '../move';

export default function () {

  let situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  let e4 = str2meta('e4') as ct.SanMeta;
  let e5 = str2meta('e5') as ct.SanMeta;
  let a6 = str2meta('a6') as ct.SanMeta;
  let wP = { role: 'p', color: 'w' };

  it('history', () => {

    let first = h.first(situation, e4);

    if (!first) {
      return '! 1. e4';
    }

    qed('1 move', first.length, 1);

    qed('1. e4', 
        f.fen(m.situationAfter(first[0])),
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');

    let twoA6 = h.add(first, a6);

    if (!twoA6) {
      return '! 2. a6';
    }

    qed('2 move', twoA6.length, 2);

    qed('1. e4 a6',
        f.fen(m.situationAfter(twoA6[1])),
        'rnbqkbnr/1ppppppp/p7/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1');

    let threeE5 = h.add(twoA6, e5);

    if (!threeE5) {
      return '! 2. a6';
    }

    qed('2 move', threeE5.length, 3);

    qed('1. e4 a6 2. e5',
        f.fen(m.situationAfter(threeE5[2])),
        'rnbqkbnr/1ppppppp/p7/4P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
    
  });

  it.only('makes moves', () => {

    let seed: ct.Maybe<ct.History> = undefined;
    
    let hfinal = 'e4 a5 Nf3 Nf6 g3 g6 e5 a4'.split(' ')
      .map(_ => str2meta(_) as ct.SanMeta).reduce((acc: ct.Maybe<ct.History>, _) => {
        if (!acc) {
          return h.first(situation, _);
        } else {
          return h.add(acc, _);
        }
      }, seed);

    if (!hfinal) {
      return '! no history';
    }
    qed('8 moves', hfinal.length, 8);

    qed('correct ',
        f.fen(m.situationAfter(hfinal[7])),
        'rnbqkb1r/1ppppp1p/5np1/4P3/p7/5NP1/PPPP1P1P/RNBQKB1R w KQkq - 0 1');

  });
  
}
