import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navabar from './Components/Navabar'
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AlertState from './Context/alert/AlertState';

export default function App() {
  return (
    <>
      <NoteState>
        <AlertState>
        <Router>
          <Navabar />
          <Alert message={"This is amazing"}/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/about' element={<About />}></Route>
              <Route exact path='/login' element={<Login />}></Route>
              <Route exact path='/signup' element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
        </AlertState>
      </NoteState>
    </>
  )
}
