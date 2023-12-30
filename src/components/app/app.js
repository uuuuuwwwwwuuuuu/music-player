import React, {Component} from "react";
import AsideBar from "../asideBar/asideBar";
import Main from "../main/main";
import PlaySelection from "../playSelection/playSelection";
import './app.scss';

export default class App extends Component {
    render() {
        return (
            <div className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-between app">
                    <AsideBar />
                    <Main />
                </div>
                <PlaySelection />
            </div>
        )
    }
}