import { tMo, run } from './util';
import makes from './makes';
import core from './core';
import actor from './actor';
import routes from './routes';
import direction from './direction';
import fen from './fen';
import move from './move';
import line from './line';
import node from './node';
import path from './path';


export default function() {

  tMo(makes);
  tMo(direction);
  tMo(core);
  tMo(routes);
  tMo(fen);
  tMo.only(move);
  tMo(actor);

  tMo(node);
  tMo(path);
  tMo(line);

  run();
}
