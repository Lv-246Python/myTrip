import React from "react";

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CheckpointItem from './checkpointItem.js';
import {getAllCheckpoints} from './actions/index.js'

class CheckpointList extends React.Component{

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

    render(){
        if(this.props.checkpoints != null && this.props.checkpoints.length > 0){
            var list = this.props.checkpoints;
                list = list.map(item =>{
                     return (
                        <CheckpointItem key={item.id} checkpoint={item} tripId={this.props.trip.id}/>
                    );
                })
                return(
                    <DropDownMenu
                        
                        maxHeight={250}>
                        {list}
                    </DropDownMenu>
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
