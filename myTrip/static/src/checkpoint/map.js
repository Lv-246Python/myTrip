import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getAllCheckpoints , createCheckpointUpdateList, checkpointDetails, deleteUpadateList} from './actions/index.js'

import {GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer, Polyline, InfoWindow} from 'react-google-maps'

let directionsDisplay=new google.maps.DirectionsRenderer();
let directionsService=new google.maps.DirectionsService();

class Map extends React.Component{

    constructor(){
        super()
        this.state={
            center:null,
            checkpoints:null,
            active:null,
            showInfo:null,
            map:null
        }
    }

    componentDidMount(){
        this.props.getAllCheckpoints(this.props.trip.id);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps) {
            console.log('recieved props',nextProps)
            let len=nextProps.checkpoints.length;
            let lat;
            let lng;
            if(nextProps.active!=null){
                // center if there is active
                lat=nextProps.active.latitude
                lng=nextProps.active.longitude
                console.log(1)
                this.setState({ checkpoints:nextProps.checkpoints,
                                active:nextProps.active,
                                center:{lat:lat,lng:lng}});
            }else{
                if(nextProps.checkpoints.length==0){
                    // center if no checkpoints at all getting position of user if unable hardcode it 
                    console.log(2)
                    navigator.geolocation.getCurrentPosition( 
                        data => {
                            console.log({lat:data.coords.latitude,lng:data.coords.longitude})
                            lat = data.coords.latitude;
                            lng = data.coords.longitude
                            this.setState({ checkpoints:nextProps.checkpoints,
                                            active:nextProps.active,
                                            center:{lat:lat,lng:lng}});
                        },
                        err => {
                            console.log(err.message);
                            lat=49.832721
                            lng=23.999003
                            this.setState({ checkpoints:nextProps.checkpoints,
                                            active:nextProps.active,
                                            center:{lat:lat,lng:lng}});
                        }, 
                        { enableHighAccuracy:true }
                    )

                }else{
                    if(this.state.map){
                        // center from loaded map (adding and deleteng without centring)
                        console.log(4,this.state.map.props.center.lat)
                        lat=this.state.map.props.center.lat
                        lng=this.state.map.props.center.lng
                        this.setState({ checkpoints:nextProps.checkpoints,
                                        active:nextProps.active,
                                        center:{lat:lat,lng:lng}});
                    }else{
                        // /center if there are checkpoints gets latest position
                        lat=nextProps.checkpoints[len-1].latitude
                        lng=nextProps.checkpoints[len-1].longitude
                        console.log(3)
                        this.setState({ checkpoints:nextProps.checkpoints,
                                        active:nextProps.active,
                                        center:{lat:lat,lng:lng}});
                    }
                }
            } 
        }
    }

    mapLoaded=(map)=>{
        if(this.state.ma!=null)
            return
        this.setState({map:map})
        console.log('map loaded');
    }

    handleMapClick=(map)=>{
        if(this.state.active){
            return
        }else{
            const longitude=map.latLng.lng();
            const latitude=map.latLng.lat();
            const description='';
            let position_number;
            if(this.state.checkpoints == undefined || this.state.checkpoints.length == 0){
                position_number=1;
            }else{
                let len=this.state.checkpoints.length;
                position_number=this.state.checkpoints[len - 1].position_number + 1;
            }
            const title=this.props.trip.title;
            const source_url='';
            const tripId=this.props.trip.id
            this.props.createCheckpointUpdateList(longitude,
                                                  latitude,
                                                  title,
                                                  description,
                                                  position_number,
                                                  source_url,
                                                  tripId);
        }
        
    }

    handleLeftClick=(point)=>{
        if(this.state.active && this.state.active.id==point.id){
            this.setState({active:null,showInfo:null})
        }else{
            this.setState({showInfo:point,active:point});
        }
        this.props.checkpointDetails(point);
        
    }

    handleRightClick=(point)=>{
        if(this.state.active){
            return
        }else{
            this.props.deleteUpadateList(point.id, this.props.trip.id);
        } 
    }

    handleOnMouseover=(point)=>{
        this.setState({showInfo:point})
    }

    mapMarkers=(arr)=>{
        let markers=arr.map((point,id) => {
                const marker={
                    position:{
                        lat:point.latitude,
                        lng:point.longitude
                    }
                }

                let infoWindow
                if((this.state.showInfo && this.state.showInfo.id==point.id) || (this.state.active && this.state.active.id == point.id)){
                     infoWindow = <InfoWindow onCloseclick={()=>this.handleLeftClick(point)}>
                                    <div> №{point.position_number} {point.description} </div>
                                </InfoWindow>
                }

                return <Marker 
                            key={id} {...marker} 
                            onMouseout={()=>this.setState({showInfo:null})}
                            onMouseover={()=>this.handleOnMouseover(point)}
                            onClick={()=>this.handleLeftClick(point)} 
                            onRightclick={()=>this.handleRightClick(point)}
                            icon={'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'}>
                                {infoWindow}
                        </Marker>
        });
        return markers;
    }

    handleZoom=()=>{
        console.log(this.state.map.getZoom());
    }

    handleDragMap=()=>{
        console.log('map moved', this.state.map.getCenter().lat(),this.state.map.getCenter().lng())
        this.setState({center:{lat:this.state.map.getCenter().lat(),lng:this.state.map.getCenter().lng()}})
    }

    render(){
        const mapContainer=<div style={{height:'100%', width:'100%'}}></div>
        const center={
            lat:49.832721,
            lng:23.999003
        }
            console.log('state changed',this.state)
        if(this.state.checkpoints && this.state.checkpoints.length){
            
            let list=this.state.checkpoints;    
            const markers=this.mapMarkers(list);
            const polymarkers=list.map((point)=>{
                return {lat:point.latitude, lng:point.longitude};
            })     
            const polypath=<Polyline path={polymarkers} options={{strokeColor:'#07a651', strokeWeight:3}}/> 
            // def zoom 16
            const map=<GoogleMap
                            ref={this.mapLoaded}
                            defaultZoom={16}
                            center={this.state.center}
                            options={{streetViewControl:false, mapControl:false}}
                            onClick={this.handleMapClick}
                            onDragend={this.handleDragMap}
                            onZoomChanged={this.handleZoom}>
                            markers={markers}
                            path={polypath}
                        </GoogleMap>

            return(
                <GoogleMapLoader
                    containerElement={mapContainer}
                    googleMapElement={map}/>
            );
        } else {
            return(
                    <GoogleMapLoader
                    containerElement={mapContainer}
                    googleMapElement={
                        <GoogleMap
                            defaultZoom={16}
                            center={this.state.center}
                            options={{streetViewControl:false, mapControl:false}}
                            onClick={this.handleMapClick}>
                            <Marker 
                            position={this.state.center} 
                            icon={{     path:google.maps.SymbolPath.CIRCLE,
                                   scale:15,
                                   strokeColor:'green',
                                   strokeWeight:8}}>
                        </Marker>
                        </GoogleMap>
                    }/>
                );
        }
    }
}

function mapStateToProps(state){
    return {
        checkpoints:state.checkpoints,
        active:state.activeCheckpoint
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {getAllCheckpoints:getAllCheckpoints,
        createCheckpointUpdateList:createCheckpointUpdateList,
        checkpointDetails:checkpointDetails,
        deleteUpadateList:deleteUpadateList},
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Map);
