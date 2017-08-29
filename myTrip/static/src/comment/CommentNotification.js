import React from 'react';

import Snackbar from 'material-ui/Snackbar';

import { styles } from './CommentStyles';

export class CommentNotification extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                autoHideDuration={3000}
                onRequestClose={this.props.onRequestClose}
                bodyStyle={styles.snackbarBody} />
    );
  }
}
