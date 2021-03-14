import { tMo, run } from './util';
import makes from './makes';
import core from './core';
import line from './line';
import actor from './actor';
import routes from './routes';
import direction from './direction';
import history from './history';
import fen from './fen';
import move from './move';


export default function() {

  tMo(makes);
  tMo(direction);
  tMo(core);
  tMo(routes);
  tMo(fen);

  tMo(line);
  tMo(move);
  tMo(actor);
  tMo(history);

  run();
}
