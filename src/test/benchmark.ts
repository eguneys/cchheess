
export default function() {
  
}

function profile(msg: string, fn: () => void) {
  console.log(`${msg}...`);
  let t = Date.now();
  for (let i = 0; i < 1000; i++) {
    fn();
  }
  let elapsed = Date.now() - t;
  let cs = elapsed / 100
  console.log(` in ${cs} cs.`);
}
