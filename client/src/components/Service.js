import React, { Component } from 'react'
import iron from '../images/ironing-service.svg'
import wash from '../images/wash.svg'
import drying from '../images/serviceImages/dry-cleaning.png'


 class Service extends Component {
    render() {
        return (
                <section id="service">
                <div className="service" >
                <div className="service-heading-div">
                <h1 className="service-heading">SERVICES</h1>
                </div>
                <div className="square-container">
                    
                <div className="service-group">
               
                <div className="square">
                <img src={wash} alt="error" width="100%"   className="service_img" />
                </div>
                <div>
                <h1 className="service-title">WASHING</h1>
                </div>
                </div>

                <div className="service-group">
                
                <div className="square">
                <img src={iron} alt="error"  width="100%" className="service_img"  />
                </div>
                <div>
                <h1 className="service-title">IRONING</h1>    
                </div>
                </div>

                <div className="service-group">
                
                <div className="square">
                <img src={drying} alt="error"  width="100%" className="service_img" />
                </div>
                <div>
                <h1 className="service-title">DRYING</h1>
                </div>
                </div>
                </div>
                </div>
           
            </section>
        )
    }
}
export default Service 