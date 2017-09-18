import React from "react";
import axios from "axios";
import moment from 'moment';

import Subscribe from '../subscribe/Subscribe';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

import './profile.less';

const style = {
    width: 500,
    height: 500,
    margin: 10,
}

const profileURL = '/api/v1/profile/';

export default class ProfileByID extends React.Component {
    constructor(props) {
        super(props);
        this.profileID = this.props.match.params.id;
        this.state = {
            profile: null,
            open: false,
        };
    }

    getProfile = () => {
        const profileID = this.profileID
        return axios.get(profileURL+profileID)
        .then(response => {
        const profile = response.data;
        this.setState({profile: profile});
    });
    }

    handleOpen = () => {
        this.setState({open: true});
    };
    
    componentDidMount(){
        this.getProfile();
    }

  render(){
    const data = this.state.profile
    return (
        <div className="Profile">
           <Paper  className="MainPaperOtherUser" zDepth={2} >
            {data && <Card profile={data} className="MainPaperOtherUser" >
                    <CardMedia>
                            <img src={data.avatar} alt="" style={style} />
                    </CardMedia>
                        <CardTitle title={data.first_name + '   ' + data.last_name} subtitle={data.email} />
                            <CardText>Gender: {data.gender}</CardText>
                            <CardText>Birthday: {moment(this.state.birthday).format('YYYY-MM-DD')}</CardText>
                            <CardText>Hobbies: {data.hobbies}</CardText>
                        <CardActions className='cardActions'>
                                <Subscribe
                                    open={this.state.open}
                                    profileId={this.profileID}
                                />
                            <FlatButton 
                            label="Subscribe" 
                            primary={true}
                            onClick={this.handleOpen}
                             />
                        </CardActions>
                </Card>}
          </Paper>
        </div>
      );
  };
}
