import * as ct from './types';

export function toFenStr(piece: ct.Piece): string {
  if (piece.color === 'w') {
    return piece.role.toUpperCase();
  }
  return piece.role;
}
