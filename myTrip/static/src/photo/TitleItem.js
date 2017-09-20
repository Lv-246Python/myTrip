import React from 'react';

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Like from '../like/like';

import { styles } from './PhotoStyles';

export class TitleItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    console.log('Title checkpointId: ' + this.props.checkpointId)
        return (
            <div>
                <CardMedia>
                    <img src={this.props.src} />
                </CardMedia>
                <div style={styles.row}>
                    <CardTitle
                        title={this.props.title}
                        subtitle={'by ' + this.props.subtitle}
                    />
                    <Like
                        tripId={this.props.tripId}
                        checkpointId={this.props.checkpointId}
                        photoId={this.props.photoId}
                    />
                </div>
                {(this.props.description) ?
                <CardText>
                    {this.props.description}
                </CardText> : false}
            </div>
    );
  }
}
