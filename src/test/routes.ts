import { deepeq } from './util2';
import { it, jss, nacc, nac, qed } from './util';

import * as p from '../pos';
import * as ct from '../types';
import * as dt from '../dtypes';
import * as db2 from '../db2';
import * as dir from '../direction';

export default function () {

  let a1 = db2.poss.nget(1, 1) as ct.Pos;
  let d4 = db2.poss.nget(4, 4) as ct.Pos;

  it('gets route0', () => {

    let r0dir = dir.rroute0(1, 7);
    qed('r0 -1 1', r0dir, [7, 8]);

    r0dir = dir.rroute0(-1, 2);
    qed('r0 -1 1', r0dir, [2, 1]);

  });

  it('gets route1', () => {

    let res = dir.rroute1([3, 3], a1);
    qed('d [1 1] a1', res, [
      [1, 1],
      [4, 4],
      [7, 7]
    ]);
        
    res = dir.rroute1([-1, 3], a1);
    qed('d [-1 3] a1', res, [
      [1, 1],
    ]);

    let resflat = dir.rrouteflat1(new Set([[-1, 3]]), a1);
    qed('d [-1 3] a1', [...resflat], []);

  });

  it('route0 d4', () => {
    let res = dir.rroute2(dt.DKnight, d4);
    // console.log(res);
  });
  
  it('gets route2', () => {

    let res = dir.rrouteflat1(dt.DKnight, d4);

    qed('N@d4', [...res].map(p.dopKey), [
      'f3', 'f5', 'b3', 'b5', 'c2', 'c6', 'e2', 'e6'
    ]);
  });
}
