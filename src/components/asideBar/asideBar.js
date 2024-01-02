import React from "react";
import './asideBar.scss';
import NavPanel from "../navPanel/navPanel";
import InfoBar from "../infoBar/infoBar";

const AsideBar = ({onSelect}) => {
    return (
        <div className="aside_bar d-flex flex-column">
            <NavPanel />
            <InfoBar onSelect={onSelect}/>
        </div>
    )
}

export default AsideBar;