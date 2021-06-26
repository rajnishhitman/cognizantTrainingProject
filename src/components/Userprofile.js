import {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom';

import React from 'react'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import ProductsList from './ProductsList';

import UserCart from './UserCart';
// import axios from 'axios';


const Userprofile = () => {
    let [cnt, setCnt] = useState(0)

    let [user, setUser] = useState('')
    const ref = useRef(null);




    // //function to make post tp usercart api
    // const addProductToCart=(productObj)=>{


    //     //get username from localhost
    //     let username = localStorage.getItem("username")
    //     let proObj={
    //         username: username,
    //         productObj: productObj
    //     }


    //     console.log("product added by user ",proObj)

    //     // make post req
    //     axios.post("/user/addtocart",proObj)
    //     .then(res=>{
    //         let responseObj = res.data
    //         alert(responseObj.message)
    //         setCnt(responseObj.proCnt)
    //     })
    //     .catch(err=>{
    //         alert("something went wrong in adding product to cart")
    //     })

    // }
    const updateCnt = (n) => {
      setCnt(n)
    }


    // let [products, setProducts] = useState([])

    //get username from url
    let paramObj = useParams();//{username: "Vikash"}

    useEffect(() => {
        fetch(`/user/usercart/${paramObj.username}`)
        .then(response => response.json())
        .then(json => {
            const arObj = json.message
            console.log(arObj.length)
            setCnt(arObj.length)
            // setProducts(arObj)
        })

        let userObj = JSON.parse(localStorage.getItem('user'))
        setUser({...userObj})

        setTimeout(() => {
          ref.current.click();
        }, 100);



    },[paramObj.username])




    return (
        <>
        <div>
            <h5 className="text-start">Welcome ,<span className="text-success">{paramObj.username}</span>
                <img className="rounded m-1" src={user.profileImage} width="100px" alt="" />
            </h5>

        </div>

        <BrowserRouter>
      <div>
        <ul className="nav nav-pills nav-fill">
         
          
        
          
          <li className="nav-item">
           <Link to="/products/productlist" ref={ref} className="nav-link">View Products</Link>
          </li>
          <li className="nav-item">
           <Link to="/usercart" className="nav-link">Cart <span className="text-info">{cnt}</span></Link>
          </li>
    
          
          
        </ul>

        <Switch>
          

          {/* <Route path="/products/addproduct">
            <AddProduct/>
          </Route> */}

          <Route path="/products/productlist">
            <ProductsList updateCnt={updateCnt} param="user"/>
          </Route>
          <Route path="/usercart">
            <UserCart paramObj={paramObj}/>
          </Route>
         
        </Switch>
      
      </div>
    </BrowserRouter>
        </>

    )
}

export default Userprofile

