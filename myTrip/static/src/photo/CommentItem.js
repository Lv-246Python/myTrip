import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import CommentIcon from 'material-ui/svg-icons/communication/chat';

import Comments from '../comment/Comments';
import { styles } from './PhotoStyles';

export class CommentItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={styles.comments}>
                <CardHeader
                    title='Comments'
                    actAsExpander={true}
                    showExpandableButton={true}
                    closeIcon={<CommentIcon />}
                />

                <CardText expandable={true}>
                    <Comments
                      tripId={this.props.tripId}
                      tripPhotoId={'/photo/' + this.props.photoId} />
                </CardText>
            </Card>
    );
  }
}
