import React, {Component} from "react";
import './likedTracksList.scss';
import getData from "../service/getData";

export default class LikedTracksList extends Component {
    state = {
        data: []
    }
    
    componentDidMount() {
        getData()
            .then(data => this.setState({data}));
    }

    renderCard() {
        const {data} = this.state;
        return data.map((item) => {
            const {title, artists, albumImg, id} = item;
            return (
                <div onClick={() => this.props.onSelect(id)} key={id} className="mt-3 liked_track_list_item d-flex">
                    <img src={albumImg} alt="обложка"/>
                    <div className="liked_track_list_item_info d-flex flex-column">
                        <span className="track_title">{title}</span>
                        <span className="track_artists">{artists}</span>
                    </div>
                </div>
            )
        });
    }

    render() {
        const content = this.renderCard()
        const {height} = this.props;
        return (
            <div className="liked_track_list" style={{height: `${height - 15}px`}}>
                {content}
            </div>
        );
    }
}