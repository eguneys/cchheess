import * as ct from './types';
import * as dt from './dtypes';
import * as dir from './direction';
import * as p from './pos';
import * as pi from './piece';
import * as r from './role';
import * as u from './util';
import { poss } from './db';

export const capture = u.seqable(_capture);
export const move = u.seqable(_move);
export const promote = u.seqable(_promote);
export const castle = u.seqable(_castle);

export function firstPosForPieceOnRoute(board: ct.Board, 
                                        piece: ct.Piece,
                                        pos: ct.Pos,
                                        trip: dir.Route0<ct.Direction>): ct.Maybe<ct.Pos> {

  return [...board.entries()]
    .filter(([pos, _piece]) => piece === _piece && trip.includes(pos[0]))
    .map(([k]) => k)[0];

}

export function posOf(board: ct.Board, piece: ct.Piece, file?: ct.File): ct.Maybe<ct.Pos> {
  return [...board.entries()]
    .filter(([pos, _piece]) => (pos[0] === file || pos[0]) && piece === _piece)
    .map(([k]) => k)[0];
}

export function fen(board: ct.Board): string {
  let res = [];
  for (let rank of p.directions.slice(0).reverse()) {
    let rankS = '';
    let space = 0;
    for (let file of p.directions) {
      let piece = board.get(poss.pget(file, rank));
      if (piece) {
        if (space !== 0) {
          rankS += space;
          space = 0;
        }
        rankS += pi.toFenStr(piece);
      } else {
        space++;
      }
    }
    if (space !== 0) {
      rankS += space;
    }
    res.push(rankS);
  }
  return res.join('/');
}

function _castle(board: ct.Board, 
                 origKing: ct.Pos,
                 destKing: ct.Pos,
                 origRook: ct.Pos,
                 destRook: ct.Pos): ct.Maybe<ct.Board> {

  let king = board.get(origKing),
  rook = board.get(origRook);

  if (king && rook) {
    let b2 = new Map([...board]);
    b2.delete(origKing);
    b2.delete(origRook);
    b2.set(destKing, king);
    b2.set(destRook, rook);
    return b2;
  }
  
}

function _capture(board: ct.Board, pos: ct.Pos, to: ct.Pos): ct.Maybe<ct.Board> {
  let p = board.get(pos)
  if (p) {
    let b2 = new Map([...board])
    b2.delete(pos);
    b2.set(to, p);

    return b2;
  }  
}

function _move(board: ct.Board, pos: ct.Pos, to: ct.Pos): ct.Maybe<ct.Board> {

  let p = board.get(pos)
  if (p) {
    let b2 = new Map([...board])
    b2.delete(pos);
    b2.set(to, p);

    return b2;
  }
}

function _promote(board: ct.Board, pos: ct.Pos, to: ct.Role): ct.Maybe<ct.Board> {
  let p = board.get(pos);
  if (p) {
    let p2 = {
      role: to,
      color: p.color
    };
    let b2 = new Map([...board]);
    b2.delete(pos);
    b2.set(pos, p2);

    return b2;
  }
}
