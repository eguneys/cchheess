import { it, qed, cry } from './util';
import * as n from '../node';

export default function () {


  it('mainlinenodelist', () => {
    let node: n.Branch<string> = {
      id: '1',
      data: '1',
      children: [{
        id: '2',
        data: '2',
        children: [{
          id: '3',
          data: '3',
          children: []
        }]
      }, {
        id: '4',
        data: '2b',
        children: [{
          id: '5',
          data: '2b3',
          children: []
        }]
      }]
    }

    // console.log(n.mainlineNodeList(node));
  });

  type Ply = number
  type Move = string

  type RootData = {
    ply: Ply,
  }

  interface NodeData extends RootData {
    move: Move
  }
  
  let root: n.Root<RootData, NodeData> = {
    id: '1',
    data: {
      ply: 0
    },
    children: [
      
    ]
  }

  it('builds lines', () => {

    let root = n.root("1", 10)

    n.add("2", root, [], 11);
    n.add("3", root, ["2"], 11);
    n.add("4", root, ["2", "3"], 11);
    n.add("4b", root, ["2", "3"], 11);
    n.add("5", root, ["2", "3", "4"], 11);
    n.add("4b5", root, ["2", "3", "4b"], 11);

    console.log(n.mainlineNodeList(root));

  });

}
