import React from "react";
import './likedTrackList.scss';

const LikedTrackList = ({favoriteTrackList, onSelect}) => {
    return favoriteTrackList.map((item) => {
        const {title, artists, albumImg, id} = item;
        return (
            <div onClick={() => onSelect(id, true)} key={id} className="mt-3 liked_track_list_item d-flex">
                <img src={albumImg} alt="обложка"/>
                <div className="liked_track_list_item_info d-flex flex-column">
                    <span className="track_title">{title}</span>
                    <span className="track_artists">{artists}</span>
                </div>
            </div>
        )
    });
}

export default LikedTrackList;