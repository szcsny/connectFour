import React from "react";
import LOGO from "./images/logo.svg";
import PLAYER1 from "./images/player-one.svg";
import PLAYER2 from "./images/player-two.svg";
import InGameMenu from "./InGameMenu";
import GameBoard from "./GameBoard";

export default function GameScreen(props) {
    const [time, setTime] = React.useState(20);
    const [currentPlayer, setCurrentPlayer] = React.useState(1);
    const [points, setPoints] = React.useState({player1: 0, player2: 0, cpu: 0});
    const [showSummary, setShowSummary] = React.useState(false);
    const [boardStatus, setBoardStatus] = React.useState([ [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0],
                                                                    [0, 0, 0, 0, 0, 0, 0]])

    React.useEffect(() => {
        setTimeout(() => {
            if(time > 0) {
                setTime(prev => prev-1);
            }
            else {
                setCurrentPlayer(prev => {
                    if(prev === 1) {
                        return 2;
                    }
                    else {
                        return 1;
                    }
                })

                setTime(20);
            }
        }, 1000);
    }, [time]);

    function addChip(column) {
        for(let i=boardStatus.length - 1; i>=0; i--){
            if(!boardStatus[i][column]) {
                boardStatus[i][column] = currentPlayer;
            }
        }
    }

    return (
        <div id="game-screen">
            {props.showMenu && <InGameMenu toggleMenu={props.toggleInGameMenu} switchPage={props.switchPage}/>}

            <div className="top-bar">
                <button id="ingame-menu-btn" onClick={props.toggleInGameMenu}>Menu</button>
                <img src={LOGO} />
                    <button id="restart-btn">Restart</button>
            </div>
            <div className="players-panel">
                <div className="player-panel">
                    <img className="player-one-img" src={PLAYER1} />
                        <h3>Player 1</h3>
                        <p id="player-one-points">0</p>
                </div>
                <div className="player-panel">
                    <h3>Player 2</h3>
                    <p id="player-two-points">0</p>
                    <img className="player-two-img" src={PLAYER2} />
                </div>
            </div>

            <GameBoard onClick={addChip}/>

            {!showSummary && <div id="timer">
                <h3 id="turn-indicator">Player {currentPlayer}'s turn</h3>
                <p id="time-remaining">{time}s</p>
            </div>}
            {showSummary && <div id="summary-panel">
                <h3 id="winner-indicator">Player {currentPlayer}</h3>
                <p>Wins</p>
                <button id="play-again-button">Play again</button>
            </div>}
        </div>
    )
}