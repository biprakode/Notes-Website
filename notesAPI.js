export default class notesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem('notesApp')) || [];
        return notes.sort((a, b) => {
            return new Date(b.updated) - new Date(a.updated);
        })
    }

    static saveNote(noteToSave) {
        const notes = notesAPI.getAllNotes();
        const exists = notes.find(note => note.id == noteToSave.id);

        if(exists) {
            exists.title = noteToSave.title;
            exists.content = noteToSave.content;
            exists.updated = new Date().toISOString();
        } else {
            noteToSave.id = crypto.randomUUID();
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem('notesApp' , JSON.stringify(notes));
    }

    static deleteNote(noteToDeleteID) {       
        const notes = notesAPI.getAllNotes();
        const newnotes = notes.filter(note => note.id !== noteToDeleteID);

        localStorage.setItem('notesApp' , JSON.stringify(newnotes));
    }
}