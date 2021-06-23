import React from 'react'
import axios from 'axios'

const Test = () => {
    let token = localStorage.getItem("token")

    //create a new axios req obj
    let apiUrl = 'http://localhost:8080'

    const axiosReq = axios.create({
        baseURL: apiUrl,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    const makeReqToProtected = () => {
        axiosReq.get("/user/testing")
        .then(res => {
            alert(res.data.message)
        })
    }

    return (
        <div>
            <h1>Testing</h1>
            <button onClick={()=> makeReqToProtected()}>Make req</button>
        </div>
    )
}

export default Test
