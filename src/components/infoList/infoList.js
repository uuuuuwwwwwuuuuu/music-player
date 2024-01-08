import React, {Component} from "react";
import './infoList.scss';
import Reorder, {reorder} from 'react-reorder';
import LikedTrackList from "../likedTrackList/likedTrackList";

export default class InfoList extends Component {
    state = {
        favoriteTrackList: null,
        currentPlayList: [],
        category: 'liked',
    }

    componentDidUpdate(prevProps) {
        const {favoriteTrackList, currentPlayList, category} = this.props;
        if (currentPlayList !== prevProps.currentPlayList) {
            this.setState({currentPlayList: this.props.currentPlayList});
        }

        if (favoriteTrackList !== prevProps.favoriteTrackList) {
            this.setState({favoriteTrackList});
        }

        if (category !== prevProps.category) {
            this.setState({category});
        }
    }

    componentDidCatch(e) {
        console.log(e)
        return <h1>error</h1>
    }

    onReorder = (event, prevIndex, nextIndex, fromId, toId) => {
        if (fromId === toId) {
            const newPlayList = reorder(this.state.currentPlayList, prevIndex, nextIndex);
            this.props.getNewPlayList(newPlayList);
        } else {
            return null;
        }
    }

    onCategoryChange() {
        switch (this.state.category) {
            case 'liked':
                return <LikedTrackList favoriteTrackList={this.state.favoriteTrackList} onSelect={this.props.onSelect} />;
            case 'playLists':
                return <h1>Плейлисты не реализоваы</h1>;
            case 'artists':
                return <h1>Карты артистов не реализованы</h1>;
            default: return null;
        }
    }

    renderPlayList() {
        const {currentPlayList} = this.state;
        const {currentId} = this.props;

        return currentPlayList.map((item) => {
            const {title, artists, albumImg, id} = item;

            if (item.id !== currentId) {
                return (
                    <div
                        key={id} 
                        className="mt-3 liked_track_list_item d-flex align-items-center justify-content-between">
                        <div className="d-flex track" onClick={() => this.props.onSelect(id, false)} >
                            <img src={albumImg} alt="обложка"/>
                            <div className="liked_track_list_item_info d-flex flex-column">
                                <span className="track_title">{title}</span>
                                <span className="track_artists">{artists}</span>
                            </div>
                        </div>
                        <button onClick={() => this.props.onDelete(id)} className="play_list_delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <g clipPath="url(#clip0_67_215)">
                                <rect y="10.6066" width="15" height="2" rx="1" transform="rotate(-45 0 10.6066)"/>
                                <rect x="1.41418" width="15" height="2" rx="1" transform="rotate(45 1.41418 0)"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_67_215">
                                <rect width="12" height="12"/>
                                </clipPath>
                            </defs>
                            </svg> 
                        </button>
                    </div>
                )
            }

            return (
                <div
                    key={id} 
                    className="mt-3 liked_track_list_item d-flex align-items-center justify-content-between">
                    <div className="d-flex track" onClick={() => this.props.onSelect(id, false)} >
                        <img src={albumImg} alt="обложка"/>
                        <div className="liked_track_list_item_info d-flex flex-column">
                            <span className="track_title">{title}</span>
                            <span className="track_artists">{artists}</span>
                        </div>
                    </div>
                </div>
            )
        });
    }

    render() {
        const {height} = this.props;
        let likedPlayList = this.state.favoriteTrackList ? this.onCategoryChange() : null;
        let currentPlayList = this.state.currentPlayList ? this.renderPlayList() : null;

        if (this.props.playList) {
            return (
                <div className="liked_track_list" style={{height: `${height - 15}px`}}>
                    <Reorder
                        reorderId='reorderList'
                        component='div'
                        onReorder={this.onReorder}
                        holdTime={200}>
                        {currentPlayList}
                    </Reorder>
                </div>
            );
        } else {
            return (
                <div className="liked_track_list" style={{height: `${height - 15}px`}}>
                    {likedPlayList}
                </div>
            )
        }
    }
}