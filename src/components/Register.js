import {useState} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const axios = require('axios');


const Register = () => {


    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState('')
    const history = useHistory();

    const onFormSubmit = (userObj) => {
        // fetch("/user/createuser",{
        //     method:"POST",
        //     headers:{
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(userObj)
        // }
        // ).then(res=>{
        //     return res.json()
        // }).then(
        //     data => alert(data.message)
        // )


        //create FormData obj
        let formData = new FormData();
        //add file(s) to formdata obj
        formData.append('photo', file, file.name)
        //add userObj to formData object
        //Convert a JavaScript object into a string with JSON.stringify()
        formData.append("userObj",JSON.stringify(userObj))



        //post req
        axios.post("/user/createuser", formData)
        .then(res => {
            let resObj = res.data;
            alert(resObj.message)
            //navigate to login component
            history.push('/login')
            console.log(formData.getAll("userObj"))
            console.log(formData.getAll("photo"))
        })
        //     data => alert(data.message)
        // )
        .catch(err=>{
            console.log(err);
            alert("something went wrong")
        })

    }

    //to get selected
    const onFileSelect=(e)=>{
        setFile(e.target.files[0])
    }







    return (
        <form className="w-50 mx-auto m-5" onSubmit={handleSubmit(onFormSubmit)}>

            <input className="form-control mb-3" type="text" placeholder="Username" name="username" autoComplete="off" {...register('username')}/>

            <input className="form-control mb-3" type="password" placeholder="Password" name="password" autoComplete="off" {...register('password')}/>

            <input className="form-control mb-3" type="email" placeholder="Email" name="email" autoComplete="off" {...register('email')}/>

            <input className="form-control mb-3" type="date" placeholder="Date of birth" name="date of birth" autoComplete="off" {...register('dob')}/>

            <input type="file" name="photo" className="form-control mb-3" onChange={(e) => {onFileSelect(e)}} />

            <input className="btn btn-success" type="submit" />

            

        </form>
    );
};

export default Register
