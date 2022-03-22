import React from 'react'
import { Link, NavLink } from 'react-router-dom' // used navlink bcuse whenever clicked on home or about it wil glow

const Navabar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">iNoteBook</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/notes">Notes</NavLink>
                        </li>
                    </ul>
                </div>
                {(localStorage.getItem('Success'))?<form className="d-flex">
                    <Link className="btn btn-sm btn-primary mx-1" to={"/login"} type="submit">Login</Link>
                    <Link className="btn btn-sm btn-primary mx-1" to={"/signup"} type="submit">Signup</Link>
                </form>:<Link className="btn btn-sm btn-primary mx-1" to={"/login"} type="submit">Logout</Link>}
            </div>
        </nav>
    )
}

export default Navabar