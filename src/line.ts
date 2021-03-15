import * as ct from './types';
import * as f from './fen';
import * as san from './san';
import * as h from './history';

export function lastPly(line: ct.Line): ct.Ply {
  if (ct.isFenLine(line)) {
    return 1;
  } else {
    return line.branchAt + line.history.length;
  }
}

export function fenLineFirstPly(parent: ct.FenLine, sanMeta: ct.SanMetaOrCastles): ct.MoveLine | LineError {
  let _h1 = h.first(parent, sanMeta)

  if (_h1) {
    return {
      branchAt: 0,
      parent,
      history: _h1
    };
  } else {
    return LineError.CantMakeMove;
  }
}

export function moveLineNewPly(line: ct.MoveLine, ply: number, sanMeta: ct.SanMetaOrCastles): ct.MoveLine | LineError {

  let { history } = line;
  if (lastPly(line) < ply - 1) {
    return LineError.NoMoveFound;
  } else if (lastPly(line) > ply - 1) {
    return LineError.AlreadySet;
  } else {
    let _h2 = h.add(history, sanMeta)
    if (_h2) {
      return {
        ...line,
        history: _h2
      };
    } else {
      return LineError.CantMakeMove;
    }
  }
}

export enum LineError {
  NoSuchLine = 'No Such Line',
  AlreadySet = 'Already Set',
  InvalidInput = 'Invalid Input',
  NoMoveFound = 'No Move Found',
  CantMakeMove = 'Cant Make Move'
}

export function isLineError(_: any): _ is LineError {
  return Object.values(LineError).includes(_);
}

export function line(pline: ct.Line, ply: number, move: string): ct.Line | LineError {
  let _sanMeta = san.str2meta(move)

  if (!_sanMeta) {
    return LineError.InvalidInput;
  }

  if (ct.isFenLine(pline)) {
  } else {
    let history = h.branch(pline.history, ply, _sanMeta);

    if (history) {
      return {
        parent: pline,
        branchAt: ply - 1,
        history
      };
    }
  }
  return LineError.NoMoveFound;
}

export function fen(fen: string): ct.Line | LineError {
  let sit = f.situation(fen)
  if (sit) {
    return sit;
  } else {
    return LineError.InvalidInput
  }
}

export function ply(line: ct.Line, ply: number): ct.Fen | LineError {

  if (ply === 0) {
    if (ct.isFenLine(line)) {
      return f.fen(line);
    }
  }

  return LineError.NoMoveFound
}

export function aply(line: ct.Line, ply: number, move: string): ct.Line | LineError {
  let _sanMeta = san.str2meta(move)

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
