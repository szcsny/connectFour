import {useState, useEffect} from "react";
import Menu from "./components/Menu";
import Rules from "./components/Rules";
import GameScreen from "./components/GameScreen";
import SettingsPage from "./components/SettingsPage";
import './App.css';

function App() {
    const [activePage, setActivePage] = useState("Menu")
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowLoading(false);
        }, 700);
    }, [activePage]);

    function switchPage(page) {
        setActivePage(page);
        setShowLoading(true);
    }

    return (
        <div className="App">
            {activePage === "Menu" && <Menu switchPage={switchPage}/>}
            {activePage === "Rules" && <Rules switchPage={switchPage}/>}
            {activePage === "Settings" && <SettingsPage switchPage={switchPage}/>}
            {activePage === "GameScreen" && <GameScreen switchPage={switchPage}/>}

            {showLoading &&
                <div className="loading-screen">
                    <div className="progress-bar">
                        <div className="progress-bar-inner"></div>
                    </div>
                </div>}
        </div>
    );
}

export default App;