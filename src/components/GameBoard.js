import React from "react";
import BOARD_WHITE from "./images/board-layer-white-small.svg";
import BOARD_BLACK from "./images/board-layer-black-small.svg";

export default function GameBoard(props) {
    const [rect, setRect] = React.useState(new DOMRect(-1000, -1000, 0, 0));

    React.useEffect(() => {
        setRect(boundingBox);
        console.log(rect);
    }, [])

    let boundingBox = rect;

    return (
        <div className="board-div">
            <div
                ref={el => {
                    if(!el) {
                        return;
                    }
                    boundingBox = el.getBoundingClientRect();
                }}
                onMouseOver={() => {console.log("I'm over it")}}
                onClick={() => props.onClick(rect)}
                id="chip-container">
            </div>
            <div id="column-highlight"></div>
            <img className="board-white" src={BOARD_WHITE}/>
            <img className="board-black" src={BOARD_BLACK} />
            <div id="bottom-color">
            </div>
        </div>
    )
}