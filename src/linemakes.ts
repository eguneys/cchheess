import * as ct from './types';
import { Makes } from './makes';
import * as l from './line';


function _line(line: string, ply: number, move: string): ct.Line | l.LineError {

  let pline = _makes.get(line);

  if (!pline) {
    return l.LineError.NoSuchLine;
  }
  return l.line(pline, ply, move);
}

let _makes = new Makes<string, ct.Line>()

export const fen = _makes.setter0(l.fen, l.isLineError);
export const ply = _makes.getter1(l.ply);
export const aply = _makes.setter1(l.aply, l.isLineError);
export const line = _makes.setter0n(_line, l.isLineError);
