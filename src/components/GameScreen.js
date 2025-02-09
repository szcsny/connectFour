import {useState, useEffect} from "react";
import LOGO from "../images/logo.svg";
import InGameMenu from "./InGameMenu";
import GameBoard from "./GameBoard";
import {winAlert} from "../gameLogicUtil";

import "./GameScreen.css";
import { useSettings } from "../context/SettingsContext";
import { imagesDict } from "../imagesUtil";
import RestartPanel from "./RestartPanel";
import EndPanel from "./EndPanel";

export default function GameScreen(props) {
    const {config, setConfig} = useSettings();

    const [showInGameMenu, setShowInGameMenu] = useState(false);
    const [showRestartPanel, setShowRestartPanel] = useState(false);
    
    const [time, setTime] = useState(config.timer); // for game duration
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [winner, setWinner] = useState(0); //1, 2 for players, 0 for no winner yet
    const [points, setPoints] = useState([0, 0]); //for players 1 and 2 respectively
    const [winLine, setWinline] = useState([]);
    const [round, setRound] = useState(1);
    const [isTie, setIsTie] = useState(false);
    const [boardStatus, setBoardStatus] = useState([ [0, 0, 0, 0, 0, 0, 0],
                                                    [0, 0, 0, 0, 0, 0, 0],
                                                    [0, 0, 0, 0, 0, 0, 0],
                                                    [0, 0, 0, 0, 0, 0, 0],
                                                    [0, 0, 0, 0, 0, 0, 0],
                                                    [0, 0, 0, 0, 0, 0, 0]]);

    function toggleInGameMenu() {
        setShowInGameMenu(prev => !prev);
    }

    const isEndGame = ((round === config.rounds) && winner > 0);
    
    // Setting up the timer                                                      
    useEffect(() => {
        const timeOut = setTimeout(() => {
            if(time > 0 && !showInGameMenu){
                setTime(prev => prev - 1);
            }
            else if(time === 0) {
                setCurrentPlayer(prev => prev === 1 ? 2 : 1);
                setTime(config.timer);
            }
        }, 1000);

        return () => clearTimeout(timeOut);
        
    }, [time, showInGameMenu]);
    
    
    function updateGame(event) {
        /* UPDATES GAME BOARD STATUS, TIME AND CURRENT PLAYER AFTER CLICK EVENT */
        const element = event.target;
        const rect = element.getBoundingClientRect();
        const startX = event.clientX - rect.left;
        const colWidth = rect.width / 7;
        const colIndex = Math.floor(startX / colWidth);

        let copycat = boardStatus;
        for(let i=copycat.length - 1; i>=0; i--){
            if(!copycat[i][colIndex]) {
                copycat[i][colIndex] = currentPlayer;
                break;
            }
        }
        setBoardStatus(copycat);

        const winData = winAlert(boardStatus);
        if(winData.winner){
            endGame(winData);
        }

        let isTie = true;

        for(const row of boardStatus){
            for(const item of row){
                if(item === 0){
                    isTie = false;
                }
            }
        }

        if(isTie){
            setIsTie(true);
        }

        setCurrentPlayer(prev => prev === 1 ? 2 : 1);
        setTime(config.timer);
    }

    function newRound(){
        setRound(prev => prev + 1);
        setCurrentPlayer(round % 2 + 1);
        setWinner(0);
        setWinline([]);
        setIsTie(false);
        setBoardStatus([ [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0]])
        setTime(config.timer);
    }

    function restartGame(){
        newRound();
        setRound(1);
        setPoints([0, 0]);
        setShowRestartPanel(false);
    }

    function endGame(winData){
        setWinner(winData.winner);
        setPoints(prev => {
            let newArr = [...prev];
            newArr[winData.winner - 1] += 1;
            return newArr;
        });
        setWinline(winData.winLine);
    }

    const playerColor = currentPlayer === 1 ? config.p1Color : config.p2Color;
    const playerName = currentPlayer === 1 ? config.p1Name : config.p2Name;
    const winnerName = winner === 1 ? config.p1Name : winner === 2 ? config.p2Name : "";
    const winnerColor = winner === 1 ? config.p1Color : winner === 2 ? config.p2Color : "";
    const p1Image = imagesDict[config.p1Color].player;
    const p2Image = imagesDict[config.p2Color].player;
    const winnerImage = imagesDict[winnerColor]?.player;

    return (
        <div id="game-screen">
            {(showInGameMenu || showRestartPanel || isEndGame) && <div id="dark-overlay"></div>}
            
            {showInGameMenu &&
                <InGameMenu
                    toggleMenu={toggleInGameMenu}
                    switchPage={props.switchPage}
                    setShowRestart={setShowRestartPanel}
                />
            }

            {showRestartPanel &&
                <RestartPanel
                    toggleMenu={toggleInGameMenu}
                    setShowRestart={setShowRestartPanel}
                    restartGame={restartGame}               
                />
            }

            {!isEndGame &&
            <>
                <div className="top-bar">
                    <button id="ingame-menu-btn" onClick={toggleInGameMenu}>Menu</button>
                    <img src={LOGO} />
                        <button id="restart-btn" onClick={() => setShowRestartPanel(true)}>Restart</button>
                </div>
                <div className="players-panel">
                    <div className="player-panel">
                        <img className="player-one-img" src={p1Image} />
                            <h3>{config.p1Name}</h3>
                            <p id="player-one-points">{points[0]}</p>
                    </div>
                    <div className="player-panel">
                        <h3>{config.p2Name}</h3>
                        <p id="player-two-points">{points[1]}</p>
                        <img className="player-two-img" src={p2Image} />
                    </div>
                </div>

                <GameBoard
                    activePlayer={currentPlayer}
                    winner={winner}
                    isTie={isTie}
                    data={boardStatus}
                    onClick={updateGame}
                    winLine={winLine}
                />

                {(!winner && !isTie) && 
                <div id="timer" className={`timer-${playerColor}`}>
                    <h3 id="turn-indicator">{playerName}'s turn</h3>
                    <p id="time-remaining">{time}</p>
                </div>}

                {(winner > 0 && !isEndGame) &&
                <div id="summary-panel">
                    <h3 id="winner-indicator">{winnerName}</h3>
                    <p>Wins</p>
                    <button onClick={newRound} id="play-again-button">Next Round</button>
                </div>}

                {(isTie && !isEndGame) &&
                <div id="summary-panel">
                    <p>It's a tie!</p>
                    <button onClick={newRound} id="play-again-button">Next Round</button>
                </div>}
            </>
            }

            {isEndGame && 
                <EndPanel
                    isTie={isTie}
                    name={winnerName}
                    img={winnerImage}
                    switchPage={props.switchPage}
                    restart={restartGame}
                />
            }
        </div>
    )
}