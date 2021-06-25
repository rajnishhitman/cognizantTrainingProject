// import './App.css';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Userprofile from './components/Userprofile';
import UsersList from './components/UsersList';
import Test from './components/Test';
// import Products from './components/Products';
import AdminProfile from './components/AdminProfile';
import {useState} from 'react'

function App() {

  let [userLoginStatus, setUserLoginStatus] = useState(false)

  const logOutUser=()=>{
    localStorage.clear()
    setUserLoginStatus(false)
  }

  return (
    
    <BrowserRouter>
      <div>
        <ul className="nav nav-dark bg-dark">
          <li className="nav-item">
            <Link to="/home" className="nav-link">Home</Link>
          </li>
          
          {
            !userLoginStatus ? 
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>:
            <li className="nav-item">
              <Link onClick={()=>logOutUser()} to="/logout" className="nav-link">Logout</Link>
            </li>
          }
          

          {
            !userLoginStatus &&
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          }
          {/* <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li> */}
          <li className="nav-item">
            <Link to="/allusers" className="nav-link">AllUsersList</Link>
          </li>
          <li className="nav-item">
            <Link to="/test" className="nav-link">Test</Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/products" className="nav-link">Products</Link>
          </li> */}

          {/* <li className="nav-item">
            <Link to="/userprofile" className="nav-link">Userprofile</Link>
          </li> */}
          
          
        </ul>

        <Switch>
          <Route path="/home">
            <Home/>
          </Route>
          
          <Route path="/login">
            <Login setUserLoginStatus={setUserLoginStatus}/>
          </Route>

          <Route path="/register">
            <Register/>
          </Route>

          <Route path="/test">
            <Test/>
          </Route>
          
          <Route path="/userprofile/:username">
            <Userprofile/>
          </Route>

          <Route path="/adminprofile/:username">
            <AdminProfile/>
          </Route>

          <Route path="/allusers">
            <UsersList/>
          </Route>

          {/* <Route path="/products">
            <Products/>
          </Route> */}
         
        </Switch>
      
      </div>
    </BrowserRouter>

  );
}

export default App;
