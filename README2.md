
    let fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    let ply = 1

    // add a line with fen
    // returns line | error "fen already defined" | error "invalid fen"
    fen(fen: string): line | error

    // add a move to a line
    // returns line | error "move already defined" | error "invalid move"
    aply(line: line, ply: number, move: string): line | error

    // get the situation on given move
    // returns situation | error "move not played"
    ply(line: line, ply: number): situation | error

    
