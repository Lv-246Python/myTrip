import React from 'react';

import Dropzone from 'react-dropzone';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import { GridList } from 'material-ui/GridList';

import { getTripPhotos, uploadPhoto } from './PhotoServices';
import { PhotoItem } from './PhotoItem';
import { userId } from '../utils';
import { styles } from './PhotoStyles';

const gridStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  element: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  }
};

export default class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: null,
            open: false
        };
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

// upload photos
    handleDrop = files => {
      const file = new FormData();
      file.append('name', files[0]);
      uploadPhoto(this.props.tripId, file)
      .then(response => {
        const data = (this.state.photos) ? this.state.photos : [];
        data.unshift(response.data);
        this.setState({'photos': data});
      })
    }

    removeImage = (photoId) => {
        this.setState({
            photos: this.state.photos.filter(photo => photoId !== photo.id)
        })
    }

//  update title and description
    updatePhotoInfo = (photoId, newData) => {
        const index = this.state.photos.findIndex(photo => photoId === photo.id);
        this.state.photos[index] = newData
        this.setState({'photos': this.state.photos})
        };

    onDropRejected = () => {
        this.setState({open: true});
    }

    handleRequestClose = () => {
    this.setState({
      open: false,
    });
    };

    render() {
        if (this.state.photos) {
            return (
                <div>
                    {(userId() === this.props.tripAuthor) ?
                    <div style={styles.buttonStyle}>
                        <FlatButton
                            label='Add a photo'
                            labelPosition='before'
                            icon={<AddPhotoIcon />}
                            primary={true}
                            containerElement='label'>
                                <Dropzone
                                    onDrop={this.handleDrop}
                                    onDropRejected={this.onDropRejected}
                                    maxSize={2097152}
                                    accept="image/*"
                                    multiple={false}
                                     >
                                </Dropzone>
                        </FlatButton>
                    </div>: '' }

                    <div style={gridStyles.container}>
                        <GridList style={gridStyles.element}>
                        {this.state.photos.map((photo) => (
                            <PhotoItem
                                updatePhotoInfo={this.updatePhotoInfo}
                                removeImage={this.removeImage}
                                key={photo.id}
                                src={photo.src}
                                title={photo.title}
                                author={photo.user_name}
                                description={photo.description}
                                tripId={this.props.tripId}
                                user={photo.user}
                                photoId={photo.id} />
                        ))}
                        </GridList>
                        <Snackbar
                            open={this.state.open}
                            message='Accept only images with maximum size 2MB'
                            autoHideDuration={4000}
                            onRequestClose={this.handleRequestClose}
                        />
                    </div>
                </div>
            );
        } else  {
            return (
                <div style={styles.buttonStyle}>
                    {(userId() === this.props.tripAuthor) ?
                    <FlatButton
                        label='Add a photo'
                        labelPosition='before'
                        icon={<AddPhotoIcon />}
                        style={styles.buttonStyle}
                        primary={true}
                        containerElement='label'>
                            <Dropzone
                                onDrop={this.handleDrop}
                                onDropRejected={this.onDropRejected}
                                maxSize={2097152}
                                multiple={false}
                                 >
                            </Dropzone>
                    </FlatButton> : '' }
                </div>
            );
        }
    }
}
