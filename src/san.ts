import * as ct from './types';

// export function san2meta(san: ct.San): ct.Maybe<ct.SanMeta> {

//   let RE = /(N|B|R|Q|K|)([a-h]?)([1-8]?)(x?)([a-h][0-9])(=?[NBRQ]?)(\+?)(\#?)/;

//   let m = san.match(RE);

//   if (m) {
//     let [_, role, file, rank, capture, to, promotion, check, mate] = m;
//     return [role,file,rank,capture,to,promotion,check,mate].join(' ');
//   }
// }
