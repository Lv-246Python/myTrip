import React from 'react';

import Avatar from 'material-ui/Avatar';

import { styles } from './CommentStyles';

export class CommentAvatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Avatar src="/static/src/img/avatar.png" size={30} style={styles.avatar} />
    );
  }
}
