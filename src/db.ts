import * as ct from './types';
import * as p from './pos';

const roles: ct.Role[] = ['b','n','q','k','r','p'];
const pieces: ct.Piece[] = roles.flatMap(role => {
  return [{
    color: 'w',
    role
  }, {
    color: 'b',
    role
  }]
});

export function piece(str: string): ct.Maybe<ct.Piece> {
  return pieces.find(_ => {
    return (str === _.role && _.color === 'b') ||
      (str.toLowerCase() === _.role && _.color === 'w')
  });
}


export function pos(file: number, rank: number): ct.Maybe<ct.Pos> {
  if (p.isDirection(file) && p.isDirection(rank)) {
    return {
      file,
      rank
    }
  }
}
