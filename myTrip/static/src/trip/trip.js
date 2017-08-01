import React from 'react';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import ChatIcon from 'material-ui-icons/Chat';              // іконка коментів
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';  // іконка стрілочки розгортання
import IconButton from 'material-ui/IconButton';            // зробити іконки кнопками
import FavoriteIcon from 'material-ui-icons/Favorite';      // іконка сердечка
import ShareIcon from 'material-ui-icons/Share';            // іконка share


const styles = {
  card: {
    maxWidth: 800,
    margin: 'auto'
  }
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
                <img src="static/src/img/world_map.jpg"/>
            </CardMedia>

            <Card style={styles.card}>
            <TripPhotoGallery />
            </Card>

            <CardText>

<h4>Description:</h4>

<p />Prior to an Olympics Games, and before the 1st European Games in Baku in 2015, a torch was lit with sacred
fire and carried around the host country to bring the spirit and excitement of the games to the whole
country. For the Baku 2017 Islamic Solidarity Games, our objective is the same but this time our Journey
is not focused on fire but on the element of water.

<p />Water is hugely important in the Islamic faith, symbolising purity, healing and cleansing. Our host city of Baku
is on the shores of the Caspian Sea. Water is one of the four classical elements that we celebrate before Novruz
alongside earth, air and fire. All of these points are hugely important and this is why we have chosen to celebrate
Water in the lead up to the Games.

<p />On 5th April 2017 the Journey from the Caspian Launch Ceremony took place at the Stone Chronicle Museum in Baku.
Ilham Aliyev, the President of the Republic of Azerbaijan presented water from the Caspian Sea to children from all
over Azerbaijan. They will then take the water back to their regions as part of the Journey from the Caspian. This
water represents a memento, from Baku and the Islamic Games, to the regions of Azerbaijan.

<p />The Journey continues and will visit 15 more iconic cities and water locations, covering over 3,000 km. Each region
will host a Water Ceremony and an evening Water Festival. The evening Water Festivals are free public events and will
include performances by local performance groups, the international renowned Azerbaijani group Mirvari, with
spectacular water effects and an exciting fireworks display.

<p />37 days after the Launch Ceremony, the Journey will come to an end at the Baku Olympic Stadium. The water collected
from all over this amazing country will return to Baku on the 12th May and will welcome the athletes of the Islamic
Solidarity Games as part of the Opening Ceremony.

<p /><p>#Hashtags</p>

            </CardText>

          <CardActions disableActionSpacing
           style={{display: 'flex', justifyContent: 'center'}}
          >
            <IconButton aria-label="Like it!">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <IconButton aria-label="Comments">
              <ChatIcon />
            </IconButton>
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
