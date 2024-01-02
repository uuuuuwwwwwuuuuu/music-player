import React, {Component} from "react";
import './playSelection.scss';
import getData from "../service/getData";

export default class PlaySelection extends Component {
    state = {
        id: 0,
        data: null,
        isPlay: false,
        isRepeat: false,
    }

    componentDidMount() {
        getData()
            .then(data => this.setState({data}));
    }

    componentDidUpdate(prevProps) {
        const {id} = this.props;
        if (id !== prevProps.id && id !== undefined) {
            this.setState({id});
            this.setState({isPlay: true});
        }

        this.togglePlayTrack();        
        this.onRepeat();
    }

    renderTrackInfo() {
        const {data, id} = this.state;
        const dataObj = data[id];

        return (
            <>
                <img src={dataObj.albumImg} alt="album" />
                <div className="left_elements_info">
                    <span className="left_elements_title">{dataObj.title}</span>
                    <span className="left_elements_artists">{dataObj.artists}</span>
                </div>
            </>
        )
    }

    prevTrack = () => {
        this.setState(({id}) => {
            const oldId = id;
            let newId = null;

            if (oldId === 0) {
                newId = this.state.data.length - 1;
            } else {
                newId = oldId - 1;
            }

            return {id: newId}
        });

        document.querySelector('.music_progress_bar').style.width = '0'
    }

    nextTrack = () => {
        this.setState(({id}) => {
            const oldId = id;
            let newId = null;

            if (oldId >= this.state.data.length - 1) {
                newId = 0;
            } else {
                newId = oldId + 1;
            }

            return {
                id: newId
            }
        })
        document.querySelector('.music_progress_bar').style.width = '0'
    }

    changeIsPlay = () => {
        this.setState(({isPlay}) => {
            return {isPlay: !isPlay}
        });
    }
    
    toggleIsRepeat = () => {
        this.setState(({isRepeat}) => {
            return {isRepeat: !isRepeat}
        })
    }

    togglePlayTrack = () => {
        const song = document.querySelector('audio');
        this.state.isPlay ? song.play() : song.pause();
    }

    changeProgressBar = () => {
        const {duration, currentTime} = document.querySelector('audio');
        const progress = (currentTime / duration) * 100;

        document.querySelector('.music_progress_bar').style.width = `${progress}%`
    }

    setWidthOfProgressBar = (e) => {
        const song = document.querySelector('audio');
        const clientWidth = document.querySelector('.music_progress').clientWidth;
        const clickX = e.nativeEvent.offsetX;
        
        song.currentTime = (clickX / clientWidth) * song.duration;
        console.log(clientWidth);
    }

    onRepeat() {
        if (this.state.isRepeat) {
            document.querySelector('audio').loop = true;
        } else {
            document.querySelector('audio').loop = false;
        }
    }

    render() {
        const {data, id, isPlay, isRepeat} = this.state
        const leftElements = data ? this.renderTrackInfo() : null;
        const url = data ? data[id].music : null;

        const disablePlayClass = isPlay ? 'disable' : null;
        const disablePauseClass = !isPlay ? 'disable' : null;
        const activeRepeatClass = isRepeat ? 'active' : null

        return (
            <div className="play_selection">
                <div className="left_elements">
                    {leftElements}
                </div>
                <div className="right_elements">
                    <div className="music_controllers">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                        <path d="M15.2246 7.03656C15.461 7.24933 15.7447 7.36753 16.0284 7.36753C16.3357 7.36753 16.6667 7.24933 16.8794 6.98928L20 3.67959L16.9031 0.369897C16.4539 -0.102917 15.6974 -0.126557 15.2246 0.322615C14.7518 0.771788 14.7281 1.52829 15.1773 2.0011L15.6501 2.49756C14.0662 2.56848 12.5768 3.2777 11.513 4.43609L9.55083 6.63467L7.58865 4.45973C6.4539 3.20678 4.86998 2.49756 3.19149 2.49756H1.18203C0.520095 2.49756 0 3.01765 0 3.67959C0 4.34153 0.520095 4.86162 1.18203 4.86162H3.19149C4.1844 4.86162 5.15366 5.28715 5.8156 6.04366L7.94326 8.40772L5.8156 10.7718C5.15366 11.5283 4.1844 11.9538 3.19149 11.9538H1.18203C0.520095 11.9538 0 12.4739 0 13.1359C0 13.7978 0.520095 14.3179 1.18203 14.3179H3.19149C4.86998 14.3179 6.4539 13.6087 7.58865 12.3557L9.55083 10.1808L11.513 12.3557C12.5768 13.5377 14.0662 14.247 15.6501 14.2942L15.1773 14.7907C14.7281 15.2635 14.7518 16.02 15.2246 16.4692C15.461 16.682 15.7447 16.8002 16.0284 16.8002C16.3357 16.8002 16.6667 16.682 16.8794 16.4219L20 13.1122L16.9031 9.82616C16.4539 9.35335 15.6974 9.32971 15.2246 9.77888C14.7518 10.2281 14.7281 10.9846 15.1773 11.4574L15.6265 11.9302C14.7281 11.8593 13.8771 11.4574 13.2624 10.7718L11.1348 8.40772L13.2624 6.04366C13.8771 5.35808 14.7281 4.95618 15.6265 4.88526L15.1773 5.35808C14.7518 5.83089 14.7518 6.58739 15.2246 7.03656Z"/>
                        </svg>
                        <svg onClick={this.prevTrack} xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15">
                        <g clipPath="url(#clip0_7_204)">
                        <rect x="3" y="14" width="3" height="13" rx="1.5" transform="rotate(-180 3 14)" />
                        <path d="M7.78885 8.39444C7.05181 8.02592 7.05181 6.97411 7.78885 6.60559L19.5528 0.723619C20.2177 0.39117 21 0.874665 21 1.61805V13.382C21 14.1254 20.2177 14.6089 19.5528 14.2764L7.78885 8.39444Z"/>
                        <path d="M1.5 8.36602C0.833333 7.98112 0.833333 7.01887 1.5 6.63397L9.75 1.87083C10.4167 1.48593 11.25 1.96706 11.25 2.73686V12.2631C11.25 13.0329 10.4167 13.5141 9.75 13.1292L1.5 8.36602Z"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_7_204">
                        <rect width="21" height="15" transform="matrix(-1 0 0 -1 21 15)"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <svg onClick={this.changeIsPlay} className={disablePlayClass} xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 13 16" fill="none">
                        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 0 14.7358 0 13.1962L0 2.80385C0 1.26425 1.66667 0.301996 3 1.0718L12 6.26795Z"/>
                        </svg>
                        <svg onClick={this.changeIsPlay} className={disablePauseClass} xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20">
                        <g clipPath="url(#clip0_64_2)">
                            <rect width="5" height="20" rx="2"/>
                            <rect x="11" width="5" height="20" rx="2"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_64_2">
                            <rect width="16" height="20"/>
                            </clipPath>
                        </defs>
                        </svg>
                        <svg onClick={this.nextTrack} xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15">
                        <g clipPath="url(#clip0_47_2)">
                        <rect x="18" y="1" width="3" height="13" rx="1.5"/>
                        <path d="M13.2111 6.60556C13.9482 6.97408 13.9482 8.02589 13.2111 8.39441L1.44721 14.2764C0.782312 14.6088 0 14.1253 0 13.382V1.61802C0 0.87464 0.782312 0.391144 1.44721 0.723594L13.2111 6.60556Z"/>
                        <path d="M19.5 6.63398C20.1667 7.01888 20.1667 7.98113 19.5 8.36603L11.25 13.1292C10.5833 13.5141 9.75 13.0329 9.75 12.2631V2.73686C9.75 1.96706 10.5833 1.48593 11.25 1.87083L19.5 6.63398Z"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_47_2">
                        <rect width="21" height="15"/>
                        </clipPath>
                        </defs>
                        </svg>
                        <svg onClick={this.toggleIsRepeat} className={activeRepeatClass} xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19">
                        <path d="M1.59998 12C1.59998 14.1968 3.4031 16 5.59998 16H12.7L11.55 17.15L12.6875 18.275L15.7625 15.2L12.6875 12.125L11.5625 13.25L12.7 14.4H5.59998C4.27654 14.4 3.19998 13.3234 3.19998 12V7.59996H1.59998V12ZM4.23748 4.79996L7.32498 7.88746L8.44998 6.74996L7.29998 5.59996H14.4C15.7234 5.59996 16.8 6.67653 16.8 7.99996V12.4H18.4V7.99996C18.4 5.80309 16.5969 3.99996 14.4 3.99996H7.29998L8.44998 2.84996L7.31248 1.72496L4.23748 4.79996Z"/>
                        </svg>
                    </div>
                    <div onClick={this.setWidthOfProgressBar} className="music_progress">
                        <div className="music_progress_bar">
                            <div className="music_progress_circle"></div>
                        </div>
                    </div>
                    <audio onTimeUpdate={this.changeProgressBar} src={url}/>
                </div>
            </div>
        )
    }
}

