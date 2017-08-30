import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

import { TitlePhotoItem } from './TitlePhotoItem';
import { CommentPhotoItem } from './CommentPhotoItem';
import { styles } from './PhotoStyles';

export class ExpandedPhotoItems extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={styles.overflow}>
                <TitlePhotoItem
                    src={this.props.src}
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    description={this.props.description} />

                <CommentPhotoItem
                    tripId={this.props.tripId}
                    photoId={this.props.photoId} />
            </Paper>
    );
  }
}
