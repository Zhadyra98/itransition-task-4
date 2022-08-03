import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { React, useState } from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from "./pages/AdminPanel";
import Header from "./pages/Header";
import { UserProvider } from './pages/UserContext';
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
    let [ userName, setUserName ] = useState(localStorage.getItem('name'))
    let props = { 
        userName: userName,
        setUserName: setUserName,
    }
    return (
        <UserProvider>      
            <Router>
            <Header {...props} />  
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<AdminPanel {...props}/>} path="/" exact/>
                    </Route>
                    <Route path="/login" element={<Login setUserName = {setUserName} />} />
                    <Route path="/register" element={<Register setUserName = {setUserName} />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App