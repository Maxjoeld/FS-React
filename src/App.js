import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import SideBar from './components/SideBar/SideBar';
import NoteList from './components/NoteList/NoteList';
import CreateNote from './components/CreateNote/CreateNote';
import ViewNote from './components/ViewNote/ViewNote';
import EditNote from './components/EditNote/EditNote';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/SignIn';
import './App.css';

axios.defaults.withCredentials = true
// import Notes from './data';

class App extends Component {
  state = {
    notes: [],
    isAuthenticated: false,
  };
  noteIndex = 0;
  nextId = 0;

  handleNoteViewIndex = inputId => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i]._id === inputId) this.noteIndex = i;
    }
  };

  getNotes = () => {
    const id = sessionStorage.getItem('id');
    axios
      .get(`http://localhost:5000/notes/${id}`)
      .then(res => this.setState({ notes: res.data.notes }))
      .catch(error => {
        console.log({ err: 'There was an error loading your notes', error });
      });
  };

  handleCreateNote = inputNote => {
    axios
      .post('http://localhost:5000/notes/', inputNote)
      .then(() => this.getNotes())
      .catch(error => {
        console.log({ err: 'There was an error loading your notes', error });
      });
  };

  handleEditNote = inputNote => {
    const id = inputNote._id;
    const editedNote = {
      id: inputNote._id,
      title: inputNote.title,
      content: inputNote.content,
    };
    axios
      .put('http://localhost:5000/notes/', editedNote, id)
      .then(() => this.getNotes())
      .catch(error => {
        console.log({ err: 'There was an error loading your notes', error });
      });
  };

  handleDeleteNote = inputId => {
    axios
      .delete(`http://localhost:5000/notes/${inputId}`)
      .then(() => this.getNotes())
      .catch(error => {
        console.log({ err: 'There was an error loading your notes', error });
      });
  };

  updateSortedNotes = sortedNotes => {
    this.setState({
      notes: sortedNotes,
    });
  };

  isAuth = () => {
    this.setState({ isAuthenticated: !this.state.isAuthenticated });
  };

  render() {
    const PrivateRoute = ({ component: Comp, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.isAuthenticated ? (
            <Comp {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )
        }
      />
    );
    // console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/login"
            render={() => <Login isAuth={this.isAuth} getNotes={this.getNotes} />}
          />
          <Route exact path="/signup" render={() => <SignUp isAuth={this.isAuth} />} />
          <PrivateRoute exact component={SideBar} isAuth={this.isAuth} />
          <PrivateRoute
            exact
            path="/"
            component={NoteList}
            notes={this.state.notes}
            getNotes={this.getNotes}
            handleNoteViewIndex={this.handleNoteViewIndex}
            updateSortedNotes={this.updateSortedNotes}
          />
          <PrivateRoute
            exact
            path="/create"
            component={CreateNote}
            createNote={this.handleCreateNote}
          />
          <PrivateRoute
            exact
            path="/view"
            component={ViewNote}
            note={this.state.notes[this.noteIndex]}
            toggleModal={this.toggleModal}
            handleDeleteNote={this.handleDeleteNote}
          />
          <PrivateRoute
            exact
            path="/edit"
            component={EditNote}
            note={this.state.notes[this.noteIndex]}
            handleEditNote={this.handleEditNote}
          />
        </div>
      </Router>
    );
  }
}

export default App;
