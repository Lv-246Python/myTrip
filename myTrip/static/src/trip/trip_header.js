import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/action/done';
import {fullWhite} from 'material-ui/styles/colors';

export default class TripHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            tripId: this.props.trip.id,
            title: this.props.trip.title,
        };
    }


    //get trip data from backend by url with trip id
    getTrip = () => {
        axios.get(`/api/v1/trip/${this.state.tripId}/`).then(response => {
            const trip = response.data;
            this.setState({trip: trip});
        });
    };

    //edit trip data

    editTrip = () => {
        const title = this.state.title;
        const description = this.state.description;
        const status = 0;
        const putTrip = (title, description, status) => {
            return axios.put(`/api/v1/trip/${this.state.tripId}/`, {
                title,
                description,
                status
            }).then(this.getTrip());
        console.log('Edit');
    }
}

    onChange = (event, newValue) => {
        this.setState({[event.target.name]: newValue});
        console.log(this.state.value);
    };


    render() {
        return (
            <div className="tripEditTitle">
                <div>
                    <TextField
                        name='title'
                        fullWidth={true}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                </div>
                <div className="tripEditSubmitButton">
                    <FlatButton
                        backgroundColor="#00BCD4"
                        onTouchTap={this.editTrip}
                        primary={true}
                        icon={<EditIcon color={fullWhite} />}
                    />
                </div>
            </div>
        );
    }
}
