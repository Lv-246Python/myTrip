import React from 'react';
import { Link } from 'react-router-dom';

import { CardMedia } from 'material-ui/Card';
import { GridTile } from 'material-ui/GridList';

/*
import Photo from 'photo'
*/

let img = 'http://www.highviewart.com/uploads/cache/645x0x0/articles/2537/1_1417030880.jpg';

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

                    <img src={img} />
                </CardMedia>

                </GridTile>
            </div>
        );
    }
}
