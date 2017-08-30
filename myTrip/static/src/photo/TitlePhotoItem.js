import React from 'react';

import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import { styles } from './PhotoStyles';

export class TitlePhotoItem extends React.Component {
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
            </Card>
    );
  }
}
