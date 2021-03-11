import { it, nacc, nac, cry } from './util';
import { seteq, deepeq } from './util2';
import * as dir from '../direction';
import * as dt from '../dtypes';
import * as ct from '../types';
import * as p from '../pos';
import * as v from '../visual';

function pos(f: number, r: number): ct.Pos {
  if (p.isDirection(f) && p.isDirection(r)) {
    return p.pos(f, r)
  }
  let _f: ct.File = 1
  let _r: ct.Rank = 1
  return p.pos(_f, _r)
}

export default function() {

  it('displaces on 0 direction', () => {
    let t: Array<[dt.Displace0, ct.Direction, ct.Maybe<ct.Direction>]> =
      [[-8, 1, undefined],
       [-1, 1, undefined],
       [8, 3, undefined],
       [7, 1, 8],
       [1, 3, 4]];

    t.forEach(([di, d, res]) => {
      let _d = dir.ddir0(di, d)
      nacc(` ${di} ${d} != `, _d, res)
    })
  });

  it('displaces on position', () => {
    let t: Array<[dt.Displace1, ct.Pos, ct.Maybe<ct.Pos>]> = 
      [[[0, 0], pos(1, 1), pos(1,1)],
       [[1, 0], pos(1, 1), pos(2,1)],
       [[4, -3], pos(4, 4), pos(8,1)],
       [[-1, 0], pos(1, 1), undefined],
       [[-5, 7], pos(1, 1), undefined]
      ];

    t.forEach(([d1, _p, res]) => {
      let _d = dir.ddir1(d1, _p);

      if (res && _d) {
        nac(`expected ${p.key(res)} got ${p.key(_d)}`, p.eq(res, _d))
      } else if (!res && !_d) {
      } else if (!res && _d) {
        cry(`expected undefined got ${p.key(_d)}`)
      } else if (!_d && res) {
        cry(`expected ${p.key(res)} got undefined`)
      }

    });
  });


  it('displaces displace2', () => {
    
    let t: Array<[dt.Displace2, ct.Pos, Set<ct.Pos>]> = 
      [[dt.DKnight, pos(1, 1), new Set([
        pos(3,2),
        pos(2,3)
      ])], [
        dt.DKnight, pos(4,4), new Set([
          pos(5,6), pos(5,2),
          pos(3,6), pos(3,2),
          pos(6,5), pos(6,3),
          pos(2,5), pos(2,3)
        ])]];

    t.forEach(([d2, _p, expected]) => {
      let got = dir.ddir2(d2, _p);

      console.log(v.str(got));
      
      nac(`got ${v.str(got)} != expected ${v.str(expected)}`, deepeq(got, expected));

    });

  });

  it('routes for direction', () => {
    
    let t: Array<[dt.Displace0, ct.Direction,
                  dir.Route0<ct.Direction>]> = [
                    [0, 1, [1]],
                    [1, 1, [1,2,3,4,5,6,7,8]],
                    [-1, 4, [4,3,2,1]]
                  ]

    t.forEach(([d0, _d, expected]) => {
      let got = dir.rroute0(d0, _d);

      let gotM = [...got].map(_ => p.fkey(_)),
      expectedM = [...expected].map(_ => p.fkey(_));

      nac(`got ${gotM} !== expected ${expectedM}`,
          deepeq(got, expected));
    });

  });

  
  it('routes for direction', () => {
    
    let t: Array<[dt.Displace1, ct.Pos,
                  dir.Route1<ct.Pos>]> = [
                    [[0,0], pos(1,1), [
                      [pos(1,1), pos(1,3)]
                    ]],
                  ]

    t.forEach(([d1, _p, expected]) => {
      let got = dir.rroute1(d1, _p);


      // let gotM = [...got].map(_ => p.fkey(_)),
      // expectedM = [...expected].map(_ => p.fkey(_));

      // nac(`got ${gotM} !== expected ${expectedM}`,
      //     deepeq(got, expected));

    });
  });
  

  
}
