import { it, sqed, qed, cry } from './util';
import * as ct from '../types';
import * as path from '../path';
import * as n from '../node';

export default function () {


  // line 1 - []
  // line 2 - ["2"]
  // line 3 - ["2", "3"]
  // line 4 - ["2", "3", "4"]
  // line2 line 4 - ["2", "3","4b"]
  // line 5 - ["2", "3", "4", "5"]
  // line2 5 - ["2", "3", "4b", "4b5"]
  it('keeps track of paths', () => {

    let pm = new path.Makes();

    sqed('line 0', pm.line('line', 0), []);
    sqed('line 1', pm.line('line', 1), ["1"]);
    sqed('line 2', pm.line('line', 2), ["2", "1"]);
    sqed('line 3', pm.line('line', 3), ["3", "2", "1"]);
    sqed('line 4', pm.line('line', 4), ["4", "3", "2", "1"]);
    sqed('line2 line 4', pm.line2('line2', 'line', 4), ["4line2", "3", "2", "1"]);
    sqed('line 5', pm.line('line', 5), ["5", "4", "3", "2", "1"]);
    sqed('line2 5', pm.line('line2', 5), ["5", "4line2", "3", "2", "1"]);
  });

  it('makes node', () => {
    
    type Ply = number
    type Move = string

    type RootData = {
      fen: string,
      ply: Ply,
    }

    interface NodeData extends RootData {
      move: Move
    }

    let mn = new path.MakesNode<RootData, NodeData>('initial', {
      fen: 'initial fen',
      ply: 0
    });

    let lres;

    lres = mn.line('initial', 1, {
      fen: 'initial1',
      ply: 1,
      move: 'e4'
    });

    qed('i1', lres, undefined);

    lres = mn.line('initial', 2, {
      fen: 'initial2',
      ply: 2,
      move: 'e5'
    });

    qed('i2', lres, undefined);

    lres = mn.line('initial', 3, {
      fen: 'initial3',
      ply: 3,
      move: 'e6'
    });

    if (qed('i3', lres, undefined)) {
      console.log(n.mainlineNodeList(mn.root));
    }

    if (qed('mnl', n.mainlineNodeList(mn.root).length, 4)) {
      console.log(n.mainlineNodeList(mn.root));
    }

    lres = mn.line2('initial2', 'initial', 1, {
      fen: 'initial21',
      ply: 1,
      move: 'e2'
    });

    qed('i22', lres, undefined);

    lres = mn.line2('initial3', 'initial', 3, {
      fen: 'initial21',
      ply: 3,
      move: 'e2'
    });


    qed('i3 get', mn.get('initial3', 3), {
      fen: 'initial21',
      ply: 3,
      move: 'e2'
    });
    // console.log(n.mainlineNodeList(mn.root));

  });

}
