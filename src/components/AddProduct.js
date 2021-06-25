import {useState} from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

const axios = require('axios');


const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState('')
    const history = useHistory();

    const onFormSubmit = async(productObj) => {

        //create FormData obj
        let formData = new FormData();
        //add file(s) to formdata obj
        formData.append('photo', file, file.name)
        //add userObj to formData object
        formData.append("productObj",JSON.stringify(productObj))



        //post req
        axios.post("/product/createproduct", formData)
        .then(res => {
            let resObj = res.data;
            alert(resObj.message)
            //navigate to productslist component
            history.push('/products/productlist')
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

            <input className="form-control mb-3" type="text" placeholder="ProductName" name="name" autoComplete="off" {...register('productname')}/>

            <input className="form-control mb-3" type="text" placeholder="ProductModel" name="model" autoComplete="off" {...register('model')}/>

            <input className="form-control mb-3" type="text" placeholder="ProductPrice" name="price" autoComplete="off" {...register('price')}/>

            <input className="form-control mb-3" type="text" placeholder="Description" name="description" autoComplete="off" {...register('description')}/>
            

            <input type="file" name="photo" className="form-control mb-3" onChange={(e) => {onFileSelect(e) }} />

            <input className="btn btn-success" type="submit" />

            

        </form>
    );
};

export default AddProduct
