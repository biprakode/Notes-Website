export default class notesView {
    constructor(root , {onNoteSelect , onNoteAdd , onNoteEdit , onNoteDelete} = {} ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

            this.root.innerHTML = `<div class="notesApp">
            <div class="sideBar">
                <div class="buttons">
                    <button class="addNote">Add Note</button>
                    <button class="deleteNote">Delete Note</button>
                </div>

                <div class="noteList"></div>

            </div> 

            <div class="noteEditor">
                <div class="noteView">
                    <input type="text" class="noteTitleInput" placeholder="Enter a Title">
                    <textarea class="noteTextInput" placeholder="Enter your note here..."></textarea>
                </div>
            </div>
        </div>`

        const btnAddNote = this.root.querySelector('.addNote');
        const btnDeleteNote = this.root.querySelector('.deleteNote');
        const inpTitle = this.root.querySelector('.noteTitleInput');
        const inpText = this.root.querySelector('.noteTextInput');
        
        btnAddNote.addEventListener('click' , () => {
            this.onNoteAdd();
        });

        btnDeleteNote.addEventListener('click' , () => {
            this.onNoteDelete();
        });

        [inpTitle , inpText].forEach(inputFeild => {
            inputFeild.addEventListener('blur',  () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedText = inpText.value.trim();
                this.onNoteEdit(updatedTitle , updatedText);
            })
        })

        console.log(this._createListItemHTML("12385" , "Test Title" , "This is a test note." , new Date()));

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id , title , text , updated) {
        const MAX_LENGTH = 60;
        return `<div class='noteListItem' noteID=${id}>
            <div class="noteListTitle">${title}</div>
            <div class="noteListText">${text.length > MAX_LENGTH ? text.substring(0,MAX_LENGTH) + "..." : text}</div>
            <div class="noteFooter">
            <div class="noteListUpdated">${updated.toLocaleString(undefined , {dateStyle: "full" , timeStyle: "short"})}</div>
            <div class="deleteNoteIcon">
                <a href="#" class="deleteNoteLink">
                <img src="images/deleteIcon.png" alt="Delete Note" />
                </a>
            </div>
            </div>
        </div>`;
    }

    updateNoteList(notes) {
        const noteListContainer = this.root.querySelector('.noteList');
        // Empty noteList
        noteListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.content, new Date(note.updated));

            noteListContainer.insertAdjacentHTML('beforeend', html);
        }

        noteListContainer.querySelectorAll('.noteListItem').forEach(noteItem => {
            noteItem.addEventListener('click', () => {
                this.onNoteSelect(noteItem.getAttribute('noteID'));
            });
        });

        noteListContainer.addEventListener('click', (event) => {
            const deleteLink = event.target.closest('.deleteNoteLink');
            if (deleteLink) {
                const deleteConfirm = confirm("Are you sure you want to delete this note?");
                if (deleteConfirm) {
                    const noteListItem = deleteLink.closest('.noteListItem');
                    if (noteListItem) {
                        this.onNoteDelete(noteListItem.getAttribute('noteID'));
                    }
                }
            }
        });
    }

    updateActiveNote(note) {
        this.root.querySelector('.noteTitleInput').value = note.title;
        this.root.querySelector('.noteTextInput').value = note.content;

        this.root.querySelectorAll('.noteListItem').forEach(noteItem => {
            noteItem.classList.remove('active');
            if(noteItem.getAttribute('noteID') === String(note.id)) {
                noteItem.classList.add('active');
            }
        });
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector('.noteEditor').style.display = visible ? 'block' : 'none';
    }
}