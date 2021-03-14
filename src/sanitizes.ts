import { Query, isEqualAny, mapmatch } from './isequal';

export enum Sanitized {}

export const sanitized = <A>(szer: Sanitizes<A>, 
                             cb: (...args: any) => A) =>
  (...args: any) => szer.get(cb(...args));

export const sanitizedU = <A>(szer: Sanitizes<A>,
                              cb: (x: A | undefined, ...args: any) => 
  A | undefined) =>
  (a: A, ...args: any) => {
    let _a = cb(a, ...args);
    if (_a) {
      return szer.get(_a);
    }
  }

export class Sanitizes<A> {
  world: A[]

  constructor() {
    this.world = []
  }

  query(a: Query<A>): A[] {
    return this.world.filter(_ => {
      return mapmatch(_, a)
    });
  }

  get(a: A): A & Sanitized {
    let _a = this.world.find(_ => isEqualAny(a, _));
    if (_a) {
      return _a as A & Sanitized;
    } else {
      this.world.push(a);
      return a as A & Sanitized;
    }
  }

  size() {
    return this.world.length;
  }
}

export class SanitizedSpace2<A, B, SubA, SubB, C> {
  make: (a: A, b: B) => C
  space: Sanitizes<C>
  mA: (_: SubA) => A | undefined
  mB: (_: SubB) => B | undefined

  constructor(make: (a: A, b: B) => C,
              mA: (_: SubA) => A | undefined,
              mB: (_: SubB) => B | undefined) {
    this.make = make
    this.mA = mA
    this.mB = mB
    this.space = new Sanitizes<C>()
  }

  query(mc: Query<C>): C[] {
    return this.space.query(mc);
  }

  get(c: C): C {
    return this.space.get(c);
  }

  pget(a: A, b: B): C {
    return this.space.get(this.make(a, b));
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
