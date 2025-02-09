import { useSettings } from "../context/SettingsContext";
import overlayChip from "../images/counter-white-overlay.svg";
import { imagesDict } from "../imagesUtil";

import "./Chip.css";

export default function Chip({player, posX, posY, isOverlay}) {
    const {config, setConfig} = useSettings();

    const p1Chip = imagesDict[config.p1Color].chip;
    const p2Chip = imagesDict[config.p2Color].chip;
    
    const img = isOverlay ? overlayChip : player === 1 ? p1Chip : p2Chip;
    const classname = isOverlay ? "chip chip-overlay" : "chip";

    return player ?
        <img
            className={classname}
            src={img}
            style={{gridRow: `${posY+1} / ${posY+2}`,
                    gridColumn: `${posX+1} / ${posX+2}`}}
        />
        :
        <div className="chip"></div>

}