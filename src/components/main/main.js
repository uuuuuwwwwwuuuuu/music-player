import React from "react";
import './main.scss'

const Main = ({showPlayList}) => {
    const classList = showPlayList ? 'main blur' : 'main';
    return <div className={classList}></div>
}

export default Main;