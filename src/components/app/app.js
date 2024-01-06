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
        isRandom: false,
        dataClone: null
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

    onSelectTrack = (id, isTrackList) => {
        this.setState({id});
        if (isTrackList) {
            this.setState({dataClone: this.state.data});
        }
    }

    onShowPlayList = (showPlayList) => {
        this.setState({showPlayList});
    }

    getIsRandom = (isRandom) => {
        this.setState({isRandom});
        if (isRandom) {
            this.setState({dataClone: this.state.randomData});
        } else {
            this.setState({dataClone: this.state.data});
        }
    }

    onDelete = (id) => {
        this.setState(({dataClone}) => {
            const index = dataClone.findIndex(element => element.id === id);
            const newArr = [...dataClone.slice(0, index), ...dataClone.slice(index + 1)];

            return {dataClone: newArr}
        })
    }

    getCurrentId = (id) => {
        this.setState({id});
    }

    render() {
        const {showPlayList, data, dataClone, randomData, isRandom, id} = this.state;
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
                        dataClone={dataClone}
                        isRandom={isRandom}
                        onDelete={this.onDelete}
                        currentId={id}/>
                </div>
                <PlaySelection 
                    data={dataClone}
                    randomData={randomData}
                    showPlayList={this.onShowPlayList} 
                    id={id}
                    getIsRandom={this.getIsRandom} 
                    getId={this.getCurrentId}/>
            </div>
        )
    }
}