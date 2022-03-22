import React, { useContext } from 'react'
import noteContext from '../Context/notes/Notecontext';
import '../index.css'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;

    const { note, updateNote, handleShow } = props;

    return (
        <div className='col-md-3'>
            <div className="card my-3" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        {/* <h5 className="card-tag"><span className="badge rounded-pill bg-info text-dark">{note.tag}</span></h5> */}
                        <h5 className="card-title">{note.tittle}</h5>
                        <i className="fa-solid fa-trash mx-2 " id='deletei' onClick={() => deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" id='editi' onClick={() => { handleShow(); updateNote(note) }}></i>
                    </div>

                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default NoteItem