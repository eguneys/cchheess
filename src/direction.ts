import * as p from './pos';
import * as ct from './types';
import * as dt from './dtypes';

export function ddir0(_d0: dt.Displace0, d: ct.Direction): ct.Maybe<ct.Direction> {
  let _res = (_d0 + d);
  if (p.isDirection(_res)) {
    return _res;
  }
}

export function ddir1(_d1: dt.Displace1, p: ct.Pos): ct.Maybe<ct.Pos> {
  let file = ddir0(_d1[0], p.file),
  rank = ddir0(_d1[1], p.rank);

  if (file && rank) {
    return {
      file,
      rank
    }
  }
}

export function ddir2(_d2: dt.Displace2, p: ct.Pos): Set<ct.Pos> {
  let res = new Set<ct.Pos>();
  _d2.forEach(_ => {
    let _res = ddir1(_, p)

    if (_res) {
      res.add(_res);
    }
  })
  return res;
}

export type Route0<A> = [A] | [A,A] | [A,A,A] | [A,A,A,A] | [A,A,A,A,A] | [A,A,A,A,A,A] | [A,A,A,A,A,A,A] | [A,A,A,A,A,A,A,A]
export type Route1<A> = Array<Route0<A>>
export type Route2<A> = Array<Route0<A>>

export function rroute0(_d0: dt.Displace0, dir: ct.Direction): Route0<ct.Direction> {

  let res: Route0<ct.Direction> = [dir]
  let ndir = dir;
  if (_d0 === 0) {
    return res;
  }
  while (true) {
    let _mndir = ddir0(_d0, ndir)

    if (_mndir) {
      ndir = _mndir
      res.push(ndir)
    } else {
      break;
    }
  }
  return res;
}

export function rroute1(_d1: dt.Displace1, pos: ct.Pos): Route1<ct.Pos> {

  let res: Route1<ct.Pos> = []
  let ifile = pos.file,
  irank = pos.rank;

  while (true) {

    let r0f = rroute0(_d1[0], pos.file),
    r0r = rroute0(_d1[1], pos.rank);

    let r0: Route0<ct.Pos> = [{
      file: r0f[0],
      rank: r0r[0]
    }]

    res.push(r0);

    if (_d1[0] === 0 && _d1[1] === 0) {
      break;
    }
  }
  return res;
}
