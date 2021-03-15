import { deepeq } from './util2';
import { it, qed } from './util';

import * as ct from '../types';
import { str2meta } from '../san';
import * as f from '../fen';
import * as m from '../move';
import * as a from '../actor';
import * as side from '../side';
import { poss, pieces } from '../db';

export default function () {

  let situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') as ct.Situation;
  let e4Move = str2meta('e4') as ct.SanMeta;
  let shortCastles = str2meta('o-o') as ct.CastleMeta;
  let longCastles = str2meta('o-o-o') as ct.CastleMeta;
  let wP = pieces.nget('P', 'P');
  let wK = pieces.nget('K', 'K');
  let wR = pieces.nget('R', 'R');
  let f1 = poss.nget(6, 1) as ct.Pos;
  let g1 = poss.nget(7, 1) as ct.Pos;

  it('🔖 Move', () => {

    let oneE4 = m.move(situation, e4Move);

    if (!oneE4) {
      return '! 1. e4';
    }

    qed('1. e4', oneE4.piece, wP);

    qed("b's turn", m.situationAfter(oneE4).turn, "b");
    
  });

  it('castles', () => {
    situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1') as ct.Situation;

    let short = m.move(situation, shortCastles);

    if (!short) {
      return '! short';
    }

    qed('o-o is king side', short.castle, side.ShortCastle)

    qed('o-o king on g1', short.after.get(g1), wK);
    qed('o-o rook on f1', short.after.get(f1), wR);

  });
  
}
