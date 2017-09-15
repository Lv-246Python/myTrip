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

    // share = () => {
    //     axios.post(`/api/v1/trip/${this.state.tripId}/share/`)
    //     .then(this.toggleOpen())
    // };

    // toggleOpen = () => {
    //     this.setState({open: !this.state.open});
    // };


    render() {
        //     const actionsShare = [
        //     <div className='buttonTripDialog'>
        //         <RaisedButton
        //             className='button-submit-share-trip'
        //             label='Submit'
        //             labelPosition='before'
        //             icon={<SubmitIcon />}
        //             primary={true}
        //             onTouchTap={this.share}
        //         />
        //         <RaisedButton
        //             className='button-cancel-trip-edit'
        //             label='Cancel'
        //             labelPosition='before'
        //             icon={<CancelIcon />}
        //             secondary={true}
        //             onTouchTap={this.toggleOpen}
        //         />
        //     </div>
        // ];

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
            // <div>
            //     <IconButton
            //         key='share'
            //         className='buttonEditTrip'
            //         onTouchTap={this.toggleOpen}
            //         tooltip='Share trip'
            //         tooltipPosition='top-center'
            //     >
            //         <ShareIcon/>
            //     </IconButton>

            //     <Dialog
            //         title='Share this trip on facebook'
            //         actions={actionsShare}
            //         open={this.state.open}
            //     >
            //     </Dialog>
            // </div>

    )}
}



                                        // <div 
                                        // className="fb-share-button" 
                                        // data-href={"http://triptrck.com:8000/" + this.tripId}
                                        // data-layout="button" 
                                        // data-size="small" 
                                        // data-mobile-iframe="true">
                                        // <a className="fb-xfbml-parse-ignore" target="_blank"
                                        // href={`https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftriptrck.com%3A8000%2Ftrip%2F${this.tripId}&amp;src=sdkpreparse`}>
                                        // <ShareIcon/>
                                        // </a>
                                        // </div>