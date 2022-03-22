import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const host = `http://localhost:5000`

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword:"" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {name, email, password} = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();

    if (json.Success) {
      // redirect
      localStorage.setItem("token", json.authToken)
      navigate("/");
    } else {
      alert("Invalid");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  return (
    <div className='container my-3 '>
      <h3 className='text-center'>SignUp</h3>
      <hr />
      <form className="row g-3 position-center" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Username</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} />
        </div>
        <div className="">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email"  name='email' onChange={onChange}  required/>
        </div>
        <div className="">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' autoComplete='off' onChange={onChange} minLength={5} required/>
        </div>
        <div className="">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' autoComplete='off' onChange={onChange} minLength={5} required/>
        </div>
        <div className="col-12">
          <button disabled={credentials.email.length === 0 || credentials.password.length < 5 || credentials.cpassword.length < 5} type="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    </div>
  )
}

export default Signup