import React from 'react';

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Like from '../like/like';

import { styles } from './PhotoStyles';

export class TitleItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CardMedia>
                <img src={this.props.src} />
                </CardMedia>
                <CardTitle title={this.props.title} subtitle={'by ' + this.props.subtitle} />
                <CardText>
                {this.props.description}
                </CardText>

                <Like
                    tripId={this.props.tripId}
                    photoId={this.props.photoId}
                />
            </Card>
    );
  }
}
