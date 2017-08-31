import React from 'react';

import { GridList } from 'material-ui/GridList';

import { PhotoItem } from './PhotoItem';
import { getTripPhotos } from './PhotoServices';

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  elements: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'auto',
  }
};

export default class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }

// load photos
    getData = (tripId) => {
        getTripPhotos(tripId)
            .then(response => {
                this.setState({photos: response.data});
            });
    }

    componentDidMount() {
        this.getData(this.props.tripId);
    }

    render() {
        return (
            <div style={styles.container}>
                <GridList style={styles.elements} cols={2.2}>
                  {this.state.photos.map((photo) => (
                    <PhotoItem
                        key={photo.id}
                        src={photo.src}
                        title={photo.title}
                        author={photo.user_name}
                        description={photo.description}
                        tripId={this.props.tripId}
                        photoId={photo.id} />
                  ))}
                </GridList>
              </div>
        )
    }
}
