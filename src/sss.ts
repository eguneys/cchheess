export function union<A>(setA: Set<A>, setB: Set<A>): Set<A> {
  let _union = new Set(setA)
  for (let elem of setB) {
    _union.add(elem)
  }
  return _union
}
