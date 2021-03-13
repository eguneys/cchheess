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
  let i = 0;

  let testOnly = onlyset.length > 0 ? onlyset : stset ;

  testOnly.forEach(_ => {
    try {
      i++;
      testBegin(_);
      let msg = _.fn();
      if (msg) {
        _.fail = msg;
      }
    } catch (e) {
      _.err = e;
    }
  });

  testOnly
    .filter(_ => !!_.fail)
    .forEach(testFailed)

  testOnly
    .filter(_ => !!_.err)
    .forEach(testThrowed);

  console.log(`done ${i}`);
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
  console.log(`❌ ${msg} ` + (o? o : ''));
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
