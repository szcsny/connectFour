import Settings from "./Settings";
import './SettingsPage.css';
import { useSettings } from "../context/SettingsContext";

export default function SettingsPage({switchPage}) {
    const {config, setConfig} = useSettings();

    const duplication = config.p1Color === config.p2Color;

    function handleChange(event)
    {
        setConfig(prev => {
            let obj = {...prev};
            if(event.target.name === "p1Name")
            {
                obj.p1Name = event.target.value;
            }
            else if(event.target.name === "p2Name")
            {
                obj.p2Name = event.target.value;
            }

            return obj;
        })
        console.log(config);
    }

    return (
        <div className="SettingsPage">
            <label>
                Name
                <input type="text" name="p1Name" value={config.p1Name} onChange={handleChange}/>
            </label>
            <label>
                Name
                <input type="text" name="p2Name" value={config.p2Name} onChange={handleChange}/>
            </label>
            {duplication &&
                <p>Players should pick different colours</p>
            }
            <Settings type={"p1Color"}/>
            <Settings type={"p2Color"}/>
            <Settings type={"rounds"}/>
            <Settings type={"timer"}/>

            <div className="settings-buttons">
                <button onClick={() => switchPage("Menu")}>{"<- "}Back</button>
                <button onClick={() => switchPage("GameScreen")}>PLAY</button>
            </div>
        </div>
    )
}