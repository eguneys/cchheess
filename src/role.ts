import * as ct from './types';

export function isRole(_: string): _ is ct.Role {
  return !mRole(_);
}

export let roles: Array<ct.Role> = ['r','b','n','q','k','p'];

export let promotables: Array<ct.Role> = ['r', 'b', 'n', 'q'];

export function mRole(str: string): ct.Maybe<ct.Role> {
  let _ = str.toLowerCase();
  if (roles.includes(_ as ct.Role)) {
    return _ as ct.Role;
  }
}


export function mColor(str: string): ct.Maybe<ct.Color> {
  let _ = str.toLowerCase();
  if (roles.includes(_ as ct.Role)) {
    if (_ === str) {
      return 'b';
    } else {
      return 'w';
    }
  }
}

export function otherColor(color: ct.Color): ct.Color {
  return color === 'w' ? 'b' : 'w';
}
