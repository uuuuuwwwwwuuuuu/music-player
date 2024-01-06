import React, {Component} from "react";
import AsideBar from "../asideBar/asideBar";
import Main from "../main/main";
import PlaySelection from "../playSelection/playSelection";
import './app.scss';
import PlayList from "../playList/playList";
import getData from "../service/getData";

export default class App extends Component {
    state = {
        trackId: 0,
        favoriteTrackList: null,
        showPlayList: null,
        randomData: null,
        isRandom: false,
        currentPlayList: null
    }
    
    componentDidMount() {
        getData()
            .then(favoriteTrackList => {
                this.setState({favoriteTrackList});
                this.setState(({favoriteTrackList}) => {
                    const newArr = [...favoriteTrackList];
                    this.shuffle(newArr);
                    return {randomData: newArr};
                });
            });
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    onSelectTrack = (id, isTrackList) => {
        this.setState({id});
        if (isTrackList) {
            this.setState({currentPlayList: this.state.favoriteTrackList});
        }
    }

    onShowPlayList = (showPlayList) => {
        this.setState({showPlayList});
    }

    getIsRandom = (isRandom) => {
        this.setState({isRandom});
        if (isRandom) {
            this.setState({currentPlayList: this.state.randomData});
        } else {
            this.setState({currentPlayList: this.state.favoriteTrackList});
        }
    }

    onDelete = (id) => {
        this.setState(({currentPlayList}) => {
            const index = currentPlayList.findIndex(element => element.id === id);
            const newArr = [...currentPlayList.slice(0, index), ...currentPlayList.slice(index + 1)];

            return {currentPlayList: newArr}
        })
    }

    getCurrentId = (id) => {
        this.setState({id});
    }

    render() {
        const {showPlayList, favoriteTrackList, currentPlayList, isRandom, id} = this.state;
        return (
            <div className="d-flex flex-column justify-content-between app_wrapper">
                <div className="d-flex justify-content-between app">
                    <AsideBar 
                        showPlayList={showPlayList} 
                        onSelect={this.onSelectTrack}
                        data={favoriteTrackList}/>
                    <Main showPlayList={showPlayList}/>
                    <PlayList 
                        onSelect={this.onSelectTrack} 
                        showPlayList={showPlayList} 
                        dataClone={currentPlayList}
                        isRandom={isRandom}
                        onDelete={this.onDelete}
                        currentId={id}/>
                </div>
                <PlaySelection 
                    data={currentPlayList}
                    showPlayList={this.onShowPlayList} 
                    id={id}
                    getIsRandom={this.getIsRandom} 
                    getId={this.getCurrentId}/>
            </div>
        )
    }
}