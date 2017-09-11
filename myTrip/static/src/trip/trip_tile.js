import React from 'react';
import { Link } from 'react-router-dom';

import { CardMedia } from 'material-ui/Card';
import { GridTile } from 'material-ui/GridList';
import AnnounceIcon from 'material-ui/svg-icons/action/today';
import DoneIcon from 'material-ui/svg-icons/toggle/check-box';
import ProgressIcon from 'material-ui/svg-icons/action/trending-up';
import IconButton from 'material-ui/IconButton';


export default class TripTile extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
    };

    statusIcon = () => {
        if (this.state.status === 3){
            return <IconButton><AnnounceIcon color="white" /></IconButton>;
        };
        if (this.state.status === 2){
            return <IconButton><ProgressIcon color="white" /></IconButton>;
        };
        if (this.state.status === 1){
            return <IconButton><DoneIcon color="white" /></IconButton>;
        };
    };

    componentDidMount() {
        this.statusIcon();
    };

    render() {
        return (
            <div className='tile'>
                <GridTile
                    // link to own trip page
                    containerElement={<Link to={`/trip/${this.state.tripId}`} />}
                    title={this.state.title}
                    subtitle={this.state.created}
                    actionIcon={this.statusIcon()}
                >

                    <CardMedia>
                        <img src={this.state.cover} />
                    </CardMedia>

                </GridTile>
            </div>
        );
    }
}
