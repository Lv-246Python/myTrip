import React from 'react';

// Comment component
class Comment extends React.Component {
    render() {
        return (
            <div>
                <div className="Comment">
                    <Author user={this.props.author}/>

                    <div className="Comment-text">
                        {this.props.text}
                    </div>

                    <div className="Comment-date">
                        {formatDate(this.props.date)}
                    </div>
                </div>
            </div>
        );
    }
}

// Author component
function Author(props) {
    return (
        <div className="Author">
            <Avatar user={props.user}/>

            <div className="Author-name">
                {props.user.name}
            </div>
        </div>
    );
}

// Avatar component
function Avatar(props) {
    return (<img className="Avatar" src={props.user.avatarUrl} alt={props.user.name}/>);
}

// Date component
function formatDate(date) {
    return date.toLocaleDateString();
}
