import notesAPI from "./notesAPI.js";
import notesView  from "./notesView.js";


const notesApp = document.querySelector('.notesApp');
const view = new notesView(notesApp, {
    onNoteSelect() {
        console.log("Note selected");
    }
    , onNoteAdd() {
        console.log("Note added");
    }
});

notesAPI.saveNote({ id:"c844cb46-0015-4e34-ba99-2ec69301231c",
    title: "Test Note",
    content: "This is a test note.(edited)"
})


notesAPI.saveNote({ id:"0c5b8915-1b2f-4a43-be1e-617e6e169480",
    title: "Test Note 1",
    content: "This is a test note 1."})

notesAPI.saveNote({id:"eea0d3a5-58ce-4e75-8b2b-71e36026f0ad",
title: "Test Note 2 (edited)", 
content: "This is a test note 2."})

notesAPI.deleteNote("eea0d3a5-58ce-4e75-8b2b-71e36026f0ad");

console.log(notesAPI.getAllNotes()); 