import { useSettings } from "../context/SettingsContext"
import ConfettiExplosion from "react-confetti-explosion";

import './EndPanel.css';

export default function EndPanel({isTie, name, img, switchPage, restart})
{
    return (
        <>
            {!isTie &&
            <div className="confetti">
                <ConfettiExplosion
                    particleCount={300}
                    particleSize={20}
                    duration={4000}
                    colors={['#559de0', '#55e08a', '#ff55f1', '#fd6687', '#ffce67']}
                    z-index={100}
                />
            </div>
            } 

            <div className="EndPanel">
                {isTie &&
                    <h1>It's a tie!</h1>
                }
                {!isTie &&
                    <>                    
                        <h1>{name} wins!</h1>
                        <img src={img}/>
                    </>
                }
                <button className="rematch-btn" onClick={restart}>Rematch</button>
                <button className="menu-btn" onClick={() => switchPage('Menu')}>Main Menu</button>
            </div>

        </>
    )
}