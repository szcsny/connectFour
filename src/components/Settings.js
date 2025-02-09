import { useSettings } from "../context/SettingsContext";
import "./Settings.css";

export default function Settings(props)
{
    const {config, setConfig} = useSettings();

    const textOptions = {p1Color: ["red", "yellow", "blue", "green", "pink"],
                        p2Color: ["red", "yellow", "blue", "green", "pink"],
                        rounds: [1, 20, 30, 50, 100],
                        timer: [5, 10, 15, 20, 30]
    }

    const buttonText = textOptions[props.type];
    const buttons = buttonText.map(item =>
    {
        const className = item === config[props.type] ? "setting-button highlighted" : "setting-button";
        
        return (
            <button 
                className={className}
                
                onClick={() => updateData(item)}>
                    {item}
            </button>
        )
    })

    function updateData(setting)
    {
        setConfig(prev => {
            let obj = {...prev};
            obj[props.type] = setting;
            return obj;
        })
    }

    return (
        <div className="Settings">                
                {buttons}
        </div>
    )
}