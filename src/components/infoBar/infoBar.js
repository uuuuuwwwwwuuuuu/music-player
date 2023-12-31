import React, {Component} from "react";
import './infoBar.scss';
import InfoList from "../infoList/infoList";

export default class InfoBar extends Component {
    state = {
        height: 0,
        category: 'liked',
    }

    componentDidMount() {
        let height = 0;
        if (this.props.playList) {
            height = this.props.playList - 42;
        } else {
            height = document.querySelector('.info_bar_container_track_list').clientHeight;
        }
        this.setState({height});
    }

    setCategory = (e) => {
        document.querySelectorAll('.info_button').forEach(item => {
            if (item.classList.contains('info_button_selected')) {
                item.classList.remove('info_button_selected')
            } 
        })
        e.target.classList.add('info_button_selected');
        this.setState({category: e.target.id});
    }

    renderButtons(boolean) {
        if (boolean) {
            return (
                <div className="d-flex justify-content-between px-3 mt-3">
                    <button onClick={this.setCategory} id="liked" className="info_button info_button_selected">Любимое</button>               
                    <button onClick={this.setCategory} id="playLists" className="info_button">Плейлисты</button>           
                    <button onClick={this.setCategory} id="artists" className="info_button">Артисты</button>             
                </div>
            )
        }
    }

    render() {
        const {onSelect, buttonsBool, blockText, isRandom, favoriteTrackList, currentPlayList, onDelete, playList, currentId, getNewPlayList} = this.props;
        const buttons = this.renderButtons(buttonsBool);
        
        return (
            <div className="info_bar d-flex flex-column justify-content-start">
                <div className="info_bar_container">
                    <div className="info_bar_my_music">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M23.4228 5.4456C19.155 5.4456 20.2044 3.6 16.2 3.6C15.24 3.6 15 4.2 15 4.8V17.4C15 18.7284 14.3808 19.8 12 19.8C8.6034 19.8 7.2 20.6784 7.2 22.8C7.2 24.2298 7.4934 26.4 11.9616 26.4C16.113 26.4 16.2 23.2092 16.2 21.6C16.2 20.9838 16.2 19.2582 16.2 17.4V10.2C16.203 9.387 16.32 9 16.8 9C19.8828 9 19.1226 10.8 23.4 10.8C23.4 10.8 24.6 10.8 24.6 9.7806C24.6 8.2476 24.6 7.1628 24.6 6.5808C24.6 5.661 24.1872 5.4456 23.4228 5.4456Z" fill="white"/>
                        </svg>
                        <span>{blockText}</span>
                    </div>
                </div>
                {buttons}
                <div className="info_bar_container_track_list">
                    <InfoList 
                        playList={playList} 
                        height={this.state.height} 
                        onSelect={onSelect}
                        isRandom={isRandom}
                        favoriteTrackList={favoriteTrackList}
                        onDelete={onDelete}
                        currentPlayList={currentPlayList}
                        currentId={currentId}
                        getNewPlayList={getNewPlayList}
                        category={this.state.category}
                        />
                </div>
            </div>
        )
    }
}