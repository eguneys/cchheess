import { it, jss, qed, nac, nacc, cry } from './util';
import * as l from '../line';
import {
  fen,
  ply,
  aply,
  line
} from '../linemakes';

export default function() {

  let ifen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  it('makes ply', () => {
    
    let res = fen('line0', 'fen')
    nacc('invalid input', res, l.LineError.InvalidInput);

    res = fen('line0', ifen);
    nac('good fen', !res)

    let pres = ply('line0', 1)
    nacc('no move ply 1', pres, l.LineError.NoMoveFound);

    pres = ply('line0', 0)
    nacc('move ply 0', pres, ifen);

    let apres = aply('line0', 0, 'san');
    nacc('invalid input', apres, l.LineError.InvalidInput);

    apres = aply('line0', 0, 'Nf6');
    nacc('already set', apres, l.LineError.AlreadySet);

    apres = aply('line0', 2, 'Nf6');
    nacc('fen line no move found 2', apres, l.LineError.NoMoveFound);

    apres = aply('line0', 1, 'e4');
    nac('set san 1 ok', !apres);

    apres = aply('line0', 1, 'Nf6');
    nacc('already set ply 1', apres, l.LineError.AlreadySet);

    apres = aply('line0', 2, 'e5');
    nac('set san 2 ok', !apres);

    apres = aply('line0', 2, 'e5');
    nacc('already set ply 2', apres, l.LineError.AlreadySet);

    apres = aply('line0', 3, 'e7');
    nacc('cant make move e7', apres, l.LineError.CantMakeMove);

  });

  it('can make move', () => {

    let res = fen('line3', ifen)

    let apres = aply('line3', 1, 'e4');
    qed('set san 1 ok', apres, undefined);

    apres = aply('line3', 2, 'e5');
    qed('set san 2 ok', apres, undefined);
  });

  it('cant make invalid moves', () => {
    fen('line1', ifen)
    qed('1. e6', aply('line1', 1, 'e6'), l.LineError.CantMakeMove);
    qed('1. e4', aply('line1', 1, 'e4'), undefined);
  });

  it('plays a game', () => {

    fen('lineg', ifen);

    'e4 e5 g4 g6'.split(' ')
      .forEach((_, i) => {
        qed(`${i+1}. ${_}`, aply('lineg', i+1, _), undefined);
      });

  });

  it('cant branch', () => {
    qed('no such line', line('line', 'line2', 1, 'e4'), l.LineError.NoSuchLine);
    fen('initial2', ifen);

    qed('no move found', 
        line('line2', 'initial2', 1, 'e4'),
        l.LineError.NoMoveFound);
    
  });

  it('branches lines', () => {
    fen('initial', ifen);

    'e4 e5 g4 g6'.split(' ')
      .forEach((_, i) => {
        aply('initial', i+1, _);
      });

    qed('4... a6', line('branch', 'initial', 4, 'a6'), undefined)


    qed('5. g5', aply('branch', 5, 'g5'), undefined);
  });
    
}
