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
        data: null,
        showPlayList: null,
        randomData: null,
        isRandom: false
    }
    
    componentDidMount() {
        getData()
            .then(data => {
                this.setState({data});
                this.setState(({data}) => {
                    const newArr = [...data];
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

    onSelectTrack = (id) => {
        this.setState({id});
    }

    onShowPlayList = (showPlayList) => {
        this.setState({showPlayList});
    }

    getIsRandom = (isRandom) => {
        this.setState({isRandom});
    }

    render() {
        const {showPlayList, data, randomData, isRandom, id} = this.state
        return (
            <div className="d-flex flex-column justify-content-between app_wrapper">
                <div className="d-flex justify-content-between app">
                    <AsideBar 
                        showPlayList={showPlayList} 
                        onSelect={this.onSelectTrack}
                        data={data}/>
                    <Main showPlayList={showPlayList}/>
                    <PlayList 
                        onSelect={this.onSelectTrack} 
                        showPlayList={showPlayList} 
                        randomData={randomData}
                        data={data}
                        isRandom={isRandom}/>
                </div>
                <PlaySelection 
                    data={data}
                    randomData={randomData}
                    showPlayList={this.onShowPlayList} 
                    id={id}
                    getIsRandom={this.getIsRandom} />
            </div>
        )
    }
}