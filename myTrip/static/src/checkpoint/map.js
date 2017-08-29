import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllCheckpoints} from './actions/index.js'

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class Mapp extends React.Component{

    constructor(){
        super()
        this.state = {
            center:{}
        }
    }

    componentDidMount() {
        this.props.getAllCheckpoints();
    }

    render(){
        console.log(this.props.checkpoints)
        console.log('props center',this.props.center)
        const mapContainer = <div style={{height: '100%', width:'100%'}}></div>
        if(this.props.checkpoints != null && this.props.checkpoints[0]){
            if(this.props.active != null){
                var center = {
                lat : this.props.active.latitude,
                lng : this.props.active.longitude
                }
            }else{
                var len = this.props.checkpoints.length
            var center = {
                lat : this.props.checkpoints[len-1].latitude,
                lng : this.props.checkpoints[len-1].longitude
            }
            }
            
            const markers = this.props.checkpoints.map((point,id) => {
            const marker = {
                position: {
                    lat:point.latitude,
                    lng:point.longitude
                }
            }
            return <Marker key={id} {...marker} />
        })

        return(
            <GoogleMapLoader
                containerElement = { mapContainer }
                googleMapElement = {
                    <GoogleMap
                        defaultZoom = {14}
                        center = {center}
                        options = {{streetViewControl: false, mapControl: false}}>
                        {markers}
                    </GoogleMap>
                }/>
        );}else{
            return(
                <div>
                </div>
                );
        }
    }
}

function mapStateToProps(state) {
    console.log('This is State!!!',state)
    return {
        checkpoints: state.checkpoints,
        active:state.activeCheckpoint
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {getAllCheckpoints: getAllCheckpoints},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Mapp);