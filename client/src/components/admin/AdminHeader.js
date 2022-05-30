import React, { Component } from "react";
import { Link , withRouter } from "react-router-dom";

 class AdminHeader extends Component {
  constructor()
  {
    super();
    this.state ={
      active:"Dashboard"
    }

  }
  render() {

   const logout = () =>
    {
      localStorage.removeItem('admin_token');
      this.props.history.push('/login');

    }
    return (
      <>
      <div className="top-nav-wrapper">
        <div className="top-nav">
          <div className="hamburger-menu">
            <div className="hamburger-icon">
              <div className="bar-one"></div>
              <div className="bar-two"></div>
              <div className="bar-three"></div>
            </div>
          </div>
          <div className="logo">CLEAN THUNI</div>
          <div className="nav-slider"></div>
          <div className="dashboard">
             <Link to="/admin/">
              <button className={this.state.active === 'Dashboard' ? 'active dashboard-btn nav-btn' :'dashboard-btn nav-btn'}  onClick={(e) =>  this.setState({active:e.target.innerText})}>Dashboard</button>
              </Link>
          </div>
          <div className="hosting">
            <Link to="/admin/Booking">
          
              <button className={this.state.active === 'Bookings' ? 'active hosting-btn nav-btn' :'hosting-btn nav-btn'}  onClick={(e) =>  this.setState({active:e.target.innerText})}>Search</button>
            </Link>
          </div>
          <div className="marketplace">
            <Link to="/admin/service">
           
              <button className={this.state.active === 'Services' ? 'active marketplace-btn nav-btn' :'marketplace-btn nav-btn'}  onClick={(e) =>  this.setState({active:e.target.innerText})}>Services</button>
            </Link>
          </div>
          <div className="domains">
            <Link to="/admin/serviceUnits">
             
              <button className={this.state.active === 'Service Units' ? 'active domain-btn nav-btn' :'domain-btn nav-btn'}  onClick={(e) =>  this.setState({active:e.target.innerText})}>Service Units</button>
            </Link>
          </div>
          <div className="nav-slider"></div>
          <div className="search">
            <button className="material-icons not-active-icon search-btn bg-dark" onClick={()=> logout()}>
              logout 
            </button>
          </div>  
        </div>
      </div>
    {/* <div className="mobile-nav">
    <div className="mobile-dashboard-link">Dashboard</div>
    <div className="mobile-dashboard-link">Bookings</div>
    <div className="mobile-dashboard-link">Services</div>
    <div className="mobile-dashboard-link">ervice Units</div>
    </div> */}
    </>
    );
  }
}


export default  withRouter(AdminHeader);