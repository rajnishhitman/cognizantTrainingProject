import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

import React from 'react'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import ProductsList from './ProductsList';
// import AddProduct from './AddProduct';
import UserCart from './UserCart';
import axios from 'axios';
// import { response } from 'express';
// import { useHistory } from 'react-router-dom';
// const axios = require('axios');

const Userprofile = () => {
    // const history = useHistory();
    let [user, setUser] = useState(''
        // {
        //     email: "Please wait"
        // }
    )
    let [usercart, setUserCart] = useState('')

    let [products, setProducts] = useState('')


    //function to make post tp usercart api
    const addProductToCart=(productObj)=>{
        //get username from localhost
        let username = localStorage.getItem("username")

        //add username to product object
        productObj.username=username;

        console.log("product added by user ",productObj)
        // make post req
        axios.post("/user/addtocart",productObj)
        .then(res=>{
            let responseObj = res.data
            alert(responseObj.message)
        })
        .catch(err=>{
            alert("something went wrong in adding product to cart")
        })
    }


    // let [products, setProducts] = useState([])

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


        // fetch("/product/getproducts")
        // .then(response => response.json())
        // .then(json => {
        //     const arObj = json.message
        //     setProducts(arObj)
        //     // console.log(json)
        //     console.log(arObj)
        // })


    },[paramObj.username])

    // const logout = () => {
    //     history.push('/login')
    //     localStorage.removeItem('token')
    // }


    return (
        <>
        <div>
            <h5 className="text-start">Welcome ,<span className="text-success">{paramObj.username}</span></h5>
            <div className="text-center">
                <h3>{user.email}</h3>
                <h3>{user.dob}</h3>
                <img src={user.profileImage} width="100px" alt="" />
            </div>
           
        </div>

        <BrowserRouter>
      <div>
        <ul className="nav nav-pills nav-fill">
         
          
        
          
          <li className="nav-item">
           <Link to="/products/productlist" className="nav-link">View Products</Link>
          </li>
          <li className="nav-item">
           <Link to="/usercart" className="nav-link">Cart</Link>
          </li>
    
          
          
        </ul>

        <Switch>
          

          {/* <Route path="/products/addproduct">
            <AddProduct/>
          </Route> */}

          <Route path="/products/productlist">
            <ProductsList addProductToCart={addProductToCart}/>
          </Route>
          <Route path="/usercart">
            <UserCart/>
          </Route>
         
        </Switch>
      
      </div>
    </BrowserRouter>


        {/* <ProductsList/> */}


        {/* <div className="container row d-flex justify-content-center ms-5">
        {
            products.map((product)=>{
                // return(
                //     <div>
                //         <h6>{product.name}</h6>
                //         <h6>{product.price}</h6>
                //         <img src={product.Image} width="200px" alt="" />
                //     </div>
                // )

                return(

                        <div className="card m-5 col-4 shadow" style={{width: "20rem"}}>
                            <div class="card-header">
                                <img src={product.Image} width="100" className="card-img-top" alt=""/>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">{product.productname}</h4>
                                <h6 className="card-title">{product.model}</h6>
                                <p className="card-text">Price - {product.price}</p>
                                <p className="card-text">Description - {product.description}</p>
                            </div>
                        </div>

                )
            })
        }
        </div> */}
        </>

    )
}

export default Userprofile

