// import React from 'react'

// const AdminProfile = () => {
//     return (
//         <div>
//             <h1>Hello i am admin</h1>
//         </div>
//     )
// }

// export default AdminProfile




import React from 'react'
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import ProductsList from './ProductsList';
import AddProduct from './AddProduct';

const AdminProfile = () => {
    return (
        <BrowserRouter>
      <div>
        <ul className="nav nav-pills nav-fill">
         
          
        
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

export default AdminProfile;
