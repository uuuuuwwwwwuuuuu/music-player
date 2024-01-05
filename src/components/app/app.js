import React, {Component} from "react";
import AsideBar from "../asideBar/asideBar";
import Main from "../main/main";
import PlaySelection from "../playSelection/playSelection";
import './app.scss';
import PlayList from "../playList/playList";

export default class App extends Component {
    state = {
        trackId: 0,
        showPlayList: null,
        randomData: null,
        isRandom: false
    }

    onSelectTrack = (id) => {
        this.setState({id});
    }

    onShowPlayList = (showPlayList) => {
        this.setState({showPlayList});
    }

    getRandomData = (randomData) => {
        this.setState({randomData});
    }

    getIsRandom = (isRandom) => {
        this.setState({isRandom});
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-between app_wrapper">
                <div className="d-flex justify-content-between app">
                    <AsideBar showPlayList={this.state.showPlayList} onSelect={this.onSelectTrack}/>
                    <Main showPlayList={this.state.showPlayList}/>
                    <PlayList 
                    onSelect={this.onSelectTrack} 
                    showPlayList={this.state.showPlayList} 
                    randomData={this.state.randomData}
                    isRandom={this.state.isRandom}/>
                </div>
                <PlaySelection 
                    getIsRandom={this.getIsRandom} 
                    getRandomData={this.getRandomData} 
                    showPlayList={this.onShowPlayList} 
                    id={this.state.id} />
            </div>
        )
    }
}