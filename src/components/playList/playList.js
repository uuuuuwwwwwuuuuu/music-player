import React from "react";
import './playList.scss';
import InfoBar from "../infoBar/infoBar";

export default function PlayList({onSelect}) {
    const calcPlayListHeight = () => {
        return document.body.clientHeight - 120;
    }

    return (
        <div className="play_list d-flex" style={{height: calcPlayListHeight() + 'px'}}>
            <InfoBar playList={calcPlayListHeight()} onSelect={onSelect} buttonsBool={false} blockText='Текущий плейлист'/>
        </div>
    )
}