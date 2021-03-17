import * as ct from './types';
import * as f from './fen';
import * as m from './move';

export type SituationView = {
  fen: ct.Fen
}

export type MoveView = {
  fenAfter: ct.Fen,
  uci: string,
  san: string
}

export function situation(situation: ct.Situation): SituationView {
  return {
    fen: f.fen(situation)
  }
}

export function move(move: ct.Move): MoveView {
  return {
    fenAfter: f.fen(m.situationAfter(move)),
    uci: m.uci(move),
    san: m.san(move)
  }
}
