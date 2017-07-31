import React from 'react';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List/List';

import {CommentItem} from './comment_item';
import {CommentForm} from './comment_form';

const styles = {
  paper: {
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 15,

      marginLeft: 15,
      marginRight: 15,
      marginBottom: 15
  },

  divider: {
      backgroundColor: 'grey'
  }

};

export default class Comment extends React.Component {
    render() {
        return (
            <Paper zDepth={5} rounded={false} style={styles.paper}>
                <div>
                    <List>
                        <CommentItem />
                    </List>

                    <Divider style={styles.divider}/>
                    <CommentForm/>
                </div>
            </Paper>
        );
    }
}
