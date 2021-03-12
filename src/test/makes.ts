import { it, jss, nac, nacc, cry } from './util';
import { Makes } from '../makes';

enum ApiError {
  BelowZero = 'bz',
  IsZero = 'iz',
  AboveZero = 'az',
  TooLong = 'tl'
}

function isApiError(_: any): _ is ApiError {
  return Object.values(ApiError).includes(_);
}

export default function() {

  it('makes', () => {

    let api = {
      makeString(_: number) {
        if (_ === 0) {
          return ApiError.IsZero;
        } else {
          return "api" + _;
        }
      },
      addString(pre: string, _: number, o: number) {
        if (pre.length > 5) {
          return ApiError.TooLong;
        } else {
          return pre + _;
        }
      },
      getString(pre: string, _: number) {
        return pre + _;
      }
    }


    let m = new Makes<string, string>();

    let buildNoZero = m.setter0<ApiError, number>(api.makeString,
                                                  isApiError)

    let addNumberUpto5 = m.setter1<ApiError, number, any>(api.addString,
                                                     isApiError);

    let returnValueAndNumber = m.getter1<void, number>(api.getString);

    nacc('build zero', buildNoZero('line3', 0),
         ApiError.IsZero);

    buildNoZero('line3', 3)
    nacc('make by value', 
         returnValueAndNumber('line3', 9), 'api39')
    nacc('make by value', 
         buildNoZero('line3', 2), 'already set')

    buildNoZero('line2', 4)
    nacc('make by value', 
         returnValueAndNumber('line2', 9), 'api49')

    nacc('no line set',
         addNumberUpto5('line10', 4, 0), 'not set')
    addNumberUpto5('line3', 4, 0)
    nacc('yes line set',
         returnValueAndNumber('line3', 8), 'api348')
    addNumberUpto5('line3', 5, 0);
    nacc('too long',
         addNumberUpto5('line3', 4, 0), 'tl')

    nacc('retvalnum', 
         returnValueAndNumber('line3', 8),
         'api3458');    

  });

}
