import { it, qed } from './util';

import * as ct from '../types';
import { poss, pieces } from '../db';
import * as side from '../side';
import * as a from '../actor';
import * as f from '../fen';
import * as m from '../move';
import * as v from './visual';

export default function () {

  let initialSituation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') as ct.Situation;

  let { board, turn } = initialSituation;
  let a2 = poss.nget(1, 2) as ct.Pos;
  let b2 = poss.nget(2, 2) as ct.Pos;
  let a7 = poss.nget(1, 7) as ct.Pos;
  let a6 = poss.nget(1, 6) as ct.Pos;
  let a5 = poss.nget(1, 5) as ct.Pos;
  let f7 = poss.nget(6, 7) as ct.Pos;
  let d3 = poss.nget(4, 3) as ct.Pos;
  let c4 = poss.nget(3, 4) as ct.Pos;
  let wP = pieces.nget('P','P') as ct.Piece;
  let bP = pieces.nget('p','p') as ct.Piece;
  let bQ = pieces.nget('q','q') as ct.Piece;
  let bN = pieces.nget('n','n') as ct.Piece;


  it('makes moves', () => {


    let res = a.moves({
      board,
      piece: wP,
      pos: b2
    });

    qed('2 moves', res.length, 2);

    qed('b2b4 ...', res.map(m.str),
        ['b2b4', 'b2b3']);
    
  });

  it('makes actors', () => {
    let res = a.actors(board,wP,[] as Partial<ct.Pos>);

    qed('8 pawns', res.length, 8);

    res = a.actors(board,wP,[1,] as Partial<ct.Pos>);

    qed('1 pawn', res.length, 1);

  });

  it('queen and knight projections', () => {

    let board = v.board(`

     n
q
`)

    let res = a.moves({
      board, 
      piece: bQ,
      pos: a6
    })

    qed('queen moves', v.moves(res), ['a7', 'a8', 'a5', 'a4', 'a3', 'a2', 'a1',
                                      'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
                                      'b7', 'c8', 'b5', 'c4', 'd3', 'e2', 'f1']);

    res = a.moves({
      board,
      piece: bN,
      pos: f7
    })
    
    qed('knight moves', v.moves(res),
        ['e5', 'g5', 'd6', 'd8', 'h8', 'h6']);

  });

  it('pawn projection', () => {
    let board = v.board(`

     p

p


pP

`)

    qed('p@f7', v.moves(a.moves({ board, piece: bP, pos: f7 })), ['f6', 'f5']);
    qed('p@a5', v.moves(a.moves({ board, piece: bP, pos: a5 })), ['a4']);
    qed('p@a2', v.moves(a.moves({ board, piece: bP, pos: a2 })), ['a1', 'a1', 'a1', 'a1']);
    qed('P@b2', v.moves(a.moves({ board, piece: wP, pos: b2 })), ['b3', 'b4']);

  });

  it('pawn promotes', () => {

    let board = v.board(`

P
`);

    let res = a.moves({ board, piece: wP, pos: a7 });

    qed('four promotions', res.length, 4);

    qed('promotable roles', res.map(_ => _.promotion), ['n', 'b', 'r', 'q']);

  });

  it('castles', () => {

    let board = v.board(`
r    k r
`);

    let res = a.castles(board, 'b', side.ShortCastle)

    if (!res) {
      return '! king side';
    }

    qed('castle short', v.str(res.after), `
r    rk
`);

    qed('castle long', v.str(a.castles(board, 'b', side.LongCastle)?.after || board), `
  kr   r
`);
    
  });

  it.only('captures', () => {
    
    let captureSit = f.situation('8/1r2k3/8/8/2p5/1R1P4/8/4K3 w - - 0 1') as ct.Situation;

    let { board: cBoard } = captureSit;

    let res = a.moves({ board: cBoard,
                        piece: wP,
                        pos: d3 });

    qed('d4 dxc4', res.map(m.str),
        ['d3d4', 'd3c4']);

    qed('cxb3 cxd3 c3', a.moves({
      board: cBoard,
      piece: bP,
      pos: c4
    }).map(m.str), ['c4c3','c4b3','c4d3']);

  });
  
}
