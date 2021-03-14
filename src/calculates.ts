import { Query, mapmatch } from './isequal';
import * as sz from './sanitizes';

export class Calculates<O, V> {

  vs: sz.Sanitizes<[O, V]>
  fa: (_: O) => V

  constructor(fa: (_: O) => V) {
    this.fa = fa;
    this.vs = new sz.Sanitizes();
  }

  querz(os: Array<O>, q: Query<V>) {
    return os.map(o => {
      let res = this.vs.query([o, "*"]);

      if (res.length === 0) {
        return this.vs.get([o, this.fa(o)])
      } else return res[0];
    }).filter(ov => {
      return mapmatch(ov[1], q);
    });
  }

  // querzs(o: O) {
  //   let _res;
  //   let res = this.vs.query([o, "*"]);

  //   if (res.length === 0) {
  //     _res = this.vs.get([o, this.fa(o)])
  //   } else _res = res[0];

  //   if (mapmatch(_res[1], q)) {
  //     return _res;
  //   }
  // }
  
}
