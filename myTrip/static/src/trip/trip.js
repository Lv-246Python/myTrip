// npm install --save google-maps-react

import React from 'react';

import PropTypes from 'prop-types';
import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import TextField from 'material-ui/TextField';

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
                  hintText="Type here your description"
                  multiLine={true}
                  fullWidth={true}
                  rowsMax={25}
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
