import React, { Component } from 'react';
import openSocket from 'socket.io-client';

import { connect } from 'react-redux';
import { getContact, getConversation, getUsers } from '../../actions';
import SideBar from '../SideBar/SideBar';
import Contact from './Contact';
import Chatbox from './Chatbox';

const socket = openSocket('http://localhost:8000');

class Convo extends Component {
  state = {
    search: '',
  };
  async componentWillMount() {
    await this.props.getContact();
    await this.props.getUsers();
  }

  componentWillUnmount() {
    socket.emit('leave conversation', this.props.contact.conversationId);
  }
  getContact = (e) => {
    e.preventDefault();
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };


  render() {
    // const filteredContacts = this.props.notes.filter(note => {
    //   return note.title.toLowerCase().includes(this.state.search.toLowerCase());
    // });

    const { search } = this.state;
    return (
      <div className="Master">
        <SideBar />
        <div className="friendcomp">
          <div className="friendslist">
            <p> Friends </p>
            <p> {this.props.contacts.length} Conversations </p>
            <form>
              <input
                type="text"
                placeholder="Search contacts"
                className="friendlist--search"
                value={search}
                name='search'
                onChange={this.props.handleInputChange}
              />
            </form>
            {this.props.contacts.length > 0
              ? this.props.contacts.map(person => {
                  return (
                    <Contact
                      key={person._id}
                      index={person._id}
                      body={person.body.slice(0, 40)}
                      firstName={person.author.profile.firstName}
                      lastName={person.author.profile.lastName}
                      time={person.createdAt.split('').splice(11, 5).join('')}
                      convoId={person.conversationId}
                    />
                  );
                })
              : null}
          </div>
          <hr className="convo-hr" />
          <Chatbox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contacts: state.contacts,
    contact: state.contact,
    conversation: state.conversation,
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  getContact,
  getUsers,
  getConversation,
})(Convo);

// we simply just want to search for the user then onClick display the user
// in the contactList that is displayed there
