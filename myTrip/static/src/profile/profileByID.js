import React from "react";
import axios from "axios";

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'


import './profile.less';

const profileURL = '/api/v1/profile/';


export default class ProfileByID extends React.Component {
    constructor(props) {
        super(props);
        this.profileID = this.props.match.params.id;
        this.state = {
            profile: null
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
    
    componentDidMount(){
        this.getProfile();
    }

  render(){
    const data = this.state.profile
    return (
          data && <Paper className='MainPaper'  zDepth={2} >
                <Card profile={data}>
                    <CardMedia
                      overlay={<CardTitle title={data.first_name + ' ' + data.last_name} subtitle={data.email} />}
                    >
                      <img src={data.avatar} alt="" />
                    </CardMedia>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                    <CardActions>
                      <FlatButton label="Action1" />
                      <FlatButton label="Action2" />
                    </CardActions>
                </Card>

          </Paper>
      );
  };
}
