import "./InGameMenu.css";

export default function InGameMenu(props) {
    function quitGame() {
        props.toggleMenu();
        props.switchPage("Menu");
    }

    function showRestartPanel()
    {
        props.setShowRestart(true);
        props.toggleMenu();
    }

    return (      
        <div id="ingame-menu">
            <h1>Pause</h1>
            <button id="continue-btn" onClick={props.toggleMenu}>Continue game</button>
            <button id="menu-restart-btn" onClick={showRestartPanel}>Restart</button>
            <button id="quit-game-btn" onClick={quitGame}>Quit game</button>
        </div>
    )
}