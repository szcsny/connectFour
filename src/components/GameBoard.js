import { useState } from "react";
import Chip from "./Chip";
import BOARD_WHITE from "../images/board-layer-white-small.svg";
import BOARD_BLACK from "../images/board-layer-black-small.svg";

import "./GameBoard.css";
import { useSettings } from "../context/SettingsContext";
import { imagesDict } from "../imagesUtil";

export default function GameBoard(props) {
    const {config, setConfig} = useSettings();
    
    const [markerPos, setMarkerPos] = useState(0);
    const [hover, setHover] = useState(false);
    
    const chips = props.data.map((row, i) => {
        return row.map((item, j) => {
            if(item) {
                return <Chip
                        key={i*7+j}
                        player={item}
                        posX={j} posY={i}
                        isOverlay={false}
                        />
            }
        })
    });

    const overlayChips = props.winLine.map(pos => {
        return <Chip
                key={'o' + pos[0]*7+pos[1]}
                player={1}
                posX={pos[1]}
                posY={pos[0]}
                isOverlay={true}
                />
    })

    const p1Marker = imagesDict[config.p1Color].marker;
    const p2Marker = imagesDict[config.p2Color].marker;

    const active = props.activePlayer === 1 ? p1Marker : p2Marker;

    function mouseMove(event){
        if(hover){
            const rect = event.target.getBoundingClientRect();
            const X = event.clientX - rect.left;
            setMarkerPos(Math.floor(X / rect.width * 7) * rect.width / 7 + 15);
        }
    }

    return (
        <div
            className="GameBoard"
            style={props.winner || props.isTie ? {pointerEvents: "none"} : {}}
        >
            <img
                src = {active}
                className="indicator"
                style = {{left: markerPos}}>
            </img>
            <div
                onClick={event => props.onClick(event)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseMove={(e) => mouseMove(e)}
                id="chip-container">
                {chips}
                {overlayChips}
            </div>
            <div id="column-highlight"></div>
            <img className="board-white" src={BOARD_WHITE}/>
            <img className="board-black" src={BOARD_BLACK} />
            <div id="bottom-color">
            </div>
        </div>
    )
}