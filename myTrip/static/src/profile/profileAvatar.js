import React from "react";

import Avatar from 'material-ui/Avatar';
import './profile.less';


export class Avatars extends React.Component {
    render(){
        return(
         <Avatar className='avatar' src={this.props.data.avatar_src} size={200}
          />
        );
    };

}