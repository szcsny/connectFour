function winAlert(board) {
    let retValue = {
        winner: 0,
        winLine: []
    }
    
    for(let i = board.length - 1; i >= 0; i--) {
        const n = board[i].length;
        for(let j = 0; j < n; j++) {
            if(board[i][j]) {
                //check verticals
                if(i > 2){
                    if([board[i-1][j], board[i-2][j], board[i-3][j]].every(item => item === board[i][j])){
                        retValue = {
                            winner: board[i][j],
                            winLine: [[i,j], [i-1,j], [i-2,j], [i-3,j]]
                        }
                    }
                    //check diagonals
                    else if(j < 4){
                        if([board[i-1][j+1], board[i-2][j+2], board[i-3][j+3]].every(item => item === board[i][j])){
                            retValue = {
                                winner: board[i][j],
                                winLine: [[i,j], [i-1,j+1], [i-2,j+2], [i-3,j+3]]
                            }
                        }
                    }
                    else if(j > 2){
                        if([board[i-1][j-1], board[i-2][j-2], board[i-3][j-3]].every(item => item === board[i][j])){
                            retValue = {
                                winner: board[i][j],
                                winLine: [[i,j], [i-1,j-1], [i-2,j-2], [i-3,j-3]]
                            }
                        }
                    }
                }
                //check horizontals
                if(j < 4){
                    if([board[i][j+1], board[i][j+2], board[i][j+3]].every(item => item === board[i][j])){
                        retValue = {
                            winner: board[i][j],
                            winLine: [[i,j], [i,j+1], [i,j+2], [i,j+3]]
                        }
                    }
                }
            }
        }
    }
    return retValue;
}

const imagesDict = {
    "red": {
        
    }
}

export {winAlert};