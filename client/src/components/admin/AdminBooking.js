import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import Modal from "../modal"
import { toast } from 'react-toastify';
import api from '../../config/api'
import {dataApi} from '../../config/api' 
import {getAdminRequestConfig} from '../../config/requestConfig'

export default class AdminBooking extends Component { 
    constructor()
    {
        super();
        this.state = {
            searchData:{
                searchID:""
            },
            
                orderDetails:{},
                  bookings:[],
                  Summary:[],
                  modalShow:false
             
        }
    }

    render() {
        

 const orderSummary = async (booking,fulldata) =>
   {
    await this.setState({Summary:booking,orderDetails:fulldata})
    this.setState({modalShow:true})
    console.log(this.state.Summary,this.state.orderDetails);
   }

        const Cards = ({Bookingdata}) =>
        {
            return( 
            <div className="card border-0 mb-4 temporary-box-shadow">
            <div className="d-flex">
              <div className="pl-4 pr-2 d-flex align-items-center justify-content-center red">
              <img height="50px" width="50px"  src={`${dataApi}/services/${Bookingdata.serviceId._id}/image`} alt="eroor in serivice"/>
              </div>
                <div className="flex-fill">
                   <div className="card-body">
                     <span className="card-title font-weight-bold mt-2">  {Bookingdata.serviceId.serviceName} &nbsp; &nbsp;{  Bookingdata.bookingStatus === "requested" &&  <span style={{color:"green"}}>Pending</span>}  &nbsp; &nbsp; &nbsp; <p>Booking ID {Bookingdata._id} </p></span>
                     <span className="card-subtitle text-secondary  d-flex ellipsis-length-long mb-2">
                    <span>Name &nbsp;{Bookingdata.userName}</span>
                     <span className="ml-4">Phone &nbsp;<b>{Bookingdata.userId.phoneNo}</b></span>
                     <span className="ml-4">Status &nbsp;<b>{Bookingdata.bookingStatus}</b></span>

                     </span> 
                     
                    <div>
                      <Button variant="primary btn-sm" onClick={() => orderSummary(Bookingdata.bookingUnits,Bookingdata) }>View</Button>
                    </div> 
                    
                   </div>
                </div>
                  <div className="d-flex align-items-center justify-content-center">
                 <div className="arrow-group mt-3 mr-3">
                  <div className="arrow-head">    </div>
                  <div className="arrow-steam"> </div>
               </div>
              </div>
            </div>
          </div>
        )}


      

        const bookingData = (event) =>
        {

        event.preventDefault();
        this.setState({bookings:[]});
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(reg.test(this.state.searchData.searchID)=== false)(toast.error("you didnt include @ in your email "))
        else{
        api.get("/booking/admin/booking/"+this.state.searchData.searchID,getAdminRequestConfig()).then( async(Response) => {
         console.log(Response.data);
         await this.setState({bookings:Response.data});
        }).catch((err) => (toast.error(err.response.data)));


        }
    }
        
        return (
            <div className="bookingDetails">
                 {this.state.modalShow &&  <Modal  closeModal={() => {this.setState({modalShow:false})}} >
              <div className="model-summary-header">
              <div>
              <div className="choose-heading "><h3 >service name</h3></div>
              <div>{this.state.orderDetails.serviceId.serviceName}</div>
              </div>
              <div>
              
              <div className="choose-heading "><h3 >pick up date</h3></div>
              <div>{this.state.orderDetails.pickupDate}</div>
              </div>
              <div>
           
              <div className="choose-heading "><h3 >delivery time  date</h3></div>
              <div>{this.state.orderDetails.deliveryDate}</div>
              </div>

              <div>
              <div className="choose-heading "><h3 >Payment Method</h3></div>
              <div>{this.state.orderDetails.payments.paymentMethod}</div>
              </div>  

              </div>
              <div className="tableDiv">
              <table>
              <thead>
              <tr>
              <th scope="col">Unit Name</th>
              <th scope="col">Unit Qty</th>
              <th scope="col">Sub Price</th>
              </tr>
              </thead>
              <tbody>
              { this.state.Summary.map((data , index) => 
              (
              <tr key={index}>
              <td  scope="row" data-label="Unit Name">{data.unitName}</td> 
              <td data-label="Unit Qty">{data.unitQty}</td>
              <td data-label="Sub Price">  ₹ &nbsp;{data.unitQty * data.unitRate}</td>
              </tr>
              ))}
              <tr>
              <td></td>
              <td>Total</td>
              <td>₹ &nbsp;{this.state.orderDetails.payments.amount}</td>
              </tr>
              </tbody>
              </table> 
              </div>
              <div>
              <div className="choose-heading "><h3 >Special Notes</h3></div>
              <div>{this.state.orderDetails.specialNotes}</div>
              </div>


              </Modal>
              }
              <div className="search-box">
               <form onSubmit={bookingData}>
                   <div className="search-inputs">
                   <input type="search" placeholder="Enter Email ID"  onChange={(e) => this.setState({searchData:{...this.state.searchData,searchID:e.target.value}})}/>
                   <input type="submit"/>
                   </div>
               </form>
              </div>
              <div className="serach-result">
              {this.state.bookings.length !== 0 &&
                this.state.bookings.map((data,index) => 
                (
                <Cards Bookingdata={data} key={index}/>
                ))}
              </div>
              <div>
            
              </div>
            </div>
        )
    }
}
