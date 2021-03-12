import { run } from './util';
import makes from './makes';
import core from './core';
import mobil from './mobil';
import line from './line';
import direction from './direction';

export default function() {

  // makes();
  //direction();
  //mobil();
  core();
  line();

  run();

}
