import React, { useContext, useEffect, useState } from "react";
import UserItem from './UserItem'
import Toolbar from "./Toolbar";
import { UserContext } from "./UserContext";

function AdminPanel ({...props}) {
    const [userTable, setUserTable] = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(true);

    const toggleSelectAll = (event) => {
        setUserTable(prev => prev.map(item => {
            return {...item, isChecked: event.target.checked}
        }))
    }
    useEffect(() => {
        const url = 'https://user-table-app.herokuapp.com/api/admin';
        const fetchData = async() => {
            const req = await fetch(url,{
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            const data = await req.json()
            if(data.status === 'ok'){ 
                setUserTable(data.table.map(item => ({...item, "isChecked": false})))
                setIsLoading(false)
            }
        };
        fetchData();
    }, [] ); 

    const onToggleCheck = (id) => {
        setUserTable(prev => prev.map(item => {
            if(item._id===id){
            return {...item, isChecked: !item.isChecked}
            }
            return item
        }))
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Toolbar {...props } />
            <div className="container-fluid"> 
                <table className="table table-bordered">
                    <tbody>
                        <tr className="table-success">
                            <th><input className="form-check-input" type="checkbox" id="checkboxNoLabel2" value="" onChange={(e) => toggleSelectAll(e)} aria-label="..."/></th>
                            <th className="d-none d-md-table-cell">ID</th>
                            <th className="d-none d-sm-table-cell">Name</th>
                            <th>Email</th>
                            <th className="d-none d-md-table-cell">Last Login Time</th>
                            <th className="d-none d-md-table-cell">Registration Time</th>  
                            <th>Status</th>                 
                        </tr>
                        {
                            userTable.map((item) => (
                                <UserItem 
                                key = {item._id}
                                id={item._id} 
                                name={item.name} 
                                email={item.email} 
                                lastLoginTime={item.lastLoginTime} 
                                registrationTime={item.registrationTime} 
                                isBlocked={item.isBlocked}
                                isChecked={item.isChecked}
                                onToggleCheck={() => onToggleCheck(item._id)}
                                />
                            ))
                        } 
                    </tbody>
                </table>     
            </div>
        </>
    )
}

export default AdminPanel