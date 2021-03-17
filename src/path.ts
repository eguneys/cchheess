import * as n from './node';
import * as ct from './types';

export class MakesNode<A, B> {
  makes: Makes
  root: n.Root<A, B>

  constructor(line: string, a: A) {
    this.makes = new Makes()
    this.makes.line(line, 0);
    this.root = n.root(line, a);
  }

  zero(): A | MakesError {
    return this.root.data;
  }

  get(line: string, ply: ct.Ply): B | MakesError {
    let path = this.makes.line(line, ply);
    if (isMakesError(path)) {
      return path;
    } else {
      if (path.length === 0) {
        return MakesError.TryZero
      }
      let res = n.climb(this.root.children, path.slice(0).reverse());
      if (res) {
        return res.data;
      } else {
        return MakesError.NoPreceding;
      }
    }
  }

  line(line: string, ply: ct.Ply, b: B): ct.Maybe<MakesError> {
    let [key, ...path] = this.makes.line(line, ply);
    if (isMakesError(path)) {
      return path;
    } else {
      if (!n.add(key, this.root, path.reverse(), b)) {
        return MakesError.Internal;
      }
    }
  }

  line2(line2: string, line: string, ply: ct.Ply, b: B): ct.Maybe<MakesError> {
    let [key, ...path] = this.makes.line2(line2, line, ply);
    if (isMakesError(path)) {
      return path;
    } else {
      if (!n.add(key, this.root, path.reverse(), b)) {
        return MakesError.Internal;
      }
    }
  }
  
}


export enum MakesError {
  TryZero = 'Try Zero',
  Internal = 'Internal',
  NoPreceding = 'No Preceding',
  NoLineToBase = 'No Line to Base'
}

export function isMakesError(_: any): _ is MakesError {
  return Object.values(MakesError).includes(_);
}

export class Makes {
  
  data: Map<string, Map<ct.Ply, n.Path>>

  constructor() {
    this.data = new Map()
  }

  line(lineKey: string, ply: ct.Ply): n.Path | MakesError {
    let _line = this.data.get(lineKey);

    if (_line) {
      let _path = _line.get(ply)

      if (!_path) {
        let _prepath = _line.get(ply - 1);

        if (_prepath) {
          let path = [ply + '', ..._prepath];
          _line.set(ply, path);
          return path;
        } else {
          return MakesError.NoPreceding;
        }
      } else {
        return _path;
      }
    } else {
      if (ply === 0) {
        let line = new Map()
        line.set(ply, [])
        this.data.set(lineKey, line);
        return [];
      } else {
        return MakesError.NoPreceding;
      }
    }
  }

  line2(line2Key: string, lineKey: string, ply: ct.Ply) {
    let _line = this.data.get(lineKey),
    _line2 = this.data.get(line2Key);

    if (_line2) {
      let _path = _line2.get(ply)
      if (_path) {
        return _path;
      } else {
        return MakesError.NoPreceding;
      }
    } else {
      if (!_line) {
        return MakesError.NoLineToBase;
      } else {
        let _prepath = _line.get(ply - 1)
        if (!_prepath) {
          return MakesError.NoPreceding;
        } else {
          let path = [ply + line2Key, ..._prepath]
          let line2 = new Map();
          line2.set(ply, path);
          this.data.set(line2Key, line2);
          return path;
        }
      }
    }
    
  }
  
}
