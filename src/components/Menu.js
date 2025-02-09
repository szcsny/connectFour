import LOGO from "../images/logo.svg";
import PVPIMAGE from "../images/player-vs-player.svg";

import './Menu.css';

export default function Menu({switchPage}) {

    return (
        <div id="main-menu">
            <img className="menu-logo" src={LOGO} />
                <button onClick={() => switchPage("Settings")} className="menu-button" id="pvp-button">
                    Play vs player
                    <img src={PVPIMAGE} />
                </button>
                <button onClick={() => switchPage("Rules")} className="menu-button" id="rules-button">Game rules</button>
        </div>
    )
}