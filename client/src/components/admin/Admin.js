import React, { Component } from 'react'
import AdminHeader from './AdminHeader'
import {Route , Switch } from "react-router-dom"; 
import Dashboard from './Dashboard';
import Services from './Services';
import AdminBooking from './AdminBooking';
import ServiceUnits from './ServiceUnits';
export default class admin extends Component {
    render() {
        return (
            <div className="admin">
            <AdminHeader/>
            <div className="main">
            <Switch>
            <Route path="/admin/"  exact component={Dashboard} />
            <Route path="/admin/service"  exact component={Services} />
            <Route path="/admin/serviceUnits" exact component={ServiceUnits} />
            <Route path="/admin/Booking" exact component={AdminBooking}/>
            </Switch>
             </div>

            </div>
        )
    }
}
