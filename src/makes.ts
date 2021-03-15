export enum MakesError {
  AlreadySet = 'already set',
  NotSet = 'not set'
}

export type MakesResult<A, B> = A | B | MakesError

export class Makes<Key, Value> {

  data: Map<Key, Value>

  constructor() {
    this.data = new Map()
  }

  get(key: Key): Value | undefined {
    return this.data.get(key);
  }

  setter0<ApiError, Arg1>(f: (_: Arg1) => Value | ApiError,
                          isApiError: (_: any) => _ is ApiError) {
    let data = this.data;
    return function(key: Key, arg1: Arg1): MakesResult<ApiError, undefined> {
      let _res = data.get(key);

      if (_res) {
        return MakesError.AlreadySet;
      } else {
        let fres = f(arg1);
        if (isApiError(fres)) {
          return fres;
        } else {
          data.set(key, fres);
        }
      }
    }
  }

  setter1<ApiError, Arg1, Arg2>(f: (v: Value, a1: Arg1, a2: Arg2) => Value | ApiError,
                                isApiError: (_: any) => _ is ApiError) {
    let data = this.data;
    return function(key: Key, a1: Arg1, a2: Arg2): MakesResult<ApiError, undefined> {
      let _v = data.get(key);

      if (_v) {
        let _res = f(_v, a1, a2)

        if (isApiError(_res)) {
          return _res;
        } else {
          data.set(key, _res)
        }
      } else {
        return MakesError.NotSet
      }
    }
  }

  setter0n<ApiError>(f: (..._: any) => Value | ApiError,
                     isApiError: (_: any) => _ is ApiError) {
    let data = this.data;
    return function(key: Key, ...args: any): MakesResult<ApiError, undefined> {
      let _res = data.get(key);

      if (_res) {
        return MakesError.AlreadySet;
      } else {
        let fres = f(...args);
        if (isApiError(fres)) {
          return fres;
        } else {
          data.set(key, fres);
        }
      }
    }
  }

  getter1<ApiResult, Arg1>(f: (v: Value, a1: Arg1) => ApiResult) {
    let data = this.data;
    return function(key: Key, a1: Arg1): ApiResult | MakesError {
      let _v = data.get(key);

      if (_v) {
        let _res = f(_v, a1)
        return _res
      } else {
        return MakesError.NotSet
      }
    }
  }
  

}
