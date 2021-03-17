import { it, pqed, qed, cry } from './util';
import * as ct from '../types';
import * as l from '../line';
import * as f from '../fen';
import { pieces } from '../db';

function anyLike(_: any, f: (_: any) => void) {
  f(_);
}

export default function () {

  let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  let situation = f.situation(fen) as ct.Situation;
  let wK = pieces.nget('K', 'K');
  let wP = pieces.nget('P', 'P');
  let bN = pieces.nget('n', 'n');
  let line = new l.Line('initial', situation);

  it('is a line');

  it('takes a fen and moves', () => {

    anyLike(line.zero('initial'), s => {
      pqed('zero', s, { situation, ply: 0 } );
    });

    'e4 e5 Nf3 Nf6'.split(' ')
      .forEach((_, i) => {
        qed(`${i+1}. ${_} `, line.move('initial', _, i+1), undefined);
      });

    anyLike(line.ply('initial', 1), m => {
      pqed('P', m, { ply: 1, move: { piece: wP } } );
    });

    anyLike(line.ply('initial', 4), m => {
      pqed('n', m, { ply: 4, move: { piece: bN } } );
    });

    qed('! 1. O-O', line.move('initial', 'O-O', 1), l.LineError.AlreadySet);

  });



  it('castles', () => {
    let fen2 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1';
    let situation2 = f.situation(fen) as ct.Situation;
    let line2 = new l.Line('initial', situation);

    qed('O-O', line2.move('initial', 'O-O', 1), undefined);

    anyLike(line2.ply('initial', 1), m => {
      pqed('k', m, { ply: 1, move: { piece: wK } } );
    });
    
  });

  it.only('inherits lines', () => {
    let fen2 = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQK2R w KQkq - 0 1';
    let situation2 = f.situation(fen) as ct.Situation;
    let line2 = new l.Line('initial', situation);

    line2.move('initial', 'O-O', 1);

    qed('branch e4', line2.move2('branch e4', 'initial', 'e4', 1), undefined);

    anyLike(line2.ply('branch e4', 1), m => {
      pqed('p e4', m, { ply: 1, move: { piece: wP } } );
    });

    qed('branch2 e5', line2.move2('branch2 e5', 'branch e4', 'e5', 2), undefined);

    qed('branch2 e5 a3', line2.move('branch2 e5', 'a3', 3), undefined);

    anyLike(line2.ply('branch2 e5', 3), m => {
      pqed('p e5 a3', m, { ply: 3, move: { piece: wP } } );
    });

  });

}
