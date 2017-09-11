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
                  removeImage={this.props.removeImage}
                  updatePhotoInfo={this.props.updatePhotoInfo}
                  close={this.props.close}
                  src={this.props.src}
                  title={this.props.title}
                  subtitle={this.props.subtitle}
                  description={this.props.description}
                  tripId={this.props.tripId}
                  user={this.props.user}
                  photoId={this.props.photoId} />

            </Dialog>
    );
  }
}
