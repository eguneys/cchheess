import * as ct from './types';
import { Makes } from './makes';
import * as f from './fen';
import * as sanApi from './san';
import * as hApi from './history';
import * as db from './db';

function fenLineFirstPly(parent: ct.FenLine, sanMeta: ct.SanMeta): ct.MoveLine | LineError {
  let _h1 = hApi.first(parent, sanMeta)

  if (_h1) {
    return db.lines.get({
      parent, 
      history: _h1
    });
  } else {
    return LineError.CantMakeMove;
  }
}

function moveLineNewPly({ parent, history }: ct.MoveLine, ply: number, sanMeta: ct.SanMeta): ct.MoveLine | LineError {

  if (history.length < ply - 1) {
    return LineError.NoMoveFound;
  } else if (history.length > ply - 1) {
    return LineError.AlreadySet;
  } else {
    let _h2 = hApi.add(history, sanMeta)
    if (_h2) {
      return db.lines.get({
        parent,
        history: _h2
      });
    } else {
      return LineError.CantMakeMove;
    }
  }
}

export enum LineError {
  AlreadySet = 'Already Set',
  InvalidInput = 'Invalid Input',
  NoMoveFound = 'No Move Found',
  CantMakeMove = 'Cant Make Move'
}

export function isLineError(_: any): _ is LineError {
  return Object.values(LineError).includes(_);
}

function _fen(fen: string): ct.Line | LineError {
  let sit = f.situation(fen)
  if (sit) {
    return sit;
  } else {
    return LineError.InvalidInput
  }
}

function _ply(line: ct.Line, ply: number): ct.Fen | LineError {

  if (ply === 0) {
    if (ct.isFenLine(line)) {
      return f.fen(line);
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
      if (ct.isFenLine(line)) {
        if (ply !== 1) {
          return LineError.NoMoveFound;
        } else {
          let res = fenLineFirstPly(line, _sanMeta);
          return res;
        }
      } else {
        if (ply >= 2) {
          return moveLineNewPly(line, ply, _sanMeta);
        } else {
          return LineError.AlreadySet;
        }
      }
    }
  } else {
    return LineError.InvalidInput
  }
}

let _makes = new Makes<string, ct.Line>()

export const fen = _makes.setter0(_fen, isLineError);
export const ply = _makes.getter1(_ply);
export const aply = _makes.setter1(_aply, isLineError);
