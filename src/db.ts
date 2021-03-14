import * as ct from './types';
import * as dt from './dtypes';
import * as sz from './sanitizes';

import * as ct2 from './types2';


export const boards = new sz.Sanitizes<ct.Board>()
export const lines = new sz.Sanitizes<ct.MoveLine>()
export const situations = new sz.Sanitizes<ct.Situation>()
export const moves = new sz.Sanitizes<ct.Move>();
export const histories = new sz.Sanitizes<ct.History>()

/**** types 2 ****/

export const actors = new sz.Sanitizes<ct2.Actor>()

