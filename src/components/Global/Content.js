// Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';


// Assets


class Content extends Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  };

  render() {
    const { body } = this.props;

    return (
      <div>
        <ToastContainer />
        {body}
      </div>
    );
  }
}

export default Content;
