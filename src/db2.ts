import * as ct from './types';
import * as ct2 from './types2';
import * as sz from './sanitizes';
import * as cz from './calculates';
import * as m from './move';
import * as a from './actor';
import * as p from './pos';
import * as r from './role';

export const pieces = new sz.SanitizedSpace2<ct.Color, ct.Role,
string, string, ct.Piece>
  ((color, role) => ({ color, role }),
   r.mColor,
   r.mRole)

export const poss = new sz.SanitizedSpace2<ct.Direction, ct.Direction,
number, number, ct.Pos>((f, r) => [f, r],
                        p.mDirection,
                        p.mDirection);

export const actorMoves = new cz.Calculates<ct2.Actor, Array<ct.Move>>(a.moves);
export const situationAfters = new cz.Calculates<ct.Move, ct.Situation>(m.situationAfter);
// export const routes = new cz.Calculates<ct.Direction, Array<ct.Route>>(d.routes);
// export const moves = new cz.Calculates<ct.Route, Array<ct.Move>>(route.moves);
