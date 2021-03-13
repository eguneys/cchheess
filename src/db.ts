import * as ct from './types';
import * as p from './pos';
import * as r from './role';
import * as a from './actor';
import * as sz from './sanitizes';
import * as cz from './calculates';

import * as ct2 from './types2';

export const pieces = new sz.SanitizedSpace2<ct.Color, ct.Role,
string, string, ct.Piece>
  ((color, role) => ({ color, role }),
   r.mColor,
   r.mRole)

export const poss = new sz.SanitizedSpace2<ct.Direction, ct.Direction,
number, number, ct.Pos>((f, r) => [f, r],
                        p.mDirection,
                        p.mDirection);
export const boards = new sz.Sanitizes<ct.Board>()

export const lines = new sz.Sanitizes<ct.MoveLine>()
export const situations = new sz.Sanitizes<ct.Situation>()

export const moves = new sz.Sanitizes<ct.Move>();
export const histories = new sz.Sanitizes<ct.History>()

/**** types 2 ****/

export const actors = new sz.Sanitizes<ct2.Actor>()

export const actorMoves = new cz.Calculates<ct2.Actor, Array<ct.Move>>(a.moves);
