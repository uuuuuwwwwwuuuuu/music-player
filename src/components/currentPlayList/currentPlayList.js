import React from "react";
import './playList.scss';
import InfoBar from "../infoBar/infoBar";

export default function CurrentPlayList({onSelect, showPlayList, data, currentPlayList, isRandom, onDelete, currentId, getNewPlayList}) {
    const calcPlayListHeight = () => {
        return document.body.clientHeight - 120;
    }

    const rightOffset = showPlayList ? '2rem' : '-45rem';

    return (
        <div className="play_list d-flex" style={{height: calcPlayListHeight() + 'px', right: rightOffset}}>
            <InfoBar 
                data={data} 
                playList={calcPlayListHeight()} 
                onSelect={onSelect} 
                buttonsBool={false} 
                blockText='Текущий плейлист'
                isRandom={isRandom}
                onDelete={onDelete}
                currentPlayList={currentPlayList}
                currentId={currentId}
                getNewPlayList={getNewPlayList}/>
        </div>
    );
}