export function seqMaybe<A>(a: A | undefined,
                     fn: (_: A, ...args: any) => A | undefined,
                     ...args: any): A | undefined {
  return a ? fn(a, ...args) : undefined;
}

export const seqable = <T,>(cb: (x: T, ...args: any) => T | undefined) =>
  (x: T | undefined, ...args: any) =>
  typeof x === "undefined" ? undefined : cb(x, ...args);
