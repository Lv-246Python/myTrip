import React from 'react';
import moment from 'moment';

import { Card, CardHeader, CardMedia, CardText, CardActions } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import {List, ListItem} from 'material-ui/List';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/content/create';
import EditDescriptionIcon from 'material-ui/svg-icons/editor/border-color';
import TitleIcon from 'material-ui/svg-icons/editor/title';

/*
import Map from 'map';
import Photo from 'photo'
import Like from 'like';
*/

const styles = {
    column: {
    display: 'flex',
    flexDirection: 'column',
    },
    menu: {
    flex: 1,

    },
    card: {
        maxWidth: 800,
        margin: 'auto',
    },
    checkbox: {
        marginLeft: 750,
        marginBottom: 16,
    },
};


export default class TripItem extends React.Component {
    constructor(props){
        super(props);
        this.state = props.trip;
    };

    render(){
        return (
        <div style={styles.card}>
            <Card>

                <Card>
                    <CardHeader
                    title={this.state.title}
                    subtitle={moment(this.state.create_at).format('MMMM Do, h:mm a')}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />

                    <CardText className='comments' expandable={true}>
                      <List>
                        <ListItem
                          primaryText="Edit trip"
                          leftIcon={<EditIcon />}
                          initiallyOpen={false}
                          primaryTogglesNestedList={true}
                          nestedItems={[
                            <ListItem
                              key={1}
                              primaryText="Edit title"
                              leftIcon={<TitleIcon />}
                            />,
                            <ListItem
                              key={2}
                              primaryText="Edit description"
                              leftIcon={<EditDescriptionIcon />}
                            />,
                          ]} />
                        <ListItem primaryText="Delete trip" leftIcon={<DeleteIcon />} />

                      </List>
                    </CardText>
                </Card>

                {/*
                there will be Google Map component
                */}

                <CardMedia>
                    <img src="/static/src/img/world_map.jpg" />
                </CardMedia>

                {/*
                there will be <Photo /> component
                */}

                <CardMedia>
                    <h3>Trip Photo Gallery</h3>
                </CardMedia>

                <CardText className='description'>
                    <h3>Description</h3>
                    {this.state.description}
                </CardText>

                {/*
                there will be <Like /> component
                */}

                <CardActions>
                    <Checkbox
                    checkedIcon={<ActionFavorite />}
                    uncheckedIcon={<ActionFavoriteBorder />}
                    style={styles.checkbox} />
                </CardActions>

            </Card>

        </div>
        );
    }
}
