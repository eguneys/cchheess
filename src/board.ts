import * as p from './piece';
import * as d from './direction';
import * as ct from './types';

// export function board(fenMeta: ct.FenMeta): ct.Maybe<ct.Board> {

//   let { ranks } = fenMeta;

//   // let pieces = ranks.reduce((pieces, rankS, rankI) => {

//   //   if (!pieces) {
//   //     return undefined;
//   //   }

//   //   let rank: ct.Rank = d.direction(rankI + 1 + '') || 1,
//   //   file: ct.File = 1;

//   //   for (let i = 0; i < 8; i++) {
//   //     let pOrS = rankS[i];
//   //     let S = d.direction(pOrS);
//   //     if (S) {
//   //       S = d.add(S, file)

//   //       if (S) {
//   //         file = S;
//   //       } else {
//   //         return pieces;
//   //       }
//   //     } else {
//   //       let _p = p.piece(pOrS);
//   //       if (_p) {
//   //         pieces.set({
//   //           file,
//   //           rank
//   //         }, _p);
//   //       } else {
//   //         return;
//   //       }

//   //       let _d = d.add(1, file);
//   //       if (_d) {
//   //         file = _d;
//   //       } else {
//   //         // yconsole.log(file, pieces);
//   //         return pieces;
//   //       }
//   //     }
//   //   }
//   // }, new Map() as ct.Maybe<Map<ct.Pos, ct.Piece>>);


//   // if (pieces) {
//   //   return {
//   //     fenMeta,
//   //     pieces
//   //   }
//   // }
  
// }
