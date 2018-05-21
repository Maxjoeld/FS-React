import React from 'react';
import { connect } from 'react-redux';
import { handleContactIdx } from '../../actions';

const Contact = props => {
  return (
    <div
      className="contact-box"
      onClick={() => props.handleContactIdx(props.index)}
    >

      <p className="contact-image" />
      <div className="contact-info">
        <p className="contact-firstName">{props.firstName}</p>
        <p className="contact-lastName">{props.lastName}</p>
        <p className="contact-time">{props.time}</p>
      </div>
      <p className="contact-body">{props.body}</p>
    </div>
  );
};

export default connect(null, { handleContactIdx })(Contact);
