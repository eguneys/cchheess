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
    Fen
    Map<Pos, Piece>
