import { it, jss, nacc, cry } from './util';
import { b, f, pm } from '../makes';
import * as ct from '../types';
import * as s from '../san';


// let { allFilesAccess: afa,
//       allPossAccess: apa } = pm;

export default function() {

  it('builds files', () => {

    // jss(afa.allFilesByKey.get('a'))

    // let e4 = apa.allPossByKey.get('e4');
    // if (e4) {
    //   jss(e4)
    //   nacc('file', e4.p.file, 5);
    //   nacc('rank', e4.p.rank, 4);
    // } else {
    //   cry('no e4');
    // }

  });

  it('creates board', () => {
    const initialMeta = f.fenMeta('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

    if (!initialMeta) {
      return '! fen meta';
    }

    //let initialBoard = b.board(initialMeta);

    // if (!initialBoard) {
    //   return '! board';
    // }

    // console.log(b.at(psm.pos('e4')));

  });

  // console.log(s.san2meta('Nbe4+'));
}
