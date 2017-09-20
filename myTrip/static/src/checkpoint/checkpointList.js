import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import CheckpointIcon from 'material-ui/svg-icons/maps/pin-drop';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import CheckpointItem from './checkpointItem.js';
import {getAllCheckpoints} from './actions/index.js'

class CheckpointList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    // constructor(props) {
    //     super(props);
    //     this.state =
    //     {value: 'Choose checkpoint'};
    // }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps){
    //         this.setState({value:nextProps.active.title})
    //     }
    // }

    // handleChange = (event, index, value) => this.setState({value:this.props.active.title});

    componentDidMount() {
        this.props.getAllCheckpoints(this.props.trip.id);
    }

    handleChange = (event, index, value) => this.setState({value});

    render(){
        if(this.props.checkpoints != null && this.props.checkpoints.length > 0){
            var list = this.props.checkpoints;
                list = list.map(item =>{
                     return (
                        <CheckpointItem key={item.id} checkpoint={item} trip={this.props.trip} />
                    );
                })
                list = list.reverse();
                return(
                    <div>
                        <RaisedButton
                            onClick={this.handleTouchTap}
                            label="Show checkpoints list"
                            fullWidth={true}
                            icon={<CheckpointIcon />}
                        />
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            onRequestClose={this.handleRequestClose}
                        >
                            <Menu maxHeight={250}>
                                {list}
                            </Menu>
                        </Popover>
                    </div>
                );
        }
        else{
            return(
                <div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        checkpoints: state.checkpoints
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {getAllCheckpoints: getAllCheckpoints},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpointList);
