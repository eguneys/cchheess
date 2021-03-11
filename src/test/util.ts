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

let stset: Test[] = [];

export function run() {
  let errs = [];
  let i = 0;

  stset.forEach(_ => {
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

  stset
    .filter(_ => !!_.fail)
    .forEach(testFailed)

  stset
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


export function jss(o: any, msg?: string): void {
  console.log(JSON.stringify(o), msg);
}

export function cry(msg: string, o?: any) {
  console.log(`❌ ${msg} ` + (o? o : ''));
}

export function nacc(msg: string, a: any,
                     b: any): void {
  if (a !== b) {
    cry(msg, a);
  }
}

export function nac(msg: string, a: any): void {
  if (!a) {
    cry(msg);
  }
}
