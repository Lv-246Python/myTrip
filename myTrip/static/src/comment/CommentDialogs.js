import React from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import { moveCaretAtEnd } from '../utils';

export class DeleteDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
              title={this.props.title}
              actions={this.props.actions}
              open={this.props.open} />
    );
  }
}

export class EditDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
                title={this.props.title}
                actions={this.props.actions}
                open={this.props.open}
                modal={true}>

                  <TextField
                      autoFocus
                      name='edit message'
                      onFocus={moveCaretAtEnd}
                      fullWidth={true}
                      multiLine={true}
                      floatingLabelText={this.props.floatingLabelText}
                      value={this.props.value}
                      onChange={this.props.onChange} />
            </Dialog>
    );
  }
}
