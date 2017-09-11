import React from 'react';

import { updatePhoto } from './PhotoServices';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
import SubmitIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';
import TextField from 'material-ui/TextField';


export class PhotoEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expanded: false,};
    };

    onChange = (event, newValue) => {
        this.setState({[event.target.name]: newValue});
    };

    editPhoto = () => {
        updatePhoto(this.props.tripId, 
                    this.props.photoId,
                    this.state.title, 
                    this.state.description)
                    .then(response => {
                    const data = response.data
                    this.props.updatePhotoInfo(this.props.photoId, data)
                    })
    }

    handleExpandChange = () => {
    this.setState({expanded: !this.state.expanded});
    };

    render() {
        return (
                <Card>
                    <CardHeader
                      title="Edit photo"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <TextField
                        floatingLabelText="Title:"
                        hintText="Edit title"
                        name='title'
                        fullWidth={true}
                        onChange={this.onChange}
                        />

                        <TextField
                        floatingLabelText="Description:"
                        hintText="Edit description"
                        name='description'
                        fullWidth={true}
                        onChange={this.onChange}
                        />

                        <FlatButton  onTouchTap={this.editPhoto}
                        label="Save" primary={true} fullWidth={true} />

                    </CardText>
                </Card>
        );
    }
}