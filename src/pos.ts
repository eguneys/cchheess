import * as ct from './types';

export function isDirection(_: number): _ is ct.Direction {
  return (_ >= 1 && _ <= 8);
}

export function isPos(_: any): _ is ct.Pos {
  return ((_ as ct.Pos).file !== undefined &&
    (_ as ct.Pos).rank !== undefined);
}

export type FileKey = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'
export type RankKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'
export type PosKey = 
  | 'a1' | 'a2' | 'a3' | 'a4' | 'a5' | 'a6' | 'a7' | 'a8'
  | 'b1' | 'b2' | 'b3' | 'b4' | 'b5' | 'b6' | 'b7' | 'b8'
  | 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6' | 'c7' | 'c8'
  | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7' | 'd8'
  | 'e1' | 'e2' | 'e3' | 'e4' | 'e5' | 'e6' | 'e7' | 'e8'
  | 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8'
  | 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6' | 'g7' | 'g8'
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'h8'

export const fileKeys: Array<FileKey> = ['a','b','c','d','e','f','g','h'];
export const rankKeys: Array<RankKey> = ['1','2','3','4','5','6','7','8'];
export const posKeys: Array<PosKey> = [];

export function fkey(f: ct.File): FileKey {
  return fileKeys[f - 1];
}

export function rkey(r: ct.Rank): RankKey {
  return rankKeys[r - 1];
}

export function key(p: ct.Pos): PosKey {
  return (fkey(p.file) + rkey(p.rank)) as PosKey;
}


export function eq(p1: ct.Pos, p2: ct.Pos) {
  return p1.file === p2.file && p1.rank === p2.rank;
}

export function pos(file: ct.File, rank: ct.Rank): ct.Pos {
  return {
    file,
    rank
  }
}

export function dopKey(_: any): string {
  if (isPos(_)) {
    return key(_)
  } else if (isDirection(_)) {
    return rkey(_);
  } else {
    return 'dopX';
  }
}

export const f_a: ct.File = 1
export const f_b: ct.File = 2
export const f_c: ct.File = 3
export const f_d: ct.File = 4
export const f_e: ct.File = 5
export const f_f: ct.File = 6
export const f_g: ct.File = 7
export const f_h: ct.File = 8

export const r_1: ct.Rank = 1
export const r_2: ct.Rank = 2
export const r_3: ct.Rank = 3
export const r_4: ct.Rank = 4
export const r_5: ct.Rank = 5
export const r_6: ct.Rank = 6
export const r_7: ct.Rank = 7
export const r_8: ct.Rank = 8


