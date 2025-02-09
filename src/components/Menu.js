import React from "react";
import LOGO from "./images/logo.svg";
import PVPIMAGE from "./images/player-vs-player.svg"

export default function Menu(props) {


    return (
        <div id="main-menu">
            <img className="menu-logo" src={LOGO} />
                <button onClick={() => props.switchPage("GameScreen")} className="menu-button" id="pvp-button">
                    Play vs player
                    <img src={PVPIMAGE} />
                </button>
                <button onClick={() => props.switchPage("Rules")} className="menu-button" id="rules-button">Game rules</button>
        </div>
    )
}