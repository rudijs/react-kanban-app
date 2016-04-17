import React from 'react';

import AltContainer from 'alt-container';

import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import Notes from './Notes.jsx';

// container component - stateful pure class

export default class App extends React.Component {

  render() {
    return (
      <div>
      <button
        className="add-note"
        onClick={this.addNote}>+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{notes: () => NoteStore.getState().notes}}>
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    );
  }

  addNote() {
    NoteActions.create({task: 'New task'});
  }

  editNote(id, task) {
    // Don't modify if trying to set an empty value
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }

  deleteNote(id, e) {
    e.stopPropagation();
    NoteActions.delete(id);
  }

}
