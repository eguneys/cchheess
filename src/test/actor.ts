import { deepeq } from './util2';
import { it, jss, nacc, nac } from './util';

import * as ct from '../types';
import * as db2 from '../db2';
import * as a from '../actor';
import * as f from '../fen';

let { poss, pieces } = db2;

export default function () {

  let initialSituation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

  let { board, turn } = initialSituation;

  it('makes moves', () => {

    let pos = poss.nget(2, 2) as ct.Pos;
    let piece = pieces.nget('P','P') as ct.Piece;

    let res = a.moves({
      board,
      piece,
      pos
    });

    nac('moves', !deepeq(res, []));
    
  });
  
}
