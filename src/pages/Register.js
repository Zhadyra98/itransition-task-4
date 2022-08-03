import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "./UserContext";


function Register( { setUserName } ) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setError] = useState('')
  // eslint-disable-next-line
  const [userTable, setUserTable] = useContext(UserContext)
  const [passwordConfirm, setPasswordConfirm] =useState('')
  const navigate = useNavigate();

  async function registerUser(event) {
    event.preventDefault();
    if(name && email && password && passwordConfirm){
      if(password === passwordConfirm){
        const response = await fetch('https://user-table-app.herokuapp.com/api/register', {
          method: 'POST', 
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })
        const data = await response.json()
        if(data.status === 'ok') {
          localStorage.setItem('token', data.token)
          localStorage.setItem('name', data.name)
          setUserName(data.name)
          setUserTable(data.table)
          navigate("/");
        } 
        else setError(data.error)
      }
      else setError('The passwords do not match')
    }
    else setError('Please fill out all fields and try again')
  }
  return (
    <div className='container'>
      <div className="row justify-content-center align-items-center">
        <div className="col-9 col-xs-8 col-sm-7 col-md-6 col-lg-4 text-center">
        <h1 className='h2 mb-3 font-weight-normal'>Register</h1>
        <form onSubmit={registerUser} onChange = {() => setError('')}>
          <input 
            className="form-control mb-2"
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            autoFocus
          />
          <input 
            className='form-control mb-2'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoFocus
          />
          <input 
            className='form-control mb-2'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoFocus
          />
          <input 
            className='form-control'
            placeholder='Confirm Password'
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
            autoFocus
          />
          <p className='error h6 text-danger mt-2'>{errorText}</p>
          <div className="my-3">
            <input className='btn btn-success btn-lg w-100' type="submit" value="Sign Up"/>
          </div>
          <a href="/login" className="link-success">Login</a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
