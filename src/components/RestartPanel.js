import './RestartPanel.css';

export default function RestartPanel(props)
{    
    return (
        <div className="RestartPanel">
            <h2>Are you Sure?</h2>
            <button className="restart-button" onClick={props.restartGame}>Restart</button>
            <button onClick={() => props.setShowRestart(false)}>Back to Game</button>
        </div>
    )
}