// npm install --save google-maps-react

import React from 'react';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';  // іконка стрілочки розгортання
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';       // іконка сердечка
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';



const styles = {
  card: {
    maxWidth: 800,
    margin: 'auto'
  },
  checkbox: {
    marginLeft: 10,
    marginBottom: 16,
    marginRight: 16
  },
};


class Trip extends React.Component {
   render() {
      return (
         <div>
         <Card style={styles.card}>

            <CardHeader
               title={<h2>Baku journey</h2>}
               subtitle="Status: announced. Last date update: 5 days ago"
            />

            <CardMedia>
                <img src="static/src/img/world_map.jpg" />
            </CardMedia>

            <Card style={styles.card}>
            <TripPhotoGallery />
            </Card>

            <CardText>
              <h3>Description</h3>
                <TextField
                  hintText="Type here your description"
                  multiLine={true}
                  fullWidth={true}
                  rowsMax={25}
                />
            </CardText>

          <CardActions>
            <Checkbox
              checkedIcon={<ActionFavorite />}
              uncheckedIcon={<ActionFavoriteBorder />}
              label="Like it!"
              style={styles.checkbox}
            />
          </CardActions>

            <TripComments />
            <TripCheckpoints />

         </Card>
         </div>
      );
   }
}


class TripPhotoGallery extends React.Component {
   render() {
      return (
         <div>
            <h3>TripPhotoGallery</h3>
         </div>
      );
   }
}


class TripComments extends React.Component {
   render() {
      return (
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
      );
   }
}


class TripCheckpoints extends React.Component {
   render() {
      return (
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
      );
   }
}


export default Trip;
