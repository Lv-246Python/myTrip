import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllCheckpoints} from './actions/index.js'

import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'

class Map extends React.Component{

    constructor(){
        super()
        this.state = {
            center:{}
        }
    }

    componentDidMount() {
        navigator
        this.props.getAllCheckpoints(this.props.trip.id);
    }

    render(){
        const mapContainer = <div style={{height: '100%', width:'100%'}}></div>
        // if(this.props.checkpoints != null && this.props.checkpoints[0]){
        const center = {
            lat : 49.832721,
            lng : 23.999003
        }

        if(this.props.checkpoints && this.props.checkpoints.length){
            let list = this.props.checkpoints
            if (this.props.active != null) {
                center.lat = this.props.active.latitude,
                center.lng = this.props.active.longitude
            } else {
                let len = this.props.checkpoints.length;
                center.lat = list[len-1].latitude
                center.lng = list[len-1].longitude
                
            }
            
            const markers = list.map((point,id) => {
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
                            defaultZoom = {17}
                            center = {center}
                            options = {{streetViewControl: false, mapControl: false}}>
                            {markers}
                        </GoogleMap>
                    }/>
            )
        } else {
            return(
                    <GoogleMapLoader
                    containerElement = { mapContainer }
                    googleMapElement = {
                        <GoogleMap
                            defaultZoom = {17}
                            center = {center}
                            options = {{streetViewControl: false, mapControl: false}}>
                        </GoogleMap>
                    }/>
                );
        }
    }
}

function mapStateToProps(state) {
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

export default connect(mapStateToProps, matchDispatchToProps)(Map);