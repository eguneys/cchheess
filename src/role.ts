import * as ct from './types';

export function isRole(_: string): _ is ct.Role {
  return !mRole(_);
}

let roles = ['r','b','n','q','k','p'];

export function mRole(str: string): ct.Maybe<ct.Role> {
  let _ = str.toLowerCase();
  if (roles.includes(_)) {
    return _ as ct.Role;
  }
}


export function mColor(str: string): ct.Maybe<ct.Color> {
  let _ = str.toLowerCase();
  if (roles.includes(_)) {
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
