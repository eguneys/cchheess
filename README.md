## API

    We have this api to work with ct.Line type:

    enum LineError {
      AlreadySet,
      InvalidInput,
      NoMoveFound
    }

    function fen(fen: string): ct.Line | LineError {
      return LineError.InvalidInput
      return {
        board: new Map(),
        turn: "w"
      }
    }

    function ply(line: ct.Line, ply: number): ct.Situation | LineError {
      return LineError.NoMoveFound
    }

    function aply(line: ct.Line, ply: number, move: string): ct.Line | LineError {
      return LineError.InvalidInput
      return LineError.AlreadySet
    }


    `fen` takes a fen and builds a new line
    `aply` takes a line and a move and builds a new line
    `ply` takes a line a move and a ply and returns some other value

    We need to manage these line objects to use this api, through line keys.
    a line key is a string that references a line.
    So we need another api to associate line keys with lines

    enum LineKeyResult {
      NotSet
      AlreadySet
    }

    setter0(linekey, fen): LineKeyResult | Api Result {
        return LineKeyResult.AlreadySet
        return Api Result
    }

    setter1(linekey, ply, move): LineKeyResult | Api Result {
        return LineKeyError.NotSet
        return Api Result
    }

    getter0(linekey, ply): LineKeyResult | Api Result {
        return LineKeyResult.NotSet
        return Api Result
    }

    setter0 maps linekey to return value of fen function
    setter1 gets line associated with line key and reassociates it with aply function's return value
    setter0 is same as setter1 except it doesn't associate the api functions return value



## Model

SanMeta

    [role,file,rank,capture,to,promotion,check,mate].join(' ')


Fen

    rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

Line
    FenLine | MoveLine

FenLine
    Situation

MoveLine
    parent Line
    History

History
    Array<MoveWithPly>

MoveWithPly
    Move
    Ply

Move
    before: Situation
    after: Situation
    san: San
    uci: Uci
    meta: SanMeta

Situation
    Board Turn

Piece 
    Color Role

Pos
    file File
    rank Rank

Board 
    Map<Pos, Piece>
    FenMeta

    key Pos[]
    color role Piece[]
    fen FenMeta[]
    fenMeta Board
    board turn Situation
    before san Move

    Board (FenMeta)
        Pos
        Piece
        FenMeta

    Situation
        Board

    Move
