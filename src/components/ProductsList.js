import{ useEffect, useState } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ProductsList = (props) => {
    const history = useHistory();

    const addProductToCart=async(productObj)=>{


        //get username from localhost
        let username = localStorage.getItem("username")
        let proObj={
            username: username,
            productObj: productObj
        }


        console.log("product added by user ",proObj)

        // make post req
        await axios.post("/user/addtocart",proObj)
        .then(res=>{
            let responseObj = res.data
            alert(responseObj.message)
            props.updateCnt(responseObj.proCnt)
        })
        .catch(err=>{
            alert("something went wrong in adding product to cart")
        })
        history.push("/usercart", {paramObj: {username: username}})
    }

    let [products, setProducts] = useState([])

    useEffect(()=>{
       
        fetch("/product/getproducts")
        .then(response => response.json())
        .then(json => {
            const arObj = json.message
            setProducts(arObj)
            console.log(arObj)
        })
    },[])


    return (
        <div>
        {
        props.param==="user"?
        <div className="container row d-flex justify-content-center ms-5">
        {
            products.map((product)=>{

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
                                <button className="btn btn-primary float-end" onClick={()=>{
                                    addProductToCart(product)
                                }
                                    }>Add to cart</button>
                            </div>
                        </div>

                )
            })
        }
        </div>:
        <div className="container row d-flex justify-content-center ms-5">
        {
            products.map((product)=>{

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
        </div>
        }
        </div>
    )
}

export default ProductsList
