import * as dir from './direction';
import * as p from './pos';
import * as ct from './types';

const fa = p.dopKey;

export function str<A>(a: dir.Route0<A>): string;
export function str<A>(a: dir.Route1<A>): string;
export function str<A>(a: Array<A>): string;
export function str<A>(a: Set<A>): string;
export function str<A>(a: any): string {
  if (dir.isRoute0(a)) {
    return '<R0 ' + a.map(_ => fa(_)).join(' ') + '>';
  } else if (dir.isRoute1(a)) {
    return '<R1 ' + a.map(_ => str(_)).join(' ') + '>';
  } else if (a instanceof Set) {
    return '{' + [...a].map(_ => fa(_)).join(' ') + '}';
  } else if (Array.isArray(a)) {
    if (a.length === 0) {
      return '[]';
    }
    else if (Array.isArray(a[0])) {
    } else 
      return '[' + a.map(_ => fa(_)).join(' ') + ']';
  }
  return 'unknown';
}
