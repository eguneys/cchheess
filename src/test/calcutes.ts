import { deepeq } from './util2';
import { it, jss, nacc, nac } from './util';

import * as cz from '../calculates'


export default function () {

  type Pos = {
    file: string,
    rank: string
  }

  const pkey = (str: string) => ({
    file: str[0],
    rank: str[1]
  })

  it('calculates lazy vals', () => {

    type PosCombined = {
      fandr: string
    };

    let ci = 0;

    let sums = new cz.Calculates<Pos, PosCombined>(pos => {
      ci++;
      return {
        fandr: pos.rank + pos.file
      }
    });
    
    let poss = ['a1','a2','a3','b1','b2','b3','c5']
                 .map(pkey);

    let res = sums.querz(poss, {
      fandr: "1a"
    });

    nacc('called once', ci, poss.length);

    sums.querz(poss, {
      fandr: "1a"
    });

    nacc('called once', ci, poss.length);
  });
  
  
}
