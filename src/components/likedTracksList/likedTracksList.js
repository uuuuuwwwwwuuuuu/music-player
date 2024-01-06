import React, {Component} from "react";
import './likedTracksList.scss';

export default class LikedTracksList extends Component {
    state = {
        data: [],
        randomData: [],
        dataClone: []
    }
    
    componentDidUpdate(prevProps) {
        const {data, randomData, dataClone} = this.props;
        if (data !== prevProps.data) {
            this.setState({data: this.props.data});
        }
        
        if (randomData !== prevProps.randomData) {
            this.setState({randomData: this.props.randomData});
        }

        if (dataClone !== prevProps.dataClone) {
            this.setState({dataClone: this.props.dataClone});
        }
    }

    renderTrackList() {
        const {data} = this.state;
        return data.map((item) => {
            const {title, artists, albumImg, id} = item;
            return (
                <div onClick={() => this.props.onSelect(id, true)} key={id} className="mt-3 liked_track_list_item d-flex">
                    <img src={albumImg} alt="обложка"/>
                    <div className="liked_track_list_item_info d-flex flex-column">
                        <span className="track_title">{title}</span>
                        <span className="track_artists">{artists}</span>
                    </div>
                </div>
            )
        });
    }

    renderPlayList() {
        const {dataClone} = this.state;
        const {currentId} = this.props;

        return dataClone.map((item) => {
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
                        <button onClick={() => this.props.onDelete(id)} className="play_list_controllers">
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
        const content = this.props.playList ? this.renderPlayList() : this.renderTrackList()
        const {height} = this.props;
        return (
            <div className="liked_track_list" style={{height: `${height - 15}px`}}>
                {content}
            </div>
            
        );
    }
}