// npm install material-ui
// npm install material-ui-icons
// npm install typeface-roboto --save

import React, { Component } from 'react';
import PropTypes from 'prop-types';        // npm install prop-types --save
import classnames from 'classnames';        // npm install classnames --save
//import { withStyles, createStyleSheet } from 'material-ui/styles';        // вбудований CSS
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';    // cards elements
import Avatar from 'material-ui/Avatar';                    // аватарка
import IconButton from 'material-ui/IconButton';            // зробити іконки кнопками
import FavoriteIcon from 'material-ui-icons/Favorite';      // іконка сердечка
import ShareIcon from 'material-ui-icons/Share';            // іконка share
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';  // іконка стрілочки розгортання
import injectTapEventPlugin from 'react-tap-event-plugin';

const styleSheet = createStyleSheet(theme => ({
  card: { maxWidth: 800 },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
      marginRight: 10,
      marginBottom: 10 },
  flexGrow: { flex: '1 1 auto' },
}));

class TripCard extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const classes = this.props.classes;

    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title="Trip title"
            subheader="last date update"
          />
          <CardMedia>
            <img src="static/src/img/world_map.jpg" alt="World map" />
          </CardMedia>
          <CardContent>
            <div>
              Description.
            </div>
          </CardContent>
          <CardActions disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <div className={classes.flexGrow} />
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <CardText expandable={true}>
            <CardContent>
              <div>
                <p>
                On this trip you’ll get to know a diversified and fascinating French region where the weather
                changes as quickly as the landscape. As one of France’s most rugged coastlines, Brittany is
                renowned the world over for its spectacular rock formations and secluded bays, alternating with
                beautiful sandy beaches, medieval walled towns, castles and historic cathedrals, alongside unique
                stone houses in quiet, romantic villages. Due to a well-developed infrastructure with countless
                campgrounds and shopping facilities, short distances between the sights, and so much to discover
                and explore, Brittany is an exiting, picture-perfect family destination.
                </p>
              </div>
            </CardContent>
          </CardText>
        </Card>
      </div>
    );
  }
}

TripCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default TripCard;