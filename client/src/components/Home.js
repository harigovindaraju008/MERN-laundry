import React, { Component } from 'react'
import Header from './Header';
import Carousel from './carousel';
import Service  from './Service'
import Timeline from './Timeline';
import Footer from './Footer';
import Pricing from './Pricing';

export default class Home extends Component {
    render() {
        return (
            <div className="App container-r"> 
            <Header btn_name="Bookings" path="/Login" />    
            <Carousel/>
            <Service/> 
            <Timeline/>
            <Pricing/> 
            <Footer/>
            </div>
            
        )
    }
}
