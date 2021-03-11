import * as p from './pos';
import * as ct from './types';

export function str(a: Set<ct.Pos>): string {
  return '{' + [...a].map(p.key).join(' ') + '}';
}
