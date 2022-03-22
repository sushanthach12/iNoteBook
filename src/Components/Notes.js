import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../Context/notes/Notecontext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { Modal, Button } from "react-bootstrap";

const Notes = () => {

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;

    const refClose = useRef(null)

    const [show, setShow] = useState(false);

    // For modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ id: "", etittle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        setNote({ id: currentNote._id, etittle: currentNote.tittle, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = () => {
        editNote(note.id, note.etittle, note.edescription, note.etag)
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <>
            <AddNote />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='container'>
                        <div className="mb-3">
                            <label htmlFor="etittle" className="form-label">Tiitle</label>
                            <input type="text" className="form-control" id="etittle" name='etittle' value={note.etittle} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button ref={refClose} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={note.etittle.length <5 || note.edescription.length <5} variant="primary" onClick={handleClick}>
                        Update Note
                    </Button>
                </Modal.Footer>
            </Modal>

            <hr />

            <div className="row my-3">
                <h3>Yours Note</h3>
                {notes.length === 0 && <div className="container mx-1"><em>No Notes to display </em></div> }
                {notes.map((note) => {
                    return <NoteItem note={note} handleShow={handleShow} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes