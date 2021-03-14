import { deepeq } from './util2';
import { it, jss, nacc, nac } from './util';

import * as sz from '../sanitizes';
import { isEqualAny, mapmatch } from '../isequal';

export default function() {

  it('tests equality', () => {
    nac('3 4', !isEqualAny(3, 4))

    nac('p equal', mapmatch({
      a: '1',
      b: '2',
      c: '3'
    }, {a : '1', b: '*', c: '*' }));
  });

  it('sanitizes numbers', () => {
    let dirs = new sz.Sanitizes<number>();
    nacc('san 3 3', dirs.get(3), dirs.get(3))
    nac('san 3 4', dirs.get(3) !== dirs.get(4))
  });

  it('sanitizes arrays', () => {
    let poss = new sz.Sanitizes<number[]>();

    let a = [3];
    nac(`returns same type`, deepeq(poss.get(a), [3]));
    nac('san [3] [3]', poss.get([3]) === a);

    nac('san [3] [4]', poss.get([4]) !== a);
  });

  it('sanitizes maps', () => {
    let boards = new sz.Sanitizes<Map<number[], string>>();

    let thr = [3],
    four = [4];

    let exp = new Map()
    exp.set(thr, "three");

    let m = new Map()
    m.set(thr, "three");

    nac(`returns same type`, 
        deepeq(boards.get(m), exp));

    m.set(four, "four")

    exp.set(four, "four")

    nac(`returns ref equal`, boards.get(exp) === m)
  });

  it('sanitizes objects', () => {

    interface Piece {
      role: string,
      color: string
    }

    let boards = new sz.Sanitizes<Piece>();

    let a = {
      role: 'b',
      color: 'w'
    }

    let b = {
      role: 'b',
      color: 'w'
    }

    nac('ref equal', boards.get(a) === a)

    nac('a b', boards.get(b) === a);
    
  });


  interface Pos {
    file: string,
    rank: string
  }

  function key2pos(key: string): Pos {
    return {
      file: key[0],
      rank: key[1]
    }
  }

  interface Board {
    p1: Pos,
    p2: Pos
  }
  
  let poss = new sz.Sanitizes<Pos>();

  let boards = new sz.Sanitizes<Board>();

  it('queries objects', () => {

    ['a1','b1','c1','a2','a3'].forEach(_ => {
      poss.get(key2pos(_));
    });

    let res = poss.query({
      file: 'a',
      rank: '*'
    });


    let afiles = ['a1','a2','a3'].map(key2pos);

    nac('a file', deepeq(res, afiles));
    
    type Board = {
      p1: Pos,
      p2: Pos
    };
  });

  it("queries nested objects", () => {

    ['a1','b1','c1','a2','a3'].forEach(_ => {
      let p = poss.get(key2pos(_));

      let p2 = poss.get(key2pos(_));

      boards.get({
        p1: p,
        p2 });
    });

    let res2 = boards.query({
      p1: poss.query({
        file: "c",
        rank: "*"
      }),
      p2: "*"
    });


    console.log(res2);
  });
  
}
