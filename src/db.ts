import * as ct from './types';
import * as dt from './dtypes';
import * as ct2 from './types2';
import * as r from './role';
import * as p from './pos';

class DB<A, B, SubA, SubB, C> {
  make: (a: A, b: B) => C
  mA: (_: SubA) => A | undefined
  mB: (_: SubB) => B | undefined
  space: Map<A, Map<B, C>>

  constructor(make: (a: A, b: B) => C,
              mA: (_: SubA) => A | undefined,
              mB: (_: SubB) => B | undefined) {
    this.space = new Map()
    this.make = make
    this.mA = mA
    this.mB = mB
  }

  pget(a: A, b: B): C {
    let bc = this.space.get(a);
    if (bc) {

      let c = bc.get(b);

      if (c) {
        return c;
      } else {
        let _c = this.make(a, b);
        bc.set(b, _c);
        return _c;
      }      

    } else {
      let c = this.make(a, b);
      let bc = new Map()
        .set(b, c);
      this.space.set(a, bc);
      return c;
    }
  }

  nget(sa: SubA, sb: SubB): C | undefined {
    return this.mget(this.mA(sa),
                     this.mB(sb));
  }

  mget(ma: A | undefined, mb: B | undefined): C | undefined {
    if (ma && mb) {
      return this.pget(ma, mb);
    }
  }
}

export const poss = new DB<ct.Direction, ct.Direction, number, number, ct.Pos>(
  ((f, r) => [f, r]),
  p.mDirection,
  p.mDirection)
export const pieces = new DB<ct.Color, ct.Role, string, string, ct.Piece>(
  (color, role) => ({ color, role }),
  r.mColor,
  r.mRole)
