import * as ct from './types';
import * as f from './fen';
import * as san from './san';
import * as m from './move';
import * as n from './node';
import * as path from './path';
import * as view from './view';

type RootData = {
  situation: ct.Situation,
  view: view.SituationView,
  ply: ct.Ply,
}

interface NodeData {
  ply: ct.Ply,
  move: ct.Move,
  view: view.MoveView
}


export class Line {

  mn: path.MakesNode<RootData, NodeData>

  constructor(line: string, situation: ct.Situation) {
    this.mn = new path.MakesNode<RootData, NodeData>(line, {
      view: view.situation(situation),
      situation,
      ply: 0
    });
  }
  
  zero(line: string) {
    return this.mn.zero();
  }

  move2(line2: string, line: string, _move: string, ply: ct.Ply): ct.Maybe<path.MakesError | LineError> {
    let sanMeta = san.str2meta(_move) 
    if (sanMeta) {
      let _after;
      if (!path.isMakesError(this.mn.get(line2, ply))) {
        return LineError.AlreadySet;
      }

      if (ply === 1) {
        let _rootData = this.mn.zero();
        if (path.isMakesError(_rootData)) {
          return _rootData;
        } else {
          let { situation } = _rootData;
          _after = m.move(situation, sanMeta);
        }
      } else {
        let _branchData = this.ply(line, ply - 1);
        if (path.isMakesError(_branchData)) {
          return _branchData;
        } else {
          let { move } = _branchData;
          _after = m.move(m.situationAfter(move), sanMeta);
        }
      }

      if (_after) {

        let branchData = {
          ply,
          move: _after,
          view: view.move(_after)
        }

        return this.mn.line2(line2, line, ply, branchData);
      } else {
        return LineError.InvalidMove;
      }
    } else {
      return LineError.InvalidSan;
    }
  }

  move(line: string, _move: string, ply: ct.Ply): ct.Maybe<path.MakesError | LineError> {
    let sanMeta = san.str2meta(_move) 
    if (sanMeta) {
      let _after;
      if (!path.isMakesError(this.mn.get(line, ply))) {
        return LineError.AlreadySet;
      }
      if (ply === 1) {
        let _rootData = this.mn.zero();
        if (path.isMakesError(_rootData)) {
          return _rootData;
        } else {
          let { situation } = _rootData;
          _after = m.move(situation, sanMeta);
        }
      } else {
        let _branchData = this.mn.get(line, ply - 1);
        if (path.isMakesError(_branchData)) {
          return _branchData;
        } else {
          let { move } = _branchData;
          _after = m.move(m.situationAfter(move), sanMeta);
        }
      }

      if (_after) {

        let branchData = {
          ply,
          move: _after,
          view: view.move(_after)
        }

        return this.mn.line(line, ply, branchData);
      } else {
        return LineError.InvalidMove;
      }
    } else {
      return LineError.InvalidSan;
    }
  }

  ply(line: string, ply: ct.Ply) {
    return this.mn.get(line, ply);
  }

}

export enum LineError {
  InvalidMove = "Invalid Move",
  InvalidSan = "Invalid San",
  AlreadySet = "Already Set"
}
