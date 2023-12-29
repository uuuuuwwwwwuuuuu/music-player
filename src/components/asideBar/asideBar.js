import React from "react";
import './asideBar.scss';
import NavPanel from "../navPanel/navPanel";
import InfoBar from "../infoBar/infoBar";

const AsideBar = () => {
    return (
        <div className="aside_bar">
            <NavPanel />
            <InfoBar />
        </div>
    )
}

export default AsideBar;