import React, { Component } from 'react';
import {Route , BrowserRouter as Router , Switch} from "react-router-dom"; 
import Booking from './Booking';
import Home from './Home';
import Login from './Login';
import Error from './Error404';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Privaterouter from './Privaterouter';
import AdminRoute from './AdminRoute';
import Myaccount from './Myaccount';
import Admin from './admin/Admin';
import ForgotPassword from './ForgotPassword';



class App extends Component 
{
  constructor()
  {
    super();
    this.state = { 
      val:"LOGIN"
      
    }
   
}

  render()
  {
  return ( 
    <Router>
    <Switch>
    <Route path="/"  component={Home} exact/>
    <AdminRoute path="/admin" component={Admin} />
    <Privaterouter  path="/MyAccount"  component={Myaccount} /> 
    <Route path="/Login"  component={Login} exact/>
    <Route path="/error"  component={Error} exact/>
    <Route path="/Forgotpassword/:token"  component={ForgotPassword} exact/>
    <Privaterouter  path="/booking" component={Booking}/>
    </Switch>
    <ToastContainer />
    </Router>  
);
}
}

export default App;

