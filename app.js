import notesView from './notesView.js';
import notesAPI from './notesAPI.js';

export default class App {

    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new notesView(root , this._handlers());
        this._refreshNotes();
    }
    
    _refreshNotes() {
        const notes = notesAPI.getAllNotes();
        this._setNotes(notes);
        if(notes.length > 0) {
            this.activeNote = notes[0];
            this.view.updateActiveNote(this.activeNote);
            this.view.updateNotePreviewVisibility(notes.length>0);
        }
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(this.activeNote);
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(this.notes);
    }

    _handlers() {
        return {
            onNoteSelect: (noteID) => {
                const selectedNote = this.notes.find(note => note.id === noteID);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: 'New Note',
                    content: 'Note Content',
                };

                notesAPI.saveNote(newNote);
                this._refreshNotes();

                const latestNote = notesAPI.getAllNotes()[0];
                this._setActiveNote({id: latestNote.id , title: '' , content: ''});

    
            },
            onNoteEdit: (title, content) => {
                notesAPI.saveNote({
                    id: this.activeNote.id , title , content 
                });
                this._refreshNotes();
            },
            onNoteDelete: (noteID) => {
                notesAPI.deleteNote(noteID);
                this._refreshNotes();
            }
        }
    }
}