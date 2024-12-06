let noteCounter = 0;

function createNotepad() {
    noteCounter++;
    const notepadDiv = document.createElement('div');
    notepadDiv.setAttribute('id', `notepadDiv${noteCounter}`);
    notepadDiv.classList.add('notepad-item');
    
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', `notepad${noteCounter}`);
    textarea.classList.add('notepad');
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.setAttribute('id', `saveBtn${noteCounter}`);
    saveBtn.onclick = () => saveContent(noteCounter);
    saveBtn.style.backgroundColor = '#4CAF50'; // Green color

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('id', `deleteBtn${noteCounter}`);
    deleteBtn.onclick = () => deleteContent(noteCounter);
    deleteBtn.style.backgroundColor = '#f44336'; // Red color
    deleteBtn.style.display = 'none';

    const noteActionsDiv = document.createElement('div');
    noteActionsDiv.classList.add('note-actions');

    noteActionsDiv.appendChild(saveBtn);
    noteActionsDiv.appendChild(deleteBtn);

    notepadDiv.appendChild(textarea);
    notepadDiv.appendChild(noteActionsDiv);

    document.getElementById('notepads').appendChild(notepadDiv);
}

function saveContent(noteId) {
    const content = document.getElementById(`notepad${noteId}`).value;
    localStorage.setItem(`notepadContent${noteId}`, content);
    
    // Remove notepad from 'Cherry Notepad' section
    document.getElementById(`notepadDiv${noteId}`).remove();
    
    // Add notepad to 'Saved Notepads' section
    const savedNotepadsDiv = document.getElementById('savedNotepads');
    const notepadDiv = document.createElement('div');
    notepadDiv.classList.add('saved-notepad');
    notepadDiv.setAttribute('id', `notepadSavedDiv${noteId}`);
    
    const noteText = document.createElement('p');
    noteText.textContent = content;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteSavedNotepad(noteId);
    
    notepadDiv.appendChild(noteText);
    notepadDiv.appendChild(deleteBtn);
    
    savedNotepadsDiv.appendChild(notepadDiv);
}

function deleteContent(noteId) {
    localStorage.removeItem(`notepadContent${noteId}`);
    document.getElementById(`notepadDiv${noteId}`).remove();
}

function deleteSavedNotepad(noteId) {
    localStorage.removeItem(`notepadContent${noteId}`);
    document.getElementById(`notepadSavedDiv${noteId}`).remove();
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Load existing notepads from localStorage
    for (let i = 1; i <= noteCounter; i++) {
        const content = localStorage.getItem(`notepadContent${i}`);
        if (content) {
            const notepadDiv = document.createElement('div');
            notepadDiv.setAttribute('id', `notepadDiv${i}`);
            notepadDiv.classList.add('notepad-item');
            
            const textarea = document.createElement('textarea');
            textarea.setAttribute('id', `notepad${i}`);
            textarea.classList.add('notepad');
            textarea.value = content;
            
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.setAttribute('id', `saveBtn${i}`);
            saveBtn.onclick = () => saveContent(i);
            saveBtn.style.backgroundColor = '#4CAF50'; // Green color
    
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('id', `deleteBtn${i}`);
            deleteBtn.onclick = () => deleteContent(i);
            deleteBtn.style.backgroundColor = '#f44336'; // Red color
            deleteBtn.style.display = 'none';
            
            const noteActionsDiv = document.createElement('div');
            noteActionsDiv.classList.add('note-actions');
    
            noteActionsDiv.appendChild(saveBtn);
            noteActionsDiv.appendChild(deleteBtn);
    
            notepadDiv.appendChild(textarea);
            notepadDiv.appendChild(noteActionsDiv);
    
            document.getElementById('notepads').appendChild(notepadDiv);
        }
    }
});
