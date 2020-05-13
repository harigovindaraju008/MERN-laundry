import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
                    <footer>
                    <section id="footer">
                    
                    <div className="footer">

                    <div className="column-1">
                    <h1 className="footer-heading"> Clean Thuni </h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut.</p>
                    <div>
                    <img  height="40px" width="40px" src={"https://laundry.axiomthemes.com/wp-content/uploads/2016/12/footer_img1.png"} alt="error"/>
                    <img  height="40px" width="40px" src={"https://laundry.axiomthemes.com/wp-content/uploads/2016/12/footer_img2.png"} alt="error"/>
                    <img  height="40px" width="40px" src={"https://laundry.axiomthemes.com/wp-content/uploads/2016/12/footer_img3.png"} alt="error"/>
                    </div>
                    </div>

                    <div className="column-2">
                    <h1 className="footer-heading">SERVICE</h1>
                    <ul className="">
                    <li>Drop off Laundry</li>
                    <li>Free Pick-Up and Delivery</li>
                    <li>Eco-Friendly Products</li>
                    <li>Fast  High Quality</li>
                    </ul>
                    </div>

                    <div className="column-3">
                    <h1 className="footer-heading">CONTACT US</h1>
                    <p> n0 5 raja colony,<br/>
                    trichy-620001 <br/>
                    email : thunicleaninfo@gmal.com <br/>
                    phone no:98989898</p>
                    </div>

                    </div> 
                    </section> 
                    </footer>
        )
    }
}
