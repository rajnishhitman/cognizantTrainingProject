import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
// import UserCart from "./UserCart";


const Login = (props) => {

    const {register, handleSubmit} = useForm();
    const history = useHistory();

    const onFormSubmit = (credentials) =>{
        // let path;

        // if(credentials.type === "user"){
        //     path="user"
        // }
        // else{
        //     path="admin"
        // }


        axios.post(`/${credentials.type}/login`, credentials)
            .then(res => {
                let resObj = res.data;
                if(resObj.message === 'login-success'){
                    //save token in local storage
                    localStorage.setItem("token", resObj.token)
                    localStorage.setItem("username", resObj.username)

                    //json.stringify will convert js object into json
                    localStorage.setItem("user", JSON.stringify(resObj.userObj))

                    props.setUserLoginStatus(true)

                    if(credentials.type === "user") {
                        //navigate to user profile
                        history.push(`/userprofile/${resObj.username}`)
                        // history.push("/usercart", {paramObj: {username: resObj.username}})
                    }

                    if(credentials.type === "admin"){
                        //navigate to user profile
                        history.push(`/adminprofile/${resObj.username}`)
                    }

                }
                else{
                    alert(resObj.message)
                }
            })
            .catch(err => {
                console.log(err)
                alert("something went wrong in login")
            })
    }



    return (
        <form className="w-50 mx-auto m-5" onSubmit={handleSubmit(onFormSubmit)}>

            <input className="form-control mb-3" type="text" placeholder="Username" name="username"  {...register("username")} autoComplete="off"/>

            <input className="form-control mb-3" type="password" placeholder="Password" name="password" {...register("password")} autoComplete="off"/>


            <div class="form-check">
                <input class="form-check-input" type="radio" id="admin" {...register("type")} value="admin" />
                <label class="form-check-label" for="admin">
                    Admin
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" id="user" {...register("type")} value="user" />
                <label class="form-check-label" for="user">
                    User
                </label>
            </div>


            <button className="btn btn-success" type="submit">Login</button>

        </form>
    )
}

export default Login;
