// import axios from 'axios'
import {useEffect, useState} from 'react'
// import { useParams } from 'react-router-dom';

const UserCart = (props) => {
    // let cnt = 0;
    // console.log(props.paramObj.username);
    // get username from url
    // let paramObj = useParams();//{username: "Vikash"}

    let [products, setProducts] = useState([])

    useEffect(()=>{
       
        fetch(`/user/usercart/${props.paramObj.username}`)
        .then(response => response.json())
        .then(json => {
            const arObj = json.message
            console.log(arObj.length)
            setProducts(arObj)
            // console.log(json)
            // console.log(arObj)
        })
    },[props.paramObj.username])


    // const delPro = (productObj) => {
    //     let username = localStorage.getItem("username")
    //     axios.delete(`/user/usercart/${username}/${productObj.id}`)
    //     .then(res=>{
    //         let responseObj = res.data
    //         alert(responseObj.message)
    //         setProducts(responseObj.products)
    //     })
    //     .catch(err=>{
    //         alert("something went wrong in deleting product from cart")
    //     })
    // }
    
    
    return (
        <div>
        {
        products.length!==0 ?
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Productname</th>
                    <th scope="col">Model</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                </tr>
            </thead>

            <tbody>
            {
            products.map((product)=>{
                return(
                    <tr>
                        <td>{product.productname}</td>
                        <td>{product.model}</td>
                        <td>{product.price}</td>
                        <td><img src={product.Image} width="70" className="" alt=""/></td>
                    </tr>
                )
            })
        }
                
            </tbody>
        </table>
        :
        <h1 className="text-center text-secondary">Empty Cart</h1>
        }
        </div>
    )
}

export default UserCart
