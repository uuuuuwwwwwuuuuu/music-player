import React from "react";
import './playList.scss';
import InfoBar from "../infoBar/infoBar";

export default function PlayList({onSelect, showPlayList}) {
    const calcPlayListHeight = () => {
        return document.body.clientHeight - 120;
    }

    const rightOffset = showPlayList ? '2rem' : '-45rem';

    return (
        <div className="play_list d-flex" style={{height: calcPlayListHeight() + 'px', right: rightOffset}}>
            <InfoBar playList={calcPlayListHeight()} onSelect={onSelect} buttonsBool={false} blockText='Текущий плейлист'/>
        </div>
    );
}