import{ useEffect, useState } from "react";
// const axios = require('axios');

const UsersList = () => {

    let [users, setUsers] = useState([])
    let sno = 0;

    useEffect(()=>{
       
        // fetch('https://jsonplaceholder.typicode.com/users')
        fetch("/user/getusers")
        .then(response => response.json())
        .then(json => {
            const arObj = json.message
            setUsers(arObj)
            // console.log(json)
            console.log(arObj)
        })
    },[])




    return (
        <table className="table table-striped w-50 mx-auto m-5">
            <thead className="table table-success">
                <tr>
                    <th scope="col">Sno.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date of birth</th>
                </tr>
            </thead>
            <tbody className="table table-primary">
                {
                    users.map((user)=>{
                        sno = sno+1
                        return(
                        <tr>
                            <td>{sno}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.dob}</td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default UsersList
