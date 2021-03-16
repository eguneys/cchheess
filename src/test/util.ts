import { deepeq } from './util2';

interface Test {
  msg: string,
  fn: () => void | string | undefined,
  err? : string,
  fail?: string
}

function testFailed(t: Test) {
  console.log(`❌ ${t.msg} ${t.fail}`);
}

function testThrowed(t: Test) {
  console.log(`💀 ${t.msg} ${t.err}`);
}

function testBegin(t: Test) {
  console.log(`${t.msg}`);
}

type TMoCase = () => void

type TMo = {
  (): TMoCase,
  only: () => void
}

let tmos: Array<TMoCase> = [],
onlytmos: Array<TMoCase> = [];

let onlyset: Test[] = [];
let stset: Test[] = [];

export function run() {
  let _tmos = onlytmos.length > 0 ? onlytmos : tmos;

  _tmos.forEach(_ => _());

  runtests();
}

export const tMo = (() => {

  let res: any = (fn: TMoCase) => {
    tmos.push(fn);
  }

  res.only = (fn: TMoCase) => {
    onlytmos.push(fn);
  };

  return res;
})();

export function runtests() {
  let errs = [];

  let testOnly = onlyset.length > 0 ? onlyset : stset ;

  testOnly.forEach(_ => {
    try {
      testBegin(_);
      let msg = _.fn();
      if (msg) {
        _.fail = msg;
      }
    } catch (e) {
      _.err = e;
    }
  });

  let failed = testOnly
    .filter(_ => !!_.fail)
    .map(testFailed)

  let errored = testOnly
    .filter(_ => !!_.err)
    .map(testThrowed);

  console.log(`done ${testOnly.length} / ${failed.length} failed`);
}

export function it(msg: string, fn: () => void | string | undefined): void {
  let test: Test = {
    msg,
    fn
  }

  stset.push(test);
}

it.only = (msg: string, fn: () => void | string | undefined): void => {
  let test: Test = {
    msg,
    fn
  }
  onlyset.push(test);
}


export function jss(o: any, msg?: string): void {
  console.log(JSON.stringify(o), msg);
}

export function cry(msg: string, o?: any) {
  let oS = (typeof o === 'string') ? o : JSON.stringify(o);
  console.log(`❌ ${msg} ` + oS);
}

export function nacc(msg: string, a: any,
                     b: any): void {
  if (a !== b) {
    cry(`${msg} got`, a);
  }
}

export function nac(msg: string, a: any): void {
  if (!a) {
    cry(msg);
  }
}


export function sqed(msg: string, a: any,
                    b: any): boolean {
  if (!deepeq(a, b, true)) {
    cry(`${msg} got`, a);
    return true;
  }
  return false;
}

export function qed(msg: string, a: any,
                    b: any): boolean {
  if (!deepeq(a, b)) {
    cry(`${msg} got`, a);
    return true;
  }
  return false;
}
