import * as ct from './types';
import { Makes } from './makes';
import * as fenApi from './fen';
import * as sanApi from './san';

export enum LineError {
  AlreadySet = 'Already Set',
  InvalidInput = 'Invalid Input',
  NoMoveFound = 'No Move Found'
}

export function isLineError(_: any): _ is LineError {
  return Object.values(LineError).includes(_);
}

function _fen(fen: string): ct.Line | LineError {
  let board = fenApi.board(fen)
  if (board) {
    return {
      board,
      turn: "w"
    }
  } else {
    return LineError.InvalidInput
  }
}

function _ply(line: ct.Line, ply: number): ct.Fen | LineError {

  if (ply === 0) {
    if (ct.isFenLine(line)) {
      return fenApi.fen(line);
    }
  }

  return LineError.NoMoveFound
}

function _aply(line: ct.Line, ply: number, move: string): ct.Line | LineError {
  let _sanMeta = sanApi.str2meta(move)

  if (_sanMeta) {
    if (ply === 0) {
      return LineError.AlreadySet
    } else {
      return line;
    }
  } else {
    return LineError.InvalidInput
  }
}

let _makes = new Makes<string, ct.Line>()

export const fen = _makes.setter0(_fen, isLineError);
export const ply = _makes.getter1(_ply);
export const aply = _makes.setter1(_aply, isLineError);
