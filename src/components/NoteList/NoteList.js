import React, { Component } from "react";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { CSVLink } from "react-csv";
import Note from "./Note";

import "./Notes.css";

export default class NoteList extends React.Component {
  boolEmptyNotes = true;

  state = {
    notes: this.props.notes,
    search: ""
  };

  componentWillMount() {
    if (this.state.notes.length > 0) {
      this.boolEmptyNotes = false;
    } else {
      this.boolEmptyNotes = true;
    }
  }

  handleNoteIndex = index => {
    this.props.handleNoteViewIndex(index);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      notes: arrayMove(this.state.notes, oldIndex, newIndex)
    });
    this.props.updateSortedNotes(this.state.notes);
  };

  updateSearch = e => {
    this.setState({
      search: e.target.value.substr(0, 10)
    });
  };

  render() {
    const SortableList = SortableContainer(props => {
      return (
        <ul className="Notes--comp">
          {filteredNotes.map((note, index) => {
            return (
              <Note
                key={note.id}
                note={note}
                index={index}
                title={note.title}
                body={note.body}
                handleNoteIndex={props.handleNoteIndex}
              />
            );
          })}
        </ul>
      );
    });
    
    let filteredNotes = this.state.notes.filter(note => {
      return note.title.toLowerCase().includes(this.state.search.toLowerCase());
    });
    return (
      <div className="NotesView">
        <h2 className="NotesView__empty">
          Your Notes:{" "}
          <input
            type='text'
            placeholder="SearchEngine"
            className="NotesView--search"
            value={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </h2>
        {this.boolEmptyNotes ? (
          <h3>
            It looks like you don't have any notes yet, click "Create New Note"
            to get started!
          </h3>
        ) : null}
        <SortableList
          pressDelay={90}
          lockToContainerEdges={true}
          axis={"xy"}
          notes={this.state.notes}
          onSortEnd={this.onSortEnd}
          handleNoteIndex={this.handleNoteIndex}
        />
        {!this.boolEmptyNotes ? (
          <CSVLink
            className="CSV-Link"
            data={this.state.notes}
            filename={"lambda-notes.csv"}
          >
            Download CSV
          </CSVLink>
        ) : null}
      </div>
    );
  }
}
