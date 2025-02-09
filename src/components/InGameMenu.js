import React from "react";

export default function InGameMenu(props) {
    function closeMenu() {
        props.toggleMenu();
        props.switchPage("Menu");
    }

    return (
        <div id="ingame-menu">
            <h1>Pause</h1>
            <button id="continue-btn" onClick={props.toggleMenu}>Continue game</button>
            <button id="menu-restart-btn">Restart</button>
            <button id="quit-game-btn" onClick={closeMenu}>Quit game</button>
        </div>
    )
}