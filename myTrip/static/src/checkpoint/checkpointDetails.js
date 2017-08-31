import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {closeDetails, updateCheckpointUpdateList} from './actions/index.js'

// import {store} from './testing-page-for-checkpoints.js'
class CheckpointDetails extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
            title:'',
            description:''
        }
      // this.updateState = this.updateState.bind(this);

   };
    componentWillReceiveProps(nextProps) {
        if (nextProps.active != null) {
            this.setState({ title: nextProps.active.title,
                            description:nextProps.active.description});
        }
    }      

    updateState = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    updatePoint = () => {
        this.props.updateCheckpointUpdateList(
        this.props.active.longitude,
        this.props.active.latitude,
        this.state.title,
        this.state.description,
        this.props.active.position_number,
        this.props.active.source_url,
        this.props.trip.id,
        this.props.active.id
            )
    }

    render(){
        if(this.props.active != null){
            var  self = this;
            return(
                <div>
                    <span className='info'><strong>Title: </strong></span>
                    <input type="text" name="title" value={this.state.title} onChange={this.updateState}/>
                    <span className='info'><strong>Description: </strong></span>
                    <input type="text" name="description" value={this.state.description} onChange={this.updateState}/>
                    <button onClick={this.updatePoint}>Update</button>
                    <span onClick={() => this.props.closeDetails()} className="glyphicon glyphicon-remove">Close</span>
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
        active: state.activeCheckpoint
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {closeDetails: closeDetails,
        updateCheckpointUpdateList:updateCheckpointUpdateList},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(CheckpointDetails);
