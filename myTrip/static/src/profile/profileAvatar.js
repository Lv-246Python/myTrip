import React from "react";

import Avatar from 'material-ui/Avatar';
import './profile.less';

const defaultAvatar = 'https://freeiconshop.com/wp-content/uploads/edd/person-flat.png'

export class Avatars extends React.Component {
    render(){
        return(
       	<div className='avatar'>
         <Avatar className='avatar' src={this.props.profile.avatar || defaultAvatar} size={200}
          />
        </div>
        );
    };
}
