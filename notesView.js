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
        const inpTitle = this.root.querySelector('.noteTitle');
        const inpText = this.root.querySelector('.noteText');
        
        btnAddNote.addEventListener('click' , () => {
            this.onNoteAdd();
        });

        btnDeleteNote.addEventListener('click' , () => {
            this.onNoteDelete();
        });

        [inpTitle , inpText].forEach(inputFeild => () {
            inputFeild.addEventListener('blur',  () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedText = inpText.value.trim();
            })
        })
    }
}