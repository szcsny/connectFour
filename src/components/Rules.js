import React from "react";

export default function Rules(props) {
    return (
        <div id="rules">
            <h1 className="rules-title">Rules</h1>
            <h2 className="rules-subtitle">Objective</h2>
            <p>Be the first player to connect 4 of the same colored discs in a row (either
                vertically, horizontally, or diagonally).</p>
            <h2 className="rules-subtitle">How to play</h2>
            <ol>
                <li><span className="li-num">1</span>Red goes first in the first game.</li>
                <li><span className="li-num">2</span>Players must alternate turns, and only one disc can be dropped in
                    each turn.
                </li>
                <li><span className="li-num">3</span>The game ends when there is a 4-in-a-row or a stalemate.</li>
                <li><span className="li-num">4</span>The starter of the previous game goes second on the next game.</li>
            </ol>
            <button onClick={() => props.switchPage("Menu")} id="rules-close-button"></button>
        </div>
    )
}