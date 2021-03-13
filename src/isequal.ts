type Within<A> = A[]
type Literal<A> = A
type Star = "*"

type Matcher<A> = Within<A> | Literal<A> | Star

type MapMatcher<A> = 
  { [K in keyof A]: Matcher<A[K]> }

export type Query<A> = MapMatcher<A> | Star

export function mapmatch<A>(a: A, m: Query<A>): boolean {
  if (m === '*') {
    return true;
  } else if (Array.isArray(a) && Array.isArray(m)) {
    return refPEqual2(a, m);
  } else {
    return objPEqual(a, m);
  }
}

export function match<A>(a: A, m: Matcher<A>): boolean {
  if (m === "*") {
    return true;
  } else if (Array.isArray(m)) {
    return m.includes(a);
  } else {
    return a === m;
  }
}

type IsEqual<A> = (a: A, _: A) => boolean

type PartiallyEqual<A> = (a: A, _: Matcher<A>) => boolean

export const isEqualAny = <A>(a: A, b: A): boolean => {
  if (a === b) return true;

  if (Array.isArray(a) && Array.isArray(b)) return refEqual2(a, b)

  if (a instanceof Map && b instanceof Map) return mapEqual(a, b)

  else {
    return objEqual(a, b);
  }
}

export const refEqual = <A>(a: A, b: A) => a === b;

export const refEqual2 = <A>(a: A[], b: A[]) => {
  if (a.length === b.length) {
    for (let key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const mapEqual = <A, B>(a: Map<A, B>, b: Map<A, B>): boolean => {
  if (a.size !== b.size) {
    return false;
  }
  for (var [key, _a] of a) {
    let _b = b.get(key);
    if (_a !== _b || (_b === undefined && !a.has(key))) {
      return false;
    }
  }
  return true;
};

export const objEqual = <A>(a: A, b: A): boolean => {
  if (typeof a === 'object' && typeof b === 'object') {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
    for (let key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
}

export const refPEqual2 = <A>(a: A[], b: MapMatcher<A[]>) => {
  for (let key in b) {
    if (!match(a[key], b[key])) {
      return false;
    }
  }
  return true;
}

export const objPEqual = <A>(a: A, b: MapMatcher<A>): boolean => {
  if (typeof a === 'object' && typeof b === 'object') {
    for (let key in b) {
      if (!match(a[key], b[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}
