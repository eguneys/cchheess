import * as ct from './types';

export const A: ct.File = 1
export const B: ct.File = 2
export const C: ct.File = 3
export const D: ct.File = 4
export const E: ct.File = 5
export const F: ct.File = 6
export const G: ct.File = 7
export const H: ct.File = 8

export const ShortCastle: ct.CastleMeta = {
  king: G,
  rook: F,
  trip: 1
}

export const LongCastle: ct.CastleMeta = {
  king: C,
  rook: D,
  trip: -1
}

export function isCastles(meta: ct.SanMetaOrCastles): meta is ct.CastleMeta {
  return ((meta as ct.CastleMeta).king !== undefined)
}
