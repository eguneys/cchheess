import { tMo, run } from './util';
import makes from './makes';
import core from './core';
import util from './_util';
import line from './line';
import actor from './actor';
import routes from './routes';
import calcutes from './calcutes';
import direction from './direction';
import history from './history';
import fen from './fen';
import move from './move';


export default function() {

  tMo(makes);
  tMo(direction);
  tMo(util);
  tMo(core);
  tMo(line);
  tMo(calcutes);
  tMo(routes);
  tMo(move);
  tMo(actor);
  tMo.only(history);
  tMo(fen);


  run();

}
