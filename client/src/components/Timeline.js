import React, { Component } from 'react'

export default class Timeline extends Component {
    render() {
        return (
            <section id="timeline">
            <div className="section-timeline">
            <div className="container">
            <p style={{fontWeight: "bolder"}}  className=" h1 text-center js-wp-10">HOW ITS WORK</p>
            <ul className="timeline">
            <span className="linedesgin"></span>
            <li className="js-wp-4">
            <div className="badge text-center">1</div>
            <div className="body-card text-center">
            <div  className="h2">SIGN UP</div>
            <div className="content">
            Enter your post code and location details to find a cleaner in your city and reachable places.
            </div>
            </div>
            </li> 
            <li className="odd js-wp-5">
            <div className="badge text-center">2</div>
            <div className="body-card text-center">
            <div   className="h2">PLACE ORDER</div>
            <div className="content">
            Enter your post code and location details to find a cleaner in your city and reachable places.
            </div>
            </div>
            </li> 
            <li className="js-wp-6">
            <div className="badge text-center">3</div>
            <div className="body-card text-center">
            <div className="h2">PICK UP</div>
            <div className="content">
            Choose the cleaning plan suitable for you and provide any more information to get the service immediately.
            </div>
            </div>
            </li>
            <li className="odd js-wp-7">
            <div className="badge text-center">4</div>
            <div className="body-card text-center">
            <div className="h2">WASH IRON</div>
            <div className="content">
            Our service partnered up with the best professional cleaning agencies in your town and we ensure the cleaners are rated higher
            </div>
            </div>
            </li> 

            <li className="js-wp-8">
            <div className="badge text-center">5</div>
            <div className="body-card text-center">
            <div className="h2">DELEVIRY</div>
            <div className="content">
            Enjoy a fresh and clean home and feel convenient relaxation. Provide a review for quality improvement.
            </div>
            </div>
            </li>

            <span className="linedesgin1"></span>
            </ul>
            </div>

            </div>

            </section>

        )
    }
}
