import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {addNotification} from './GlobalActions'
import NotificationSystem from 'react-notification-system'


class Notificacion extends Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(newProps) {
    const { title, message, level } = newProps.notification;
    this.notificationSystem.addNotification({
      title,
      message,
      level
    });
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }

}

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addNotification
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notificacion);
