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
        if(notes.legth > 0) {
            this.activeNote = notes[0];
        }
    }

    _handlers() {
        return {
            onNoteSelect(noteID) {
                console.log("Select Note " + noteID);
            },
            onNoteAdd() {
                console.log("Add Note");
            },
            onNoteEdit(title, text) {
                console.log("Edit Note");
            },
            onNoteDelete(noteID) {
                console.log("Delete Note " + noteID);
            }
        }
    }
}