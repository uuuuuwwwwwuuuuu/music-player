import React, {Component} from "react";
import AsideBar from "../asideBar/asideBar";
import Main from "../main/main";
import PlaySelection from "../playSelection/playSelection";
import './app.scss';

export default class App extends Component {
    state = {
        trackId: 0
    }

    onSelectTrack = (id) => {
        this.setState({id});
    } 

    render() {
        return (
            <div className="d-flex flex-column justify-content-between app_wrapper">
                <div className="d-flex justify-content-between app">
                    <AsideBar onSelect={this.onSelectTrack}/>
                    <Main />
                </div>
                <PlaySelection id={this.state.id} />
            </div>
        )
    }
}