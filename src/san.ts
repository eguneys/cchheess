import * as ct from './types';

export function str2meta(str: string): ct.Maybe<ct.SanMeta> {
  if (isSanMeta(str)) {
    return str;
  } else {
    return san2meta(str);
  }
}

export function isSanMeta(str: string): str is ct.SanMeta {
  let res = str.split(' ');
  if (res.length === 8) {
    let [role, file, rank, capture, to, promotion, check, mate] = res;

    let RES = [/N|B|R|Q|K|/,
               /[a-h]?/,
               /([1-8]?)/,
               /(x?)/,
               /([a-h][0-9])/,
               /(=?[NBRQ]?)/,
               /(\+?)/,
               /(\#?)/];

    for (let key in RES) {
      if (!res[key].match(RES[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

export function san2meta(san: ct.San): ct.Maybe<ct.SanMeta> {

  let RE = /(N|B|R|Q|K|)([a-h]?)([1-8]?)(x?)([a-h][0-9])(=?[NBRQ]?)(\+?)(\#?)/;

  let m = san.match(RE);

  if (m) {
    let [_, role, file, rank, capture, to, promotion, check, mate] = m;
    let res: ct.SanMeta = [role,file,rank,capture,to,promotion,check,mate].join(' ');
    return res;
  }
}
