import React from 'react';

import Dropzone from 'react-dropzone';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import { GridList } from 'material-ui/GridList';

import { getTripPhotos, uploadPhoto } from '../photo/PhotoServices';
import { PhotoItem } from '../photo/PhotoItem';
import { userId } from '../utils';

const gridStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    height: '100%',
  },
  element: {
    flex: 1,
    display: 'flex',
    width: 200,
    minHeight: '100px',
    maxHeight: 200,
    height: 'auto',
    overflowY: 'auto',
  },
};

export default class PhotosToCheckpoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: null,
            open: false,
            checkpointId: this.props.checkpointId,
        }
    }


// load photos
    getData = (tripId, checkpointId) => {
        getTripPhotos(tripId, checkpointId)
            .then(response => {
                this.setState({photos: response.data});
            });
    }

    componentDidMount() {
        this.getData(this.props.tripId, this.state.checkpointId);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            checkpointId: nextProps.checkpointId,
        });
        this.getData(this.props.tripId, nextProps.checkpointId);
    }

// upload photos
    handleDrop = files => {
      const file = new FormData();
      file.append('name', files[0]);
      uploadPhoto(this.props.tripId, this.state.checkpointId, file)
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
                    <div >
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
                                    multiple={false}
                                     >
                                </Dropzone>
                        </FlatButton>
                    </div>: '' }

                    <div style={gridStyles.container}>
                        <GridList
                            cols={1}
                            rows={1}
                            style={gridStyles.element}
                        >
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
                                checkpointId={this.state.checkpointId}
                                user={photo.user}
                                photoId={photo.id}
                                mainPhoto={photo.main_photo}
                                getData={this.getData}/>
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
                <div >
                    {(userId() === this.props.tripAuthor) ?
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
                                multiple={false}
                                 >
                            </Dropzone>
                    </FlatButton> : '' }
                </div>
            );
        }
    }
}
