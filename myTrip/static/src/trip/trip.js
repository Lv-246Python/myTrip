import React from 'react';
import axios from "axios";

import PropTypes from 'prop-types';
import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'

/*
import Checkpoint from 'checkpoint';
import Comment from 'comment';
import Like from 'like';
import Photo from 'photo'
*/


const styles = {
  card: {
    maxWidth: 800,
    margin: 'auto'
  },
  checkbox: {
    marginLeft: 750,
    marginBottom: 16
  },
};


// hardcoded response
let resp = {
    title: 'Baku journey',
    description: 'Trip description',
    status: 0,
    create_at: '2017-08-03 21:45:02.047092+03',
    update_at: '2017-08-03 21:45:02.047111+03',
};


class Trip extends React.Component {
    constructor(props){
        super(props);
        this.state = {trip: []}

    };

    getTrip = () => {
    return axios.get('/api/v1/trip/')
    .then(response => {const trip = response.data; this.setState({trip});})
    .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getTrip()
    }

    onChange = (event, newValue) => {
        this.setState({[event.target.name]: newValue});
    };

    putTrip = (title, description, status, create_at, update_at) => {
        return axios.put('/api/v1/trip/', {
            title,
            description,
            status,
        })
    }

    tripEdit = (event) => {
        const title = this.state.title;
        const description = this.state.description;
        const status = this.state.status;
        this.putTrip(
            title,
            description,
            status,
            )
        console.log(title, description, status, create_at, update_at)
    }


   render() {
      return (
         <div>

         <Card style={styles.card}>

         <FlatButton onTouchTap={this.tripEdit}
          label="Edit profile" primary={true} fullWidth={true}
         />

            <CardHeader
             title={this.state.title}
             subtitle={this.state.status}
             onChange={this.onChange}
            />

            <CardMedia>
                <img src="static/src/img/world_map.jpg" />
            </CardMedia>

            {/*
            there will be <Photo /> component
            */}

            <Card>
             <div>
                <h3>Trip Photo Gallery</h3>
             </div>
            </Card>

            <CardText>
              <h3>Description</h3>
                <TextField
                  description={this.state.description}
                  multiLine={true}
                  fullWidth={true}
                  rowsMax={25}
                  onChange={this.onChange}
                />
            </CardText>

            {/*
            there will be <Like /> component
            */}

          <CardActions>
            <Checkbox
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              style={styles.checkbox}
            />
          </CardActions>

            {/*
            there will be <Comment /> component
            */}

          <Card>
            <CardHeader
              title={<h3>Comments</h3>}
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>

            {/*
            there will be <Checkpoint /> component
            */}

          <Card>
            <CardHeader
              title={<h3>Checkpoints</h3>}
              actAsExpander={true}
              showExpandableButton={true}
            />

            <CardText expandable={true}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>

         </Card>
         </div>
      );
   }
}


/*
analogue isinstance() in Python but for props in React

Trip.propTypes = {
  object: PropTypes.object.isRequired,
};

*/

export default Trip;
