import notesAPI from "./notesAPI.js";

notesAPI.saveNote({ id:1745698318599,
    title: "Test Note",
    content: "This is a test note.",
})

notesAPI.saveNote({ id:1745698318600,
    title: "Test Note 1",
    content: "This is a test note 1."})

notesAPI.saveNote({id:1745698318600,
title: "Test Note 2 (edited)", 
content: "This is a test note 2."})

notesAPI.deleteNote(1745698318599);

console.log(notesAPI.getAllNotes()); 