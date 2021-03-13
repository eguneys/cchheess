import { tMo, run } from './util';
import makes from './makes';
import core from './core';
import util from './_util';
import line from './line';
import actor from './actor';
import calcutes from './calcutes';
import direction from './direction';

export default function() {

  tMo(makes);
  tMo(direction);
  tMo(util);
  tMo(core);
  tMo(line);
  tMo(calcutes);
  tMo.only(actor);

  run();

}
