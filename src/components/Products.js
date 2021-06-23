import React from 'react'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import ProductsList from './ProductsList';
import AddProduct from './AddProduct';

const Products = () => {
    return (
        <BrowserRouter>
      <div>
        <ul className="nav nav-light bg-dark">
         
          
        
          <li className="nav-item">
           <Link to="/products/addproduct" className="nav-link">AddProduct</Link>
          </li>
          <li className="nav-item">
           <Link to="/products/productlist" className="nav-link">View Products</Link>
          </li>
    
          
          
        </ul>

        <Switch>
          

          <Route path="/products/addproduct">
            <AddProduct/>
          </Route>

          <Route path="/products/productlist">
            <ProductsList/>
          </Route>
         
        </Switch>
      
      </div>
    </BrowserRouter>
    )
}

export default Products
