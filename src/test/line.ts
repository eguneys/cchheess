import { it, jss, nac, nacc, cry } from './util';
import * as l from '../line';

export default function() {

  let ifen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  it('makes ply', () => {
    
    let res = l.fen('line0', 'fen')
    nacc('invalid input', res, l.LineError.InvalidInput);

    res = l.fen('line0', ifen);
    nac('good fen', !res)

    let pres = l.ply('line0', 1)
    nacc('no move ply 1', pres, l.LineError.NoMoveFound);

    pres = l.ply('line0', 0)
    nacc('move ply 0', pres, ifen);

    let apres = l.aply('line0', 0, 'san');
    nacc('invalid input', apres, l.LineError.InvalidInput);

    apres = l.aply('line0', 0, 'Nf6');
    nacc('already set', apres, l.LineError.AlreadySet);

    apres = l.aply('line0', 2, 'Nf6');
    nacc('fen line no move found 2', apres, l.LineError.NoMoveFound);

    apres = l.aply('line0', 1, 'e4');
    nac('set san 1 ok', !apres);

    apres = l.aply('line0', 1, 'Nf6');
    nacc('already set ply 1', apres, l.LineError.AlreadySet);

    apres = l.aply('line0', 2, 'e5');
    nac('set san 2 ok', !apres);

    apres = l.aply('line0', 2, 'e5');
    nacc('already set ply 2', apres, l.LineError.AlreadySet);

    apres = l.aply('line0', 3, 'e7');
    nacc('cant make move e7', apres, l.LineError.CantMakeMove);

  });

  it.only('cant make invalid moves', () => {
    l.fen('line1', ifen)
    nacc('1. e6', l.aply('line1', 1, 'e6'), l.LineError.CantMakeMove);
  });
    
}
