import{ useEffect, useState } from "react";

const ProductsList = (props) => {


    let [products, setProducts] = useState([])

    useEffect(()=>{
       
        fetch("/product/getproducts")
        .then(response => response.json())
        .then(json => {
            const arObj = json.message
            setProducts(arObj)
            // console.log(json)
            console.log(arObj)
        })
    },[])


    return (
        <div className="container row d-flex justify-content-center ms-5">
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
                                <button className="btn btn-primary float-end" onClick={()=>props.addProductToCart(product)}>Add to cart</button>
                            </div>
                        </div>

                )
            })
        }
        </div>
    )
}

export default ProductsList
