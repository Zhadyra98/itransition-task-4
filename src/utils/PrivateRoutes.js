import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    let authorized = (localStorage.getItem('token')) ? true : false

    return(
        authorized ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes