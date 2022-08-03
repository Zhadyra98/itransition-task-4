import React from "react";


const UserItem = ({ id, name, email, lastLoginTime, registrationTime, isBlocked, isChecked, onToggleCheck }) => {
    
    const formatDate = (date) => (new Date(date).toUTCString()).substr(5,20);

    return(
        <>
        <tr onClick={ onToggleCheck }>
            <td>
                <input className="form-check-input-lg" type="checkbox" checked={isChecked} id="checkboxNoLabel"aria-label="..." readOnly />
            </td>
            <td className="idText d-none d-md-table-cell">{id.substr(0,7)+"..."}
                <span className="idTextHide bg-success">{id}</span>
            </td>
            <td className="d-none d-sm-table-cell">{name}</td>
            <td>{email}</td>
            <td className="d-none d-md-table-cell" >{formatDate(lastLoginTime)}</td>
            <td className="d-none d-md-table-cell" >{formatDate(registrationTime)}</td>
            {isBlocked ? <td className="bg-danger text-white">BLOCKED</td> : <td className="bg-success text-white">ACTIVE</td>}
            
        </tr>
        </>
        
    )
}

export default UserItem