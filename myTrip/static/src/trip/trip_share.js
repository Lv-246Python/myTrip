import React from 'react';
import axios from "axios";

import CancelIcon from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import ShareIcon from 'material-ui/svg-icons/social/share';
import SubmitIcon from 'material-ui/svg-icons/action/done';


export default class TripShare extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            tripId: this.props.tripId,
    };
    };

    render() {
        return(
            <div 
                className="fb-share-button" 
                data-href={`http://triptrck.com:8000/trip/${this.tripId}`}
                data-layout="button" 
                data-size="small" 
                data-mobile-iframe="true">
                    <a className="fb-xfbml-parse-ignore" target="_blank"
                    href={`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftriptrck.com%3A8000%2Ftrip%2F${this.state.tripId}&amp;src=sdkpreparse`}>
                        <ShareIcon/>
                    </a>
            </div>
    )}
}
