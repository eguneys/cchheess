import * as ct from './types';

export function fenChar(pS: string): ct.Maybe<ct.Piece> {
  switch (pS) {
    case 'b':
    case 'r':
    case 'n':
    case 'q':
    case 'k':
    case 'p':
      return {
        color: 'b',
        role: pS
      }
    case 'B':
    case 'R':
    case 'N':
    case 'Q':
    case 'K':
    case 'P':
      return {
        color: 'w',
        role: pS.toLowerCase() as ct.Role
      }
  }
}
