export function deepeq(a: any, b: any): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return arreq(a, b);
  } else if (a instanceof Set && b instanceof Set) {
    return seteq(a, b);
  } else if (typeof a === 'object' && typeof b === 'object') {
    for (let key in a) {
      if (!deepeq(a[key], b[key])) {
        return false;
      }
    }
    for (let key in b) {
      if (!deepeq(a[key], b[key])) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}

export function seteq(a: Set<any>, b: Set<any>): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (let item of a) {
    let found = false;
    for (let item2 of b) {
      if (deepeq(item, item2)) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
}

export function arreq(a: Array<any>, b: Array<any>): boolean {
  if (a.length !== b.length) {
    return false;
  }
  for (let i in a) {
    if (!b.some(_ => deepeq(_, a[i]))) {
      return false;
    }
  }
  return true;
}
