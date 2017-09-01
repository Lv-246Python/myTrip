import React from 'react';

import Dialog from 'material-ui/Dialog';

import { ExpandedPhotoItems } from './ExpandedPhotoItems.js';

export class ExpandPhoto extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
              open={this.props.open}
              onRequestClose={this.props.close}>

                <ExpandedPhotoItems
                  src={this.props.src}
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                  description={this.props.description}
                  tripId={this.props.tripId}
                  photoId={this.props.photoId} />

            </Dialog>
    );
  }
}
