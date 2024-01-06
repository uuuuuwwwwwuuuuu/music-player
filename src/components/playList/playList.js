import React from "react";
import './playList.scss';
import InfoBar from "../infoBar/infoBar";

export default function PlayList({onSelect, showPlayList, data, dataClone, isRandom, onDelete, currentId}) {
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
                dataClone={dataClone}
                currentId={currentId}/>
        </div>
    );
}