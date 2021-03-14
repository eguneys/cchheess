"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moves = void 0;

const db = __importStar(require("./db"));

const b = __importStar(require("./board"));

const disp = __importStar(require("./displace"));

function moves({
  board,
  piece,
  pos
}) {
  let situationBefore = db.situations.get({
    board,
    turn: piece.color
  });
  let displaces = disp.get(piece, pos);
  let res = [];

  for (let to of displaces) {
    let b1 = board,
        b3 = b.move(b1, pos, to);

    if (b3) {
      let m = {
        piece,
        situationBefore,
        after: b3,
        orig: pos,
        dest: to,
        enpassant: false
      };
      res.push(m);
    }
  } // });
  // let routes = db.routes.queryz(dirs, pos);
  // let moves = db.moves.queryz(routes, board);
  // piece -> directions
  // directions - pos -> routes
  // routes - board -> moves


  return res;
}

exports.moves = moves;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fen = exports.move = void 0;

const p = __importStar(require("./pos"));

const pi = __importStar(require("./piece"));

const db = __importStar(require("./db"));

const db2 = __importStar(require("./db2"));

const sz = __importStar(require("./sanitizes"));

const u = __importStar(require("./util"));

exports.move = sz.sanitizedU(db.boards, u.seqable(_move));

function fen(board) {
  let res = [];

  for (let rank of p.directions.slice(0).reverse()) {
    let rankS = '';
    let space = 0;

    for (let file of p.directions) {
      let piece = board.get(db2.poss.pget(file, rank));

      if (piece) {
        if (space !== 0) {
          rankS += space;
          space = 0;
        }

        rankS += pi.toFenStr(piece);
      } else {
        space++;
      }
    }

    if (space !== 0) {
      rankS += space;
    }

    res.push(rankS);
  }

  return res.join('/');
}

exports.fen = fen;

function _move(board, pos, to) {
  let {
    actors
  } = db;

  if (!board.has(to)) {
    let p = board.get(pos);

    if (p) {
      let b2 = new Map([...board]);
      b2.delete(pos);
      b2.set(to, p);

      for (let [pos, piece] of b2.entries()) {
        actors.get({
          pos,
          piece,
          board: b2
        });
      }

      ;
      return b2;
    }
  }
}
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calculates = void 0;

const isequal_1 = require("./isequal");

const sz = __importStar(require("./sanitizes"));

class Calculates {
  constructor(fa) {
    this.fa = fa;
    this.vs = new sz.Sanitizes();
  }

  querz(os, q) {
    return os.map(o => {
      let res = this.vs.query([o, "*"]);

      if (res.length === 0) {
        return this.vs.get([o, this.fa(o)]);
      } else return res[0];
    }).filter(ov => {
      return isequal_1.mapmatch(ov[1], q);
    });
  }

}

exports.Calculates = Calculates;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actors = exports.histories = exports.moves = exports.situations = exports.lines = exports.boards = void 0;

const sz = __importStar(require("./sanitizes"));

exports.boards = new sz.Sanitizes();
exports.lines = new sz.Sanitizes();
exports.situations = new sz.Sanitizes();
exports.moves = new sz.Sanitizes();
exports.histories = new sz.Sanitizes();
/**** types 2 ****/

exports.actors = new sz.Sanitizes();
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.situationAfters = exports.actorMoves = exports.poss = exports.pieces = void 0;

const sz = __importStar(require("./sanitizes"));

const cz = __importStar(require("./calculates"));

const m = __importStar(require("./move"));

const a = __importStar(require("./actor"));

const p = __importStar(require("./pos"));

const r = __importStar(require("./role"));

exports.pieces = new sz.SanitizedSpace2((color, role) => ({
  color,
  role
}), r.mColor, r.mRole);
exports.poss = new sz.SanitizedSpace2((f, r) => [f, r], p.mDirection, p.mDirection);
exports.actorMoves = new cz.Calculates(a.moves);
exports.situationAfters = new cz.Calculates(m.situationAfter); // export const routes = new cz.Calculates<ct.Direction, Array<ct.Route>>(d.routes);
// export const moves = new cz.Calculates<ct.Route, Array<ct.Move>>(route.moves);
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rroute1 = exports.rroute2 = exports.rrouteflat1 = exports.rroute0 = exports.isRoute0 = exports.isRoute1 = exports.ddir2 = exports.ddir1 = exports.ddir0 = void 0;

const p = __importStar(require("./pos"));

const db2 = __importStar(require("./db2"));

function ddir0(_d0, d) {
  let _res = _d0 + d;

  if (p.isDirection(_res)) {
    return _res;
  }
}

exports.ddir0 = ddir0;

function ddir1(_d1, p) {
  return db2.poss.mget(ddir0(_d1[0], p[0]), ddir0(_d1[1], p[1]));
}

exports.ddir1 = ddir1;

function ddir2(_d2, p) {
  let res = new Set();

  _d2.forEach(_ => {
    let _res = ddir1(_, p);

    if (_res) {
      res.add(_res);
    }
  });

  return res;
}

exports.ddir2 = ddir2;

function isRoute1(_) {
  if (Array.isArray(_)) {
    return _.every(isRoute0);
  } else {
    return false;
  }
}

exports.isRoute1 = isRoute1;

function isRoute0(_) {
  if (Array.isArray(_)) {
    if (_.length >= 1 && _.length <= 8) {
      return !Array.isArray(_[0]);
    }
  }

  return false;
}

exports.isRoute0 = isRoute0;

function rroute0(_d0, dir) {
  let res = [dir];
  let ndir = dir;

  if (_d0 === 0) {
    return res;
  }

  while (true) {
    let _mndir = ddir0(_d0, ndir);

    if (_mndir) {
      ndir = _mndir;
      res.push(ndir);
    } else {
      break;
    }
  }

  return res;
}

exports.rroute0 = rroute0;

function rrouteflat1(_d2, pos) {
  return new Set(rroute2(_d2, pos).flatMap(r1 => {
    if (r1[1]) {
      return [r1[1]];
    } else {
      return [];
    }
  }));
}

exports.rrouteflat1 = rrouteflat1;

function rroute2(_d2, pos) {
  let res = [];

  for (let _d1 of _d2) {
    res.push(rroute1(_d1, pos));
  }

  return res;
}

exports.rroute2 = rroute2;

function rroute1(_d1, pos) {
  let f0 = rroute0(_d1[0], pos[0]),
      f1 = rroute0(_d1[1], pos[1]);
  let res = [db2.poss.pget(f0[0], f1[0])];
  let oneWraps = Math.min(_d1[0] === 0 ? f1.length : f0.length, _d1[1] === 0 ? f0.length : f1.length);

  for (let i = 1; i < oneWraps; i++) {
    if (res) {
      res.push(db2.poss.pget(f0[f0.length === 1 ? 0 : i], f1[f1.length === 1 ? 0 : i]));
    }
  }

  return res;
}

exports.rroute1 = rroute1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = void 0;

const sss = __importStar(require("./sss"));

const dir = __importStar(require("./direction"));

const dt = __importStar(require("./dtypes"));

let regulars = {
  'n': dt.DKnight,
  'r': dt.DRook,
  'b': dt.DBishop,
  'q': dt.DQueen,
  'k': dt.DKing
};
const pawnMove2 = {
  'w': sss.union(dt.DWPawn2, dt.DWPawn),
  'b': sss.union(dt.DBPawn2, dt.DBPawn)
};
const pawnMove = {
  'w': dt.DWPawn,
  'b': dt.DBPawn
};
const pawn2MoveRanks = {
  'w': 2,
  'b': 7
};

function dType(piece, pos) {
  if (piece.role === 'p') {
    let p2Rank = pawn2MoveRanks[piece.color];

    if (pos[1] === p2Rank) {
      return pawnMove2[piece.color];
    } else {
      return pawnMove[piece.color];
    }
  } else {
    return regulars[piece.role];
  }
}

function get(piece, pos) {
  return dir.rrouteflat1(dType(piece, pos), pos);
}

exports.get = get;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBPawnC = exports.DWPawnC = exports.DBPawn = exports.DWPawn = exports.DBPawn2 = exports.DWPawn2 = exports.DKing = exports.DQueen = exports.DBishop = exports.DRook = exports.DKnight = void 0;

const sss = __importStar(require("./sss"));

exports.DKnight = new Set([[-1, 2], [-1, -2], [1, 2], [1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]);
exports.DRook = new Set([[-1, 0], [1, 0], [0, -1], [0, 1]]);
exports.DBishop = new Set([[-1, 1], [-1, -1], [1, 1], [1, -1]]);
exports.DQueen = sss.union(exports.DRook, exports.DBishop);
exports.DKing = exports.DQueen;
exports.DWPawn2 = new Set([[0, 2]]);
exports.DBPawn2 = new Set([[0, -2]]);
exports.DWPawn = new Set([[0, 1]]);
exports.DBPawn = new Set([[0, -1]]);
exports.DWPawnC = new Set([[1, 1], [-1, 1]]);
exports.DBPawnC = new Set([[1, -1], [-1, -1]]);
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.space = exports.situation = exports.fen = void 0;

const b = __importStar(require("./board"));

const db2 = __importStar(require("./db2"));

const db = __importStar(require("./db"));

const sz = __importStar(require("./sanitizes"));

;
let {
  pieces,
  poss
} = db2;
let {
  actors,
  boards
} = db;

function fen(situation) {
  let color = situation.turn;
  let rest = "KQkq - 0 1";
  return `${b.fen(situation.board)} ${color} ${rest}`;
}

exports.fen = fen;
exports.situation = sz.sanitized(db.situations, _situation);

function _situation(fen) {
  let _pieces = new Map();

  let [ranksS, colorS] = fen.split(' ');

  if (!ranksS || !colorS) {
    return;
  }

  if (colorS !== "w" && colorS !== "b") {
    return;
  }

  let ranks = ranksS.split('/');

  if (ranks.length !== 8) {
    return;
  }

  for (let i = 0; i < ranks.length; i++) {
    let rank = 8 - i;
    let file = 1;

    for (let j = 0; j < ranks[i].length; j++) {
      let c = ranks[i][j];
      let piece = pieces.nget(c, c);

      if (piece) {
        let pos = poss.nget(file, rank);

        if (pos && piece) {
          _pieces.set(pos, piece);
        }

        file += 1;
      } else {
        let _s = space(c);

        if (_s) {
          file += _s;
        }
      }
    }
  }

  let board = boards.get(_pieces);

  for (let [pos, piece] of _pieces.entries()) {
    actors.get({
      pos,
      piece,
      board
    });
  }

  ;
  return {
    board,
    turn: colorS
  };
}

function space(c) {
  if (c.match(/[1-8]/)) {
    return parseInt(c);
  }
}

exports.space = space;
"use strict";
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = exports.first = void 0;

const db_1 = require("./db");

const m = __importStar(require("./move"));

const db = __importStar(require("./db"));

const u = __importStar(require("./util"));

const sz = __importStar(require("./sanitizes"));

function first(position, sanMeta) {
  let move = m.get(position, sanMeta);

  if (move) {
    return db_1.histories.get([move]);
  }
}

exports.first = first;
exports.add = sz.sanitizedU(db.histories, u.seqable(_add));

function _add(history, sanMeta) {
  let lastMove = history[history.length - 1];
  let move = m.get(m.situationAfter(lastMove), sanMeta);

  if (move) {
    return db_1.histories.get([...history, move]);
  }
}
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objPEqual = exports.refPEqual2 = exports.objEqual = exports.mapEqual = exports.refEqual2 = exports.refEqual = exports.isEqualAny = exports.match = exports.mapmatch = void 0;

function mapmatch(a, m) {
  if (m === '*') {
    return true;
  } else if (Array.isArray(a) && Array.isArray(m)) {
    return exports.refPEqual2(a, m);
  } else {
    return exports.objPEqual(a, m);
  }
}

exports.mapmatch = mapmatch;

function match(a, m) {
  if (m === "*") {
    return true;
  } else if (Array.isArray(m)) {
    return m.includes(a);
  } else {
    return a === m;
  }
}

exports.match = match;

const isEqualAny = (a, b) => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) return exports.refEqual2(a, b);
  if (a instanceof Map && b instanceof Map) return exports.mapEqual(a, b);else {
    return exports.objEqual(a, b);
  }
};

exports.isEqualAny = isEqualAny;

const refEqual = (a, b) => a === b;

exports.refEqual = refEqual;

const refEqual2 = (a, b) => {
  if (a.length === b.length) {
    for (let key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }

    return true;
  }

  return false;
};

exports.refEqual2 = refEqual2;

const mapEqual = (a, b) => {
  if (a.size !== b.size) {
    return false;
  }

  for (var [key, _a] of a) {
    let _b = b.get(key);

    if (_a !== _b || _b === undefined && !a.has(key)) {
      return false;
    }
  }

  return true;
};

exports.mapEqual = mapEqual;

const objEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    for (let key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }

    return true;
  }

  return false;
};

exports.objEqual = objEqual;

const refPEqual2 = (a, b) => {
  for (let key in b) {
    if (!match(a[key], b[key])) {
      return false;
    }
  }

  return true;
};

exports.refPEqual2 = refPEqual2;

const objPEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    for (let key in b) {
      if (!match(a[key], b[key])) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
};

exports.objPEqual = objPEqual;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aply = exports.ply = exports.fen = exports.isLineError = exports.LineError = void 0;

const ct = __importStar(require("./types"));

const makes_1 = require("./makes");

const f = __importStar(require("./fen"));

const sanApi = __importStar(require("./san"));

const hApi = __importStar(require("./history"));

const db = __importStar(require("./db"));

function fenLineFirstPly(parent, sanMeta) {
  let _h1 = hApi.first(parent, sanMeta);

  if (_h1) {
    return db.lines.get({
      parent,
      history: _h1
    });
  } else {
    return LineError.CantMakeMove;
  }
}

function moveLineNewPly({
  parent,
  history
}, ply, sanMeta) {
  if (history.length < ply - 1) {
    return LineError.NoMoveFound;
  } else if (history.length > ply - 1) {
    return LineError.AlreadySet;
  } else {
    let _h2 = hApi.add(history, sanMeta);

    if (_h2) {
      return db.lines.get({
        parent,
        history: _h2
      });
    } else {
      return LineError.CantMakeMove;
    }
  }
}

var LineError;

(function (LineError) {
  LineError["AlreadySet"] = "Already Set";
  LineError["InvalidInput"] = "Invalid Input";
  LineError["NoMoveFound"] = "No Move Found";
  LineError["CantMakeMove"] = "Cant Make Move";
})(LineError = exports.LineError || (exports.LineError = {}));

function isLineError(_) {
  return Object.values(LineError).includes(_);
}

exports.isLineError = isLineError;

function _fen(fen) {
  let sit = f.situation(fen);

  if (sit) {
    return sit;
  } else {
    return LineError.InvalidInput;
  }
}

function _ply(line, ply) {
  if (ply === 0) {
    if (ct.isFenLine(line)) {
      return f.fen(line);
    }
  }

  return LineError.NoMoveFound;
}

function _aply(line, ply, move) {
  let _sanMeta = sanApi.str2meta(move);

  if (_sanMeta) {
    if (ply === 0) {
      return LineError.AlreadySet;
    } else {
      if (ct.isFenLine(line)) {
        if (ply !== 1) {
          return LineError.NoMoveFound;
        } else {
          let res = fenLineFirstPly(line, _sanMeta);
          return res;
        }
      } else {
        if (ply >= 2) {
          return moveLineNewPly(line, ply, _sanMeta);
        } else {
          return LineError.AlreadySet;
        }
      }
    }
  } else {
    return LineError.InvalidInput;
  }
}

let _makes = new makes_1.Makes();

exports.fen = _makes.setter0(_fen, isLineError);
exports.ply = _makes.getter1(_ply);
exports.aply = _makes.setter1(_aply, isLineError);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Makes = exports.MakesError = void 0;
var MakesError;

(function (MakesError) {
  MakesError["AlreadySet"] = "already set";
  MakesError["NotSet"] = "not set";
})(MakesError = exports.MakesError || (exports.MakesError = {}));

class Makes {
  constructor() {
    this.data = new Map();
  }

  setter0(f, isApiError) {
    let data = this.data;
    return function (key, arg1) {
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
    };
  }

  setter1(f, isApiError) {
    let data = this.data;
    return function (key, a1, a2) {
      let _v = data.get(key);

      if (_v) {
        let _res = f(_v, a1, a2);

        if (isApiError(_res)) {
          return _res;
        } else {
          data.set(key, _res);
        }
      } else {
        return MakesError.NotSet;
      }
    };
  }

  getter1(f) {
    let data = this.data;
    return function (key, a1) {
      let _v = data.get(key);

      if (_v) {
        let _res = f(_v, a1);

        return _res;
      } else {
        return MakesError.NotSet;
      }
    };
  }

}

exports.Makes = Makes;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._situationAfter = exports.situationAfter = exports.get = void 0;

const db = __importStar(require("./db"));

const db2 = __importStar(require("./db2"));

const sz = __importStar(require("./sanitizes"));

const r = __importStar(require("./role"));

function get(before, sanMeta) {
  let {
    poss,
    pieces,
    actorMoves
  } = db2;
  let {
    actors
  } = db;

  let _actors = actors.query({
    pos: poss.query([sanMeta.file || "*", sanMeta.rank || "*"]),
    piece: pieces.query({
      role: sanMeta.role,
      color: before.turn
    }),
    board: before.board
  });

  return actorMoves.querz(_actors, "*").flatMap(([actor, moves]) => {
    let move = moves.find(move => move.dest === sanMeta.to);

    if (move) {
      return [move];
    } else {
      return [];
    }
  })[0];
}

exports.get = get;
exports.situationAfter = sz.sanitized(db.situations, _situationAfter);

function _situationAfter(move) {
  return {
    board: move.after,
    turn: r.otherColor(move.piece.color)
  };
}

exports._situationAfter = _situationAfter;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFenStr = void 0;

function toFenStr(piece) {
  if (piece.color === 'w') {
    return piece.role.toUpperCase();
  }

  return piece.role;
}

exports.toFenStr = toFenStr;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dopKey = exports.key = exports.rkey = exports.fkey = exports.mRankKey = exports.mFileKey = exports.mPosKey = exports.posKey2fKey = exports.posKey2rKey = exports.rByKey = exports.fByKey = exports.posKeys = exports.rankKeys = exports.fileKeys = exports.isPos = exports.mDirection = exports.isDirection = exports.directions = void 0;
exports.directions = [1, 2, 3, 4, 5, 6, 7, 8];

function isDirection(_) {
  return !!mDirection(_);
}

exports.isDirection = isDirection;

function mDirection(_) {
  if (_ >= 1 && _ <= 8) {
    return _;
  }
}

exports.mDirection = mDirection;

function isPos(_) {
  if (Array.isArray(_)) {
    if (_.length === 2) {
      return _.map(isDirection).every(_ => !!_);
    }
  }

  return false;
}

exports.isPos = isPos;
exports.fileKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
exports.rankKeys = ['1', '2', '3', '4', '5', '6', '7', '8'];
exports.posKeys = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'];

const fByKey = _ => {
  return exports.fileKeys.indexOf(_) + 1;
};

exports.fByKey = fByKey;

const rByKey = _ => {
  return exports.rankKeys.indexOf(_) + 1;
};

exports.rByKey = rByKey;

const posKey2rKey = _ => {
  return _[1];
};

exports.posKey2rKey = posKey2rKey;

const posKey2fKey = _ => {
  return _[0];
};

exports.posKey2fKey = posKey2fKey;

const mPosKey = _ => {
  if (exports.posKeys.includes(_)) {
    let i = exports.posKeys.indexOf(_);
    return exports.posKeys[i];
  }
};

exports.mPosKey = mPosKey;

function mFileKey(_) {
  if (exports.fileKeys.includes(_)) {
    let i = exports.fileKeys.indexOf(_);
    return exports.fileKeys[i];
  }
}

exports.mFileKey = mFileKey;

function mRankKey(_) {
  if (exports.rankKeys.includes(_)) {
    let i = exports.rankKeys.indexOf(_);
    return exports.rankKeys[i];
  }
}

exports.mRankKey = mRankKey;

function fkey(f) {
  return exports.fileKeys[f - 1];
}

exports.fkey = fkey;

function rkey(r) {
  return exports.rankKeys[r - 1];
}

exports.rkey = rkey;

function key(p) {
  return fkey(p[0]) + rkey(p[1]);
}

exports.key = key;

function dopKey(_) {
  if (isPos(_)) {
    return key(_);
  } else if (isDirection(_)) {
    return rkey(_);
  } else {
    return 'dopX';
  }
}

exports.dopKey = dopKey;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // export const allFiles: Array<pm.FileMeta> = [],
// allRanks: Array<pm.RankMeta> = [],
// allPoss: Array<pm.PosMeta> = [];
// export type AllFilesAccess = {
//   allFilesByKey: FileByKey,
//   allFilesByFile: FileByFile
// }
// export type AllRanksAccess = {
//   allRanksByKey: RankByKey,
//   allRanksByRank: RankByRank
// }
// export type AllPossAccess = {
//   allPossByKey: PosByKey,
//   allPossByPos: PosByPos
// }
// export type FileByKey = Map<pm.FileKey, pm.FileMeta>
// export type RankByKey = Map<pm.RankKey, pm.RankMeta>
// export type PosByKey = Map<pm.PosKey, pm.PosMeta>
// export type FileByFile = Map<ct.File, pm.FileMeta>
// export type RankByRank = Map<ct.Rank, pm.RankMeta>
// export type PosByPos = Map<ct.Pos, pm.PosMeta>
// let allRanksByKey: RankByKey = new Map(),
// allRanksByRank: RankByRank = new Map()
// allRanks.forEach(rank => {
//   allRanksByKey.set(rank.key, rank);
//   allRanksByRank.set(rank.r, rank);
// });
// let allFilesByKey: FileByKey = new Map(),
// allFilesByFile: FileByFile = new Map()
// allFiles.forEach(file => {
//   allFilesByKey.set(file.key, file);
//   allFilesByFile.set(file.f, file);
// });
// let allPossByKey: PosByKey = new Map(),
// allPossByPos: PosByPos = new Map()
// allPoss.forEach(pos => {
//   allPossByKey.set(pos.key, pos);
//   allPossByPos.set(pos.p, pos);
// });
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
}); // export interface PosMeta {
//   p: ct.Pos,
//   key: PosKey,
//   dFile: Map<dt.Displace0, PosMeta>,
//   dRank: Map<dt.Displace0, PosMeta>,
//   dPos: Map<dt.Displace1, PosMeta>,
//   dPos2: Map<dt.Displace2, Array<PosMeta>>
// }
// export interface FileMeta {
//   f: ct.File,
//   key: FileKey,
//   dRank: Map<dt.Displace0, PosMeta>,
//   dFile: Map<dt.Displace0, FileMeta>,
// }
// export interface RankMeta {
//   r: ct.Rank,
//   key: RankKey,
//   dFile: Map<dt.Displace0, PosMeta>,
//   dRank: Map<dt.Displace0, RankMeta>
// }
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.otherColor = exports.mColor = exports.mRole = exports.isRole = void 0;

function isRole(_) {
  return !mRole(_);
}

exports.isRole = isRole;
let roles = ['r', 'b', 'n', 'q', 'k', 'p'];

function mRole(str) {
  let _ = str.toLowerCase();

  if (roles.includes(_)) {
    return _;
  }
}

exports.mRole = mRole;

function mColor(str) {
  let _ = str.toLowerCase();

  if (roles.includes(_)) {
    if (_ === str) {
      return 'b';
    } else {
      return 'w';
    }
  }
}

exports.mColor = mColor;

function otherColor(color) {
  return color === 'w' ? 'b' : 'w';
}

exports.otherColor = otherColor;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.san2san2 = exports.isSan2 = exports.san2meta = exports.sBool = exports.str2meta = void 0;

const p = __importStar(require("./pos"));

const r = __importStar(require("./role"));

const db2 = __importStar(require("./db2"));

let {
  poss
} = db2;

function str2meta(str) {
  if (!isSan2(str)) {
    let str2 = san2san2(str);

    if (str2) {
      return san2meta(str2);
    }
  } else {
    return san2meta(str);
  }
}

exports.str2meta = str2meta;

function sBool(str) {
  if (str === '') {
    return false;
  }

  return true;
}

exports.sBool = sBool;

function san2meta(san2) {
  let res = san2.split(' ');
  let [roleS, fileS, rankS, captureS, toS, promotionS, checkS, mateS] = res;
  let mate = sBool(mateS),
      check = sBool(checkS),
      capture = sBool(captureS),
      mRankKey = p.mRankKey(rankS),
      mFileKey = p.mFileKey(fileS);
  let rank = mRankKey ? p.rByKey(mRankKey) : undefined;
  let file = mFileKey ? p.fByKey(mFileKey) : undefined;
  let mrole = r.mRole(roleS),
      promotion = r.mRole(promotionS);
  let mToKey = p.mPosKey(toS);

  if (mToKey) {
    let toFKey = p.posKey2fKey(mToKey),
        toRKey = p.posKey2rKey(mToKey),
        toF = p.fByKey(toFKey),
        toR = p.rByKey(toRKey),
        to = poss.pget(toF, toR);

    if (to) {
      return {
        file,
        rank,
        check,
        mate,
        capture,
        promotion,
        to,
        role: mrole ? mrole : 'p'
      };
    }
  }
}

exports.san2meta = san2meta;

function isSan2(str) {
  let res = str.split(' ');

  if (res.length === 8) {
    let [role, file, rank, capture, to, promotion, check, mate] = res;
    let RES = [/N|B|R|Q|K|/, /[a-h]?/, /([1-8]?)/, /(x?)/, /([a-h][0-9])/, /(=?[NBRQ]?)/, /(\+?)/, /(\#?)/];

    for (let key in RES) {
      if (!res[key].match(RES[key])) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
}

exports.isSan2 = isSan2;

function san2san2(san) {
  let RE = /(N|B|R|Q|K|)([a-h]?)([1-8]?)(x?)([a-h][0-9])(=?[NBRQ]?)(\+?)(\#?)/;
  let m = san.match(RE);

  if (m) {
    let [_, role, file, rank, capture, to, promotion, check, mate] = m;
    let res = [role, file, rank, capture, to, promotion, check, mate].join(' ');
    return res;
  }
}

exports.san2san2 = san2san2;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SanitizedSpace2 = exports.Sanitizes = exports.sanitizedU = exports.sanitized = exports.Sanitized = void 0;

const isequal_1 = require("./isequal");

var Sanitized;

(function (Sanitized) {})(Sanitized = exports.Sanitized || (exports.Sanitized = {}));

const sanitized = (szer, cb) => (...args) => szer.get(cb(...args));

exports.sanitized = sanitized;

const sanitizedU = (szer, cb) => (a, ...args) => {
  let _a = cb(a, ...args);

  if (_a) {
    return szer.get(_a);
  }
};

exports.sanitizedU = sanitizedU;

class Sanitizes {
  constructor() {
    this.world = [];
  }

  query(a) {
    return this.world.filter(_ => {
      return isequal_1.mapmatch(_, a);
    });
  }

  get(a) {
    let _a = this.world.find(_ => isequal_1.isEqualAny(a, _));

    if (_a) {
      return _a;
    } else {
      this.world.push(a);
      return a;
    }
  }

}

exports.Sanitizes = Sanitizes;

class SanitizedSpace2 {
  constructor(make, mA, mB) {
    this.make = make;
    this.mA = mA;
    this.mB = mB;
    this.space = new Sanitizes();
  }

  query(mc) {
    return this.space.query(mc);
  }

  get(c) {
    return this.space.get(c);
  }

  pget(a, b) {
    return this.space.get(this.make(a, b));
  }

  nget(sa, sb) {
    return this.mget(this.mA(sa), this.mB(sb));
  }

  mget(ma, mb) {
    if (ma && mb) {
      return this.pget(ma, mb);
    }
  }

}

exports.SanitizedSpace2 = SanitizedSpace2;
"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = void 0;

function union(setA, setB) {
  let _union = new Set(setA);

  for (let elem of setB) {
    _union.add(elem);
  }

  return _union;
}

exports.union = union;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util2_1 = require("./util2");

const util_1 = require("./util");

const sz = __importStar(require("../sanitizes"));

const isequal_1 = require("../isequal");

function default_1() {
  util_1.it('tests equality', () => {
    util_1.nac('3 4', !isequal_1.isEqualAny(3, 4));
    util_1.nac('p equal', isequal_1.mapmatch({
      a: '1',
      b: '2',
      c: '3'
    }, {
      a: '1',
      b: '*',
      c: '*'
    }));
  });
  util_1.it.only('sanitizes numbers', () => {
    let dirs = new sz.Sanitizes();
    util_1.nacc('san 3 3', dirs.get(3), dirs.get(3));
    util_1.nac('san 3 4', dirs.get(3) !== dirs.get(4));
  });
  util_1.it('sanitizes arrays', () => {
    let poss = new sz.Sanitizes();
    let a = [3];
    util_1.nac(`returns same type`, util2_1.deepeq(poss.get(a), [3]));
    util_1.nac('san [3] [3]', poss.get([3]) === a);
    util_1.nac('san [3] [4]', poss.get([4]) !== a);
  });
  util_1.it('sanitizes maps', () => {
    let boards = new sz.Sanitizes();
    let thr = [3],
        four = [4];
    let exp = new Map();
    exp.set(thr, "three");
    let m = new Map();
    m.set(thr, "three");
    util_1.nac(`returns same type`, util2_1.deepeq(boards.get(m), exp));
    m.set(four, "four");
    exp.set(four, "four");
    util_1.nac(`returns ref equal`, boards.get(exp) === m);
  });
  util_1.it('sanitizes objects', () => {
    let boards = new sz.Sanitizes();
    let a = {
      role: 'b',
      color: 'w'
    };
    let b = {
      role: 'b',
      color: 'w'
    };
    util_1.nac('ref equal', boards.get(a) === a);
    util_1.nac('a b', boards.get(b) === a);
  });

  function key2pos(key) {
    return {
      file: key[0],
      rank: key[1]
    };
  }

  let poss = new sz.Sanitizes();
  let boards = new sz.Sanitizes();
  util_1.it('queries objects', () => {
    ['a1', 'b1', 'c1', 'a2', 'a3'].forEach(_ => {
      poss.get(key2pos(_));
    });
    let res = poss.query({
      file: 'a',
      rank: '*'
    });
    let afiles = ['a1', 'a2', 'a3'].map(key2pos);
    util_1.nac('a file', util2_1.deepeq(res, afiles));
  });
  util_1.it("queries nested objects", () => {
    ['a1', 'b1', 'c1', 'a2', 'a3'].forEach(_ => {
      let p = poss.get(key2pos(_));
      let p2 = poss.get(key2pos(_));
      boards.get({
        p1: p,
        p2
      });
    });
    let res2 = boards.query({
      p1: poss.query({
        file: "c",
        rank: "*"
      }),
      p2: "*"
    });
    console.log(res2);
  });
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util2_1 = require("./util2");

const util_1 = require("./util");

const db2 = __importStar(require("../db2"));

const a = __importStar(require("../actor"));

const f = __importStar(require("../fen"));

let {
  poss,
  pieces
} = db2;

function default_1() {
  let initialSituation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  let {
    board,
    turn
  } = initialSituation;
  util_1.it('makes moves', () => {
    let pos = poss.nget(2, 2);
    let piece = pieces.nget('P', 'P');
    let res = a.moves({
      board,
      piece,
      pos
    });
    util_1.nac('moves', !util2_1.deepeq(res, []));
  });
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const cz = __importStar(require("../calculates"));

function default_1() {
  const pkey = str => ({
    file: str[0],
    rank: str[1]
  });

  util_1.it('calculates lazy vals', () => {
    let ci = 0;
    let sums = new cz.Calculates(pos => {
      ci++;
      return {
        fandr: pos.rank + pos.file
      };
    });
    let poss = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c5'].map(pkey);
    let res = sums.querz(poss, {
      fandr: "1a"
    });
    util_1.nacc('called once', ci, poss.length);
    sums.querz(poss, {
      fandr: "1a"
    });
    util_1.nacc('called once', ci, poss.length);
  });
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const util2_1 = require("./util2");

const f = __importStar(require("../fen"));

const s = __importStar(require("../san"));

const db2 = __importStar(require("../db2"));

let {
  poss
} = db2;

function default_1() {
  util_1.it('validates san', () => {
    util_1.nac('Nf6', s.str2meta('Nf6'));
    util_1.nac('e4', s.str2meta('e4'));
  });
  util_1.it('finds positions', () => {
    util_1.nac('1 1', util2_1.deepeq(poss.nget(1, 1), [1, 1]));
    util_1.nac('1 8', util2_1.deepeq(poss.nget(1, 8), [1, 8]));
    util_1.nac('1 10', util2_1.deepeq(poss.nget(1, 10), undefined));
  });
  util_1.it('creates board', () => {
    const situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

    if (!situation) {
      return '! situation';
    }

    let {
      board
    } = situation;
    util_1.nacc('32 pieces', board.size, 32);
    util_1.qed('w p at 2 2', board.get(poss.nget(2, 2) || {}), {
      role: 'p',
      color: 'w'
    });
  }); // console.log(s.san2meta('Nbe4+'));
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const util2_1 = require("./util2");

const dir = __importStar(require("../direction"));

const dt = __importStar(require("../dtypes"));

const p = __importStar(require("../pos"));

const v = __importStar(require("../visual"));

const db2 = __importStar(require("../db2"));

function pos(f, r) {
  let d = 1;
  return db2.poss.pget(p.mDirection(f) || d, p.mDirection(r) || d);
}

function default_1() {
  util_1.it('displaces on 0 direction', () => {
    let t = [[-8, 1, undefined], [-1, 1, undefined], [8, 3, undefined], [7, 1, 8], [1, 3, 4]];
    t.forEach(([di, d, res]) => {
      let _d = dir.ddir0(di, d);

      util_1.nacc(` ${di} ${d} != `, _d, res);
    });
  });
  util_1.it('displaces on position', () => {
    let t = [[[0, 0], pos(1, 1), pos(1, 1)], [[1, 0], pos(1, 1), pos(2, 1)], [[4, -3], pos(4, 4), pos(8, 1)], [[-1, 0], pos(1, 1), undefined], [[-5, 7], pos(1, 1), undefined]];
    t.forEach(([d1, _p, res]) => {
      let _d = dir.ddir1(d1, _p);

      if (res && _d) {
        util_1.nacc(`expected ${p.key(res)} got ${p.key(_d)}`, res, _d);
      } else if (!res && !_d) {} else if (!res && _d) {
        util_1.cry(`expected undefined got ${p.key(_d)}`);
      } else if (!_d && res) {
        util_1.cry(`expected ${p.key(res)} got undefined`);
      }
    });
  });
  util_1.it('displaces displace2', () => {
    let t = [[dt.DKnight, pos(1, 1), new Set([pos(3, 2), pos(2, 3)])], [dt.DKnight, pos(4, 4), new Set([pos(5, 6), pos(5, 2), pos(3, 6), pos(3, 2), pos(6, 5), pos(6, 3), pos(2, 5), pos(2, 3)])]];
    t.forEach(([d2, _p, expected]) => {
      let got = dir.ddir2(d2, _p);
      util_1.nac(`got ${v.str(got)} != expected ${v.str(expected)}`, util2_1.deepeq(got, expected));
    });
  });
  util_1.it('routes for direction', () => {
    let t = [[0, 1, [1]], [1, 1, [1, 2, 3, 4, 5, 6, 7, 8]], [-1, 4, [4, 3, 2, 1]]];
    t.forEach(([d0, _d, expected]) => {
      let got = dir.rroute0(d0, _d);
      util_1.nac(`got ${v.str(got)} !== expected ${v.str(expected)}`, util2_1.deepeq(got, expected));
    });
  }); // [0,1] [1,6]
  // [1]
  // [6,7,8]
  // [1,6] [1,7] [1,8]
  // [2,1] [1,6]
  // [1,3,5,7]
  // [6,7,8]
  // [1,6] [3,7] [5,8]

  util_1.it('routes for position', () => {
    let t = [[[0, 0], pos(1, 1), [pos(1, 1)]], [[0, 1], pos(1, 6), [pos(1, 6), pos(1, 7), pos(1, 8)]], [[1, 1], pos(4, 5), [pos(4, 5), pos(5, 6), pos(6, 7), pos(7, 8)]], [[-2, 1], pos(4, 5), [pos(4, 5), pos(2, 6)]]];
    t.forEach(([d1, _p, expected]) => {
      let got = dir.rroute1(d1, _p);
      util_1.nac(`got ${v.str(got)} !== expected ${v.str(expected)}`, util2_1.deepeq(got, expected));
    });
  });
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const db2 = __importStar(require("../db2"));

const f = __importStar(require("../fen"));

function default_1() {
  let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  let situation = f.situation(fen);
  let d1 = db2.poss.nget(4, 1);
  let wQ = {
    role: 'q',
    color: 'w'
  };
  let wP = {
    role: 'p',
    color: 'w'
  };
  util_1.it('fen', () => {
    let d1Q = situation.board.get(d1);
    util_1.qed('d1 Q', d1Q, wQ);
    util_1.qed('same fen', f.fen(situation), fen);
  });
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const san_1 = require("../san");

const f = __importStar(require("../fen"));

const h = __importStar(require("../history"));

const m = __importStar(require("../move"));

function default_1() {
  let situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  let e4 = san_1.str2meta('e4');
  let e5 = san_1.str2meta('e5');
  let a6 = san_1.str2meta('a6');
  let wP = {
    role: 'p',
    color: 'w'
  };
  util_1.it('history', () => {
    let first = h.first(situation, e4);

    if (!first) {
      return '! 1. e4';
    }

    util_1.qed('1 move', first.length, 1);
    util_1.qed('1. e4', f.fen(m.situationAfter(first[0])), 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
    let twoA6 = h.add(first, a6);

    if (!twoA6) {
      return '! 2. a6';
    }

    util_1.qed('2 move', twoA6.length, 2);
    util_1.qed('1. e4 a6', f.fen(m.situationAfter(twoA6[1])), 'rnbqkbnr/1ppppppp/p7/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1');
    let threeE5 = h.add(twoA6, e5);

    if (!threeE5) {
      return '! 2. a6';
    }

    util_1.qed('2 move', threeE5.length, 3);
    util_1.qed('1. e4 a6 2. e5', f.fen(m.situationAfter(threeE5[2])), 'rnbqkbnr/1ppppppp/p7/4P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1');
  });
  util_1.it.only('makes moves', () => {
    let seed = undefined;
    let hfinal = 'e4 a5 Nf3 Nf6 g3 g6 e5 a4'.split(' ').map(_ => san_1.str2meta(_)).reduce((acc, _) => {
      if (!acc) {
        return h.first(situation, _);
      } else {
        return h.add(acc, _);
      }
    }, seed);

    if (!hfinal) {
      return '! no history';
    }

    util_1.qed('8 moves', hfinal.length, 8);
    util_1.qed('correct ', f.fen(m.situationAfter(hfinal[7])), 'rnbqkb1r/1ppppp1p/5np1/4P3/p7/5NP1/PPPP1P1P/RNBQKB1R w KQkq - 0 1');
  });
}

exports.default = default_1;
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const makes_1 = __importDefault(require("./makes"));

const core_1 = __importDefault(require("./core"));

const _util_1 = __importDefault(require("./_util"));

const line_1 = __importDefault(require("./line"));

const actor_1 = __importDefault(require("./actor"));

const routes_1 = __importDefault(require("./routes"));

const calcutes_1 = __importDefault(require("./calcutes"));

const direction_1 = __importDefault(require("./direction"));

const history_1 = __importDefault(require("./history"));

const fen_1 = __importDefault(require("./fen"));

const move_1 = __importDefault(require("./move"));

function default_1() {
  util_1.tMo(makes_1.default);
  util_1.tMo(direction_1.default);
  util_1.tMo(_util_1.default);
  util_1.tMo(core_1.default);
  util_1.tMo(line_1.default);
  util_1.tMo(calcutes_1.default);
  util_1.tMo(routes_1.default);
  util_1.tMo(move_1.default);
  util_1.tMo(actor_1.default);
  util_1.tMo.only(history_1.default);
  util_1.tMo(fen_1.default);
  util_1.run();
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const l = __importStar(require("../line"));

function default_1() {
  let ifen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  util_1.it('makes ply', () => {
    let res = l.fen('line0', 'fen');
    util_1.nacc('invalid input', res, l.LineError.InvalidInput);
    res = l.fen('line0', ifen);
    util_1.nac('good fen', !res);
    let pres = l.ply('line0', 1);
    util_1.nacc('no move ply 1', pres, l.LineError.NoMoveFound);
    pres = l.ply('line0', 0);
    util_1.nacc('move ply 0', pres, ifen);
    let apres = l.aply('line0', 0, 'san');
    util_1.nacc('invalid input', apres, l.LineError.InvalidInput);
    apres = l.aply('line0', 0, 'Nf6');
    util_1.nacc('already set', apres, l.LineError.AlreadySet);
    apres = l.aply('line0', 2, 'Nf6');
    util_1.nacc('fen line no move found 2', apres, l.LineError.NoMoveFound);
    apres = l.aply('line0', 1, 'e4');
    util_1.nac('set san 1 ok', !apres);
    apres = l.aply('line0', 1, 'Nf6');
    util_1.nacc('already set ply 1', apres, l.LineError.AlreadySet);
    apres = l.aply('line0', 2, 'e5');
    util_1.nac('set san 2 ok', !apres);
    apres = l.aply('line0', 2, 'e5');
    util_1.nacc('already set ply 2', apres, l.LineError.AlreadySet);
    apres = l.aply('line0', 3, 'e7');
    util_1.nacc('cant make move e7', apres, l.LineError.CantMakeMove);
  });
  util_1.it('can make move', () => {
    let res = l.fen('line3', ifen);
    let apres = l.aply('line3', 1, 'e4');
    util_1.qed('set san 1 ok', apres, undefined);
    apres = l.aply('line3', 2, 'e5');
    util_1.qed('set san 2 ok', apres, undefined);
  });
  util_1.it('cant make invalid moves', () => {
    l.fen('line1', ifen);
    util_1.qed('1. e6', l.aply('line1', 1, 'e6'), l.LineError.CantMakeMove);
    util_1.qed('1. e4', l.aply('line1', 1, 'e4'), undefined);
  });
  util_1.it.only('plays a game', () => {
    l.fen('lineg', ifen);
    'e4 e5 g4 g6'.split(' ').forEach((_, i) => {
      util_1.qed(`${i + 1}. ${_}`, l.aply('lineg', i + 1, _), undefined);
    });
  });
}

exports.default = default_1;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const makes_1 = require("../makes");

var ApiError;

(function (ApiError) {
  ApiError["BelowZero"] = "bz";
  ApiError["IsZero"] = "iz";
  ApiError["AboveZero"] = "az";
  ApiError["TooLong"] = "tl";
})(ApiError || (ApiError = {}));

function isApiError(_) {
  return Object.values(ApiError).includes(_);
}

function test() {
  util_1.it('makes', () => {
    let api = {
      makeString(_) {
        if (_ === 0) {
          return ApiError.IsZero;
        } else {
          return "api" + _;
        }
      },

      addString(pre, _, o) {
        if (pre.length > 5) {
          return ApiError.TooLong;
        } else {
          return pre + _;
        }
      },

      getString(pre, _) {
        return pre + _;
      }

    };
    let m = new makes_1.Makes();
    let buildNoZero = m.setter0(api.makeString, isApiError);
    let addNumberUpto5 = m.setter1(api.addString, isApiError);
    let returnValueAndNumber = m.getter1(api.getString);
    util_1.nacc('build zero', buildNoZero('line3', 0), ApiError.IsZero);
    buildNoZero('line3', 3);
    util_1.nacc('make by value', returnValueAndNumber('line3', 9), 'api39');
    util_1.nacc('make by value', buildNoZero('line3', 2), 'already set');
    buildNoZero('line2', 4);
    util_1.nacc('make by value', returnValueAndNumber('line2', 9), 'api49');
    util_1.nacc('no line set', addNumberUpto5('line10', 4, 0), 'not set');
    addNumberUpto5('line3', 4, 0);
    util_1.nacc('yes line set', returnValueAndNumber('line3', 8), 'api348');
    addNumberUpto5('line3', 5, 0);
    util_1.nacc('too long', addNumberUpto5('line3', 4, 0), 'tl');
    util_1.nacc('retvalnum', returnValueAndNumber('line3', 8), 'api3458');
  });
}

exports.default = test;
;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const san_1 = require("../san");

const f = __importStar(require("../fen"));

const m = __importStar(require("../move"));

function default_1() {
  let situation = f.situation('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  let e4 = san_1.str2meta('e4');
  let wP = {
    role: 'p',
    color: 'w'
  };
  util_1.it('actors', () => {
    let oneE4 = m.get(situation, e4);

    if (!oneE4) {
      return '! 1. e4';
    }

    util_1.qed('1. e4', oneE4.piece, wP);
    util_1.qed("b's turn", m.situationAfter(oneE4).turn, "b");
  });
}

exports.default = default_1;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const util_1 = require("./util");

const p = __importStar(require("../pos"));

const dt = __importStar(require("../dtypes"));

const db2 = __importStar(require("../db2"));

const dir = __importStar(require("../direction"));

function default_1() {
  let a1 = db2.poss.nget(1, 1);
  let d4 = db2.poss.nget(4, 4);
  util_1.it('gets route0', () => {
    let r0dir = dir.rroute0(1, 7);
    util_1.qed('r0 -1 1', r0dir, [7, 8]);
    r0dir = dir.rroute0(-1, 2);
    util_1.qed('r0 -1 1', r0dir, [2, 1]);
  });
  util_1.it('gets route1', () => {
    let res = dir.rroute1([3, 3], a1);
    util_1.qed('d [1 1] a1', res, [[1, 1], [4, 4], [7, 7]]);
    res = dir.rroute1([-1, 3], a1);
    util_1.qed('d [-1 3] a1', res, [[1, 1]]);
    let resflat = dir.rrouteflat1(new Set([[-1, 3]]), a1);
    util_1.qed('d [-1 3] a1', [...resflat], []);
  });
  util_1.it('route0 d4', () => {
    let res = dir.rroute2(dt.DKnight, d4); // console.log(res);
  });
  util_1.it('gets route2', () => {
    let res = dir.rrouteflat1(dt.DKnight, d4);
    util_1.qed('N@d4', [...res].map(p.dopKey), ['f3', 'f5', 'b3', 'b5', 'c2', 'c6', 'e2', 'e6']);
  });
}

exports.default = default_1;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qed = exports.nac = exports.nacc = exports.cry = exports.jss = exports.it = exports.runtests = exports.tMo = exports.run = void 0;

const util2_1 = require("./util2");

function testFailed(t) {
  console.log(`❌ ${t.msg} ${t.fail}`);
}

function testThrowed(t) {
  console.log(`💀 ${t.msg} ${t.err}`);
}

function testBegin(t) {
  console.log(`${t.msg}`);
}

let tmos = [],
    onlytmos = [];
let onlyset = [];
let stset = [];

function run() {
  let _tmos = onlytmos.length > 0 ? onlytmos : tmos;

  _tmos.forEach(_ => _());

  runtests();
}

exports.run = run;

exports.tMo = (() => {
  let res = fn => {
    tmos.push(fn);
  };

  res.only = fn => {
    onlytmos.push(fn);
  };

  return res;
})();

function runtests() {
  let errs = [];
  let i = 0;
  let testOnly = onlyset.length > 0 ? onlyset : stset;
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
  testOnly.filter(_ => !!_.fail).forEach(testFailed);
  testOnly.filter(_ => !!_.err).forEach(testThrowed);
  console.log(`done ${i}`);
}

exports.runtests = runtests;

function it(msg, fn) {
  let test = {
    msg,
    fn
  };
  stset.push(test);
}

exports.it = it;

it.only = (msg, fn) => {
  let test = {
    msg,
    fn
  };
  onlyset.push(test);
};

function jss(o, msg) {
  console.log(JSON.stringify(o), msg);
}

exports.jss = jss;

function cry(msg, o) {
  let oS = JSON.stringify(o);
  console.log(`❌ ${msg} ` + oS);
}

exports.cry = cry;

function nacc(msg, a, b) {
  if (a !== b) {
    cry(`${msg} got`, a);
  }
}

exports.nacc = nacc;

function nac(msg, a) {
  if (!a) {
    cry(msg);
  }
}

exports.nac = nac;

function qed(msg, a, b) {
  if (!util2_1.deepeq(a, b)) {
    cry(`${msg} got`, a);
  }
}

exports.qed = qed;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arreq = exports.seteq = exports.deepeq = void 0;

function deepeq(a, b) {
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

exports.deepeq = deepeq;

function seteq(a, b) {
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

exports.seteq = seteq;

function arreq(a, b) {
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

exports.arreq = arreq;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMoveLine = exports.isFenLine = void 0;

function isFenLine(_) {
  return !isMoveLine(_);
}

exports.isFenLine = isFenLine;

function isMoveLine(_) {
  return _.parent !== undefined;
}

exports.isMoveLine = isMoveLine;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seqable = exports.seqMaybe = void 0;

function seqMaybe(a, fn, ...args) {
  return a ? fn(a, ...args) : undefined;
}

exports.seqMaybe = seqMaybe;

const seqable = cb => (x, ...args) => typeof x === "undefined" ? undefined : cb(x, ...args);

exports.seqable = seqable;
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str = void 0;

const dir = __importStar(require("./direction"));

const p = __importStar(require("./pos"));

const fa = p.dopKey;

function str(a) {
  if (dir.isRoute0(a)) {
    return '<R0 ' + a.map(_ => fa(_)).join(' ') + '>';
  } else if (dir.isRoute1(a)) {
    return '<R1 ' + a.map(_ => str(_)).join(' ') + '>';
  } else if (a instanceof Set) {
    return '{' + [...a].map(_ => fa(_)).join(' ') + '}';
  } else if (Array.isArray(a)) {
    if (a.length === 0) {
      return '[]';
    } else if (Array.isArray(a[0])) {} else return '[' + a.map(_ => fa(_)).join(' ') + ']';
  }

  return 'unknown';
}

exports.str = str;
