import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// const axios = require('axios');

const Userprofile = () => {
    // const history = useHistory();
    let [user, setUser] = useState(''
        // {
        //     email: "Please wait"
        // }
    )

    //get username from url
    let paramObj = useParams();//{username: "Vikash"}

    useEffect(() => {
        // axios.get(`/user/getuser/${paramObj.username}`)
        // .then(res => {
        //     let userObj = res.data.message;
        //     // setUser({ ...userObj })
        //     setUser(userObj)
        //     // console.log(userObj)
        // })
        //json.parse will convert json into js object
        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})
    },[paramObj.username])

    // const logout = () => {
    //     history.push('/login')
    //     localStorage.removeItem('token')
    // }


    return (
        <div>
            <h5 className="text-start">Welcome ,<span className="text-success">{paramObj.username}</span></h5>
            <div className="text-center">
                <h3>{user.email}</h3>
                <h3>{user.dob}</h3>
                <img src={user.profileImage} width="200px" alt="" />
            </div>
           
        </div>
    )
}

export default Userprofile

