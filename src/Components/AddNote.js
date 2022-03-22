import React, { useContext, useState } from 'react'
import noteContext from '../Context/notes/Notecontext';

const AddNote = () => {

    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({ tittle: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.tittle, note.description, note.tag);
        setNote({ tittle: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h3>Add a Note</h3>

            <form className='container my-3'>
                <div className="mb-3">
                    <label htmlFor="tittle" className="form-label">Tiitle</label>
                    <input type="text" className="form-control" id="tittle" name='tittle' value={note.tittle}  onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}  />
                </div>
                <button disabled={note.tittle.length < 5 || note.description.length < 5} type="submit" className="btn btn-sm btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote