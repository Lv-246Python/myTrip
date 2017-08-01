import React from 'react';

import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';

const styles = {
  avatar: {
      marginRight: 10,
      marginBottom: 10
  }
};


class Trip extends React.Component {
   render() {
      return (
         <div>
            <TripHeader />
            <TripMap />
            <TripPhotoGallery />
            <TripMainText />
            <TripComments />
            <TripCheckpoints />
         </div>
      );
   }
}


class TripHeader extends React.Component {
   render() {
      return (
         <Paper>
            <AuthorName />
            <AuthorAvatar />
            <TripTitle />
            <TripStatus />
         </Paper>
      );
   }
}


class AuthorName extends React.Component {
   render() {
      return (
         <div>
            <h3>AuthorName</h3>
         </div>
      );
   }
}


class AuthorAvatar extends React.Component {
   render() {
      return (
         <div>
            <Avatar src="static/src/img/avatar.jpg" size={40} style={styles.avatar}/>
         </div>
      );
   }
}


class TripTitle extends React.Component {
   render() {
      return (
         <div>
            <h3>TripTitle</h3>
         </div>
      );
   }
}


class TripStatus extends React.Component {
   render() {
      return (
         <div>
            <h3>TripStatus</h3>
         </div>
      );
   }
}


class TripMap extends React.Component {
   render() {
      return (
         <div>
            <img src="static/src/img/world_map.jpg" style={{margin:0}} />
         </div>
      );
   }
}


class TripPhotoGallery extends React.Component {
   render() {
      return (
         <Paper>
            <h3>TripPhotoGallery</h3>
         </Paper>
      );
   }
}


class TripMainText extends React.Component {
   render() {
      return (
         <Paper>
            <TripDescription />
            <TripHashtags />
         </Paper>
      );
   }
}



class TripDescription extends React.Component {
   render() {
      return (
         <div>
            <h3>TripDescription</h3>
         </div>
      );
   }
}


class TripHashtags extends React.Component {
   render() {
      return (
         <div>
            <p>#TripHashtags</p>
         </div>
      );
   }
}


class TripComments extends React.Component {
   render() {
      return (
         <div>
            <h3>TripComments </h3>
         </div>
      );
   }
}


class TripCheckpoints extends React.Component {
   render() {
      return (
         <div>
            <h3>TripCheckpoints </h3>
         </div>
      );
   }
}


export default Trip;
