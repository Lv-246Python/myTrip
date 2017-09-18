import React from 'react';

import { GridTile } from 'material-ui/GridList';
import { CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Fullscreen from 'material-ui/svg-icons/navigation/fullscreen';

import { ExpandPhoto } from './ExpandPhoto';
import { styles } from './PhotoStyles';

export class PhotoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,

        }
    }

    toggleFullscreen = () => {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <GridTile
              title={this.props.title}
              onClick={this.toggleFullscreen}
              style={styles.gridTile}
            >

                <img src={this.props.src} style={styles.image} />

                <ExpandPhoto
                  removeImage={this.props.removeImage}
                  updatePhotoInfo={this.props.updatePhotoInfo}
                  open={this.state.open}
                  close={this.toggleFullscreen}
                  src={this.props.src}
                  title={this.props.title}
                  subtitle={this.props.author}
                  description={this.props.description}
                  tripId={this.props.tripId}
                  user={this.props.user}
                  photoId={this.props.photoId}
                  mainPhoto={this.props.mainPhoto}/>
            </GridTile>
        )
    }
}
