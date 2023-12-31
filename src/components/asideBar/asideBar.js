import React from "react";
import './asideBar.scss';
import NavPanel from "../navPanel/navPanel";
import InfoBar from "../infoBar/infoBar";

const AsideBar = ({onSelect, showPlayList, favoriteTrackList}) => {
    const classList = showPlayList ? 'aside_bar d-flex flex-column blur' : "aside_bar d-flex flex-column"
    return (
        <div className={classList}>
            <NavPanel />
            <InfoBar favoriteTrackList={favoriteTrackList} playList={false} onSelect={onSelect} buttonsBool={true} blockText='Моя музыка'/>
        </div>
    )
}

export default AsideBar;