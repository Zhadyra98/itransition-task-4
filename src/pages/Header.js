import React from "react";
import { ReactComponent as Logo } from "../img/logo.svg"
import { useNavigate } from 'react-router-dom'


function Header({...props}) {
  
  let navigate = useNavigate(); 

  function logoutButtonHandle () {
    props.setUserName('')
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate("/login")
  }
  const  loginButtonHandle = () => {
    navigate("/login")
  }
  const  registerButtonHandle = () => {
    navigate("/register")
  }

  return (
    <header className="bg-success mb-5">
        <div className="container-lg d-flex align-items-center p-2">
          <div className="fs-2 flex-grow-1 d-flex gap-3 align-items-center">
            <Logo/>
            <h5 className="h5 text-white d-none d-sm-inline-block">User Management</h5>
          </div>
          <div className="gap-2 d-flex align-items-center">
            {props.userName ?
            (<>
            <h5 className="h4 mx-3 text-white">Hi, {props.userName}</h5>
            <button type="button" className="btn btn-outline-light rounded-pill px-4" onClick={logoutButtonHandle}>Logout</button>
            </>
            ):(
              <>
              <button type="button" className="btn btn-outline-light rounded-pill px-4" onClick={loginButtonHandle}>Login</button>
              <button type="button" className="btn text-success btn-light rounded-pill px-4" onClick={registerButtonHandle}>Register</button>
              </>
            )}
          </div>
        </div>
    </header>
  );
}
export default Header;