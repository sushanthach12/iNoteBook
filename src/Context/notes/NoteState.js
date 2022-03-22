import { useState } from "react";
import NoteContext from "./Notecontext";

const NoteState = (props) => {

    const host = `http://localhost:5000`

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // Get  all note
    const getNotes = async () => {
        // TODO Fetch call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQ1MDJmNzRiNzBkMTExZTI4ZWE3In0sImlhdCI6MTY0NzA2ODQxOH0.gj2Q4xOyDRbMrTfUuqgcFz42GGe9uZieQriCAVHEr8c'
            }
        });

        const json = await response.json();
        setNotes(json)
    }

    // Add a note
    const addNote = async (tittle, description, tag) => {
        // TODO Fetch call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQ1MDJmNzRiNzBkMTExZTI4ZWE3In0sImlhdCI6MTY0NzA2ODQxOH0.gj2Q4xOyDRbMrTfUuqgcFz42GGe9uZieQriCAVHEr8c`
            },
            body: JSON.stringify({ tittle, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQ1MDJmNzRiNzBkMTExZTI4ZWE3In0sImlhdCI6MTY0NzA2ODQxOH0.gj2Q4xOyDRbMrTfUuqgcFz42GGe9uZieQriCAVHEr8c'
            },
        });

        const json = await response.json();

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)

    }

    // Edit a note
    const editNote = async (id, tittle, description, tag) => {

        // Api CAll
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyYzQ1MDJmNzRiNzBkMTExZTI4ZWE3In0sImlhdCI6MTY0NzA2ODQxOH0.gj2Q4xOyDRbMrTfUuqgcFz42GGe9uZieQriCAVHEr8c'

            },
            body: JSON.stringify({ tittle, description, tag })
        });
        // const json = await response.json();
        const newNotes = JSON.parse(JSON.stringify(notes))

        //Logic to edit in client

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].tittle = tittle;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        // console.log(newNotes);
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;