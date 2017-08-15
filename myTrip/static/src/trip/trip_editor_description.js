import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import EditIcon from 'material-ui/svg-icons/action/done';
import {fullWhite} from 'material-ui/styles/colors';

export default class TripDescription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            value: this.props.trip.description,
        };
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        return (
            <div className="tripEdit">
                <div>
                    <TextField
                        id="trip-description"
                        value={this.state.value}
                        onChange={this.handleChange}
                        fullWidth={true}
                        />
                </div>
                <div className="tripEditSubmitButton">
                    <FlatButton
                        backgroundColor="#00BCD4"
                        onTouchTap={this.onChange}
                        primary={true}
                        icon={<EditIcon color={fullWhite} />}
                    />
                </div>


            </div>
        );
    }
}
