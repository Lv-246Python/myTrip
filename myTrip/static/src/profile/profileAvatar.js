import React from "react";

import Avatar from 'material-ui/Avatar';
import './profile.less';


export class Avatars extends React.Component {
    render(){
        return(
       	<div className='avatar'>
         <Avatar className='avatar' src={this.props.profile.avatar} size={200}
          />
        </div>
        );
    };
}
