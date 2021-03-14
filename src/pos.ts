import * as ct from './types';

export type DAlong = [ct.Direction, ct.Direction, ct.Direction, ct.Direction, ct.Direction, ct.Direction, ct.Direction, ct.Direction]
export const directions: DAlong = [1,2,3,4,5,6,7,8]

export function isDirection(_: number): _ is ct.Direction {
  return !!mDirection(_);
}

export function mDirection(_: number): ct.Maybe<ct.Direction> {
  if (_ >= 1 && _ <= 8) {
    return _ as ct.Direction;
  }
}

export function isPos(_: any): _ is ct.Pos {
  if (Array.isArray(_)) {
    if (_.length === 2) {
      return _.map(isDirection).every(_ => !!_);
    }
  }
  return false;
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
export const posKeys: Array<PosKey> = [  
  'a1','a2','a3','a4','a5','a6','a7','a8',
  'b1','b2','b3','b4','b5','b6','b7','b8',
  'c1','c2','c3','c4','c5','c6','c7','c8',
  'd1','d2','d3','d4','d5','d6','d7','d8',
  'e1','e2','e3','e4','e5','e6','e7','e8',
  'f1','f2','f3','f4','f5','f6','f7','f8',
  'g1','g2','g3','g4','g5','g6','g7','g8',
  'h1','h2','h3','h4','h5','h6','h7','h8'];

export const fByKey = (_: FileKey): ct.File => {
  return fileKeys.indexOf(_) + 1 as ct.File;
}

export const rByKey = (_: RankKey): ct.Rank => {
  return rankKeys.indexOf(_) + 1 as ct.Rank;
}

export const posKey2rKey = (_: PosKey): RankKey => {
  return _[1] as RankKey;
}

export const posKey2fKey = (_: PosKey): FileKey => {
  return _[0] as FileKey;
}

export const mPosKey = (_: string): ct.Maybe<PosKey> => {
  if (posKeys.includes(_ as PosKey)) {
    let i = posKeys.indexOf(_ as PosKey);
    return posKeys[i]
  }  
}


export function mFileKey(_: string): ct.Maybe<FileKey> {
  if (fileKeys.includes(_ as FileKey)) {
    let i = fileKeys.indexOf(_ as FileKey);
    return fileKeys[i]
  }
}

export function mRankKey(_: string): ct.Maybe<RankKey> {
  if (rankKeys.includes(_ as RankKey)) {
    let i = rankKeys.indexOf(_ as RankKey);
    return rankKeys[i]
  }
}

export function fkey(f: ct.File): FileKey {
  return fileKeys[f - 1];
}

export function rkey(r: ct.Rank): RankKey {
  return rankKeys[r - 1];
}

export function key(p: ct.Pos): PosKey {
  return (fkey(p[0]) + rkey(p[1])) as PosKey;
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
