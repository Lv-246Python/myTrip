import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

import { CardMedia } from 'material-ui/Card';
import { GridTile } from 'material-ui/GridList';

/*
import Photo from 'photo'
*/

export default class TripTile extends React.Component {
    constructor(props){
        super(props);
        this.state = props;
    };

    render() {
        return (
            <div className='tile'>

                <GridTile
                    // link to own trip page
                    containerElement={<Link to={`/trip/${this.state.tripId}`} />}
                    title={this.state.title}
                    subtitle={this.state.created} >

                <CardMedia>
                    {/*
                    should be source of the first photo of a trip
                    <img src={this.state.tripPhoto.src} />
                    */}

                    <img src="http://www.apaseotravel.com/wp-apaseo/wp-content/uploads/2016/03/LateSAil-Bahamas3.jpg" />
                </CardMedia>

                </GridTile>
            </div>
        );
    }
}
