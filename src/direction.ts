import * as p from './pos';
import * as ct from './types';
import * as dt from './dtypes';
import * as db2 from './db2';

export function ddir0(_d0: dt.Displace0, d: ct.Direction): ct.Maybe<ct.Direction> {
  let _res = (_d0 + d);
  if (p.isDirection(_res)) {
    return _res;
  }
}

export function ddir1(_d1: dt.Displace1, p: ct.Pos): ct.Maybe<ct.Pos> {
  return db2.poss.mget(ddir0(_d1[0], p[0]), ddir0(_d1[1], p[1]));
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
export type RouteFlat<A> = Set<A>

export function isRoute1<A>(_: any): _ is Route1<A> {
  if (Array.isArray(_)) {
    return _.every(isRoute0);
  } else {
    return false;
  }
}

export function isRoute0<A>(_: any): _ is Route0<A> {
  if (Array.isArray(_)) {
    if (_.length >= 1 && _.length <= 8) {
      return !Array.isArray(_[0]);
    }
  }
  return false;
}

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

export function rrouteflat1(_d2: dt.Displace2, pos: ct.Pos): Set<ct.Pos> {
  return new Set(rroute2(_d2, pos).flatMap(r1 => {
    if (r1[1]) {
      return [r1[1]]
    } else {
      return []
    }
  }));
}

export function rroute2(_d2: dt.Displace2, pos: ct.Pos): Route1<ct.Pos> {
  let res = []
  for (let _d1 of _d2) {
    res.push(rroute1(_d1, pos));
  }
  return res;
}

export function rroute1(_d1: dt.Displace1, pos: ct.Pos): Route0<ct.Pos> {

  let f0 = rroute0(_d1[0], pos[0]),
  f1 = rroute0(_d1[1], pos[1]);

  let res: Route0<ct.Pos> = [db2.poss.pget(f0[0], f1[0])];

  let oneWraps = Math.min((_d1[0] === 0 ? f1.length: f0.length), 
                          (_d1[1] === 0 ? f0.length: f1.length))

  for (let i = 1; i < oneWraps; i++) {
    if (res) {
      res.push(db2.poss.pget(f0[f0.length === 1 ? 0 : i],
                           f1[f1.length === 1 ? 0 : i]));
    }
  }
  return res;
}
