import React, { Component } from 'react'
import api from '../../config/api'
import {dataApi} from '../../config/api' 
import {getAdminRequestConfig} from '../../config/requestConfig'
import {Button,Form} from 'react-bootstrap'
import Modal from "../modal"
import Preloader from "../Preloader";
import LineGraph from './LineGraph';
import PieGraph from './PieGraph';
export default class Dashboard extends Component {
    
    constructor()
    {
        super();
        this.Booking = this.Booking.bind(this);
        this.services = this.services.bind(this);
        this.servicesUnits = this.servicesUnits.bind(this);
        this.boxDetails = this.boxDetails.bind(this);
        this.admin = this.admin.bind(this);
        this.state = {
          orderDetails:{},
            bookings:[],
            Summary:[],
            modalShow:false,
            filter:"",
            filterBookings:[],
            totalBookings:null,
            totalPrice:null,
            services:[],
            servicesUnits:[],
            admin:[],
            loader:true

        }
    }
    services = () =>
    { 
        api.get("/services/admin/service",getAdminRequestConfig()).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({services:Response.data}) 
        })

    }
    servicesUnits = () =>
    { 
        api.get("/serviceUnits/",getAdminRequestConfig()).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({servicesUnits:Response.data}) 
        })

    }

    admin = () =>
    {
      api.get("/admin/enable",{
        headers:{'admin_token':`${JSON.parse(localStorage.getItem('admin_token'))}`}
       }).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({admin:Response.data}) 
        })

    }
    
    Booking = () =>
    { 
      this.setState({loader:true})
        api.get("/booking/admin/booking",getAdminRequestConfig()).then( async(Response) => {
          console.log(Response.data);
         await this.setState({bookings:Response.data,filterBookings:Response.data}) 
         await this.boxDetails();
         this.setState({loader:false})
        })


    }
     boxDetails = async () =>
       {
        let TotalBookings  = await this.state.bookings.length;
        this.setState({totalBookings:TotalBookings});
        let filter = await this.state.bookings.filter((data) => data.bookingStatus === 'completed');
        let price = await filter.reduce((sum , i) => (sum += parseInt(i.payments.amount)),0);
        let TotalPrice = price ;
        this.setState({totalPrice:TotalPrice});
        console.log(filter,TotalPrice);
       }
        
    async componentDidMount()
    {
    await this.Booking();
    await this.services();
    await this.servicesUnits();
    await this.admin();
    }

   
    render()  
    {

      

      const orderStatus = (id,msg,e) =>
      {
        this.setState({loader:true})
        e.preventDefault();
        let button = e.target;
        let message ={bookingStatus:msg}
        api.put('/booking/adminCancel/'+id,message,getAdminRequestConfig()).then( async(Response) => {
        button.remove();
        await this.Booking();
         this.setState({loader:false})
      }
        )

      }

   const orderSummary = async (booking,fulldata) =>
   {
    await this.setState({Summary:booking,orderDetails:fulldata})
    this.setState({modalShow:true})
    console.log(this.state.Summary,this.state.orderDetails);
   }

        const Cards = ({Bookingdata}) =>
        {
            return(
            //Bookingdata.serviceId._id 
             
            <div className="card border-0 mb-4 temporary-box-shadow">
            <div className="d-flex">
              <div className="pl-4 pr-2 d-flex align-items-center justify-content-center red">
              <img height="50px" width="50px"  src={`${dataApi}/services/${Bookingdata.serviceId._id}/image`} alt="eroor in serivice"/>
              </div>
                <div className="flex-fill">
                   <div className="card-body">
                     <span className="card-title font-weight-bold mt-2">  {Bookingdata.serviceId.serviceName} &nbsp; &nbsp;{  Bookingdata.bookingStatus === "requested" &&  <span style={{color:"green"}}>Pending</span>} {  Bookingdata.bookingStatus === "Accecpted" &&  <span style={{color:"green"}}>Processing</span>} &nbsp; &nbsp; &nbsp; <p>Booking ID {Bookingdata._id} </p></span>
                     <span className="card-subtitle text-secondary  d-flex ellipsis-length-long mb-2">
                    <span>Name &nbsp;{Bookingdata.userName}</span>
                     <span className="ml-4">Phone &nbsp;<b>{Bookingdata.userId.phoneNo}</b></span>
                     <span className="ml-4">Status &nbsp;<b>{Bookingdata.bookingStatus}</b></span>

                     </span> 
                     
                    <div>
                      <Button variant="primary btn-sm" onClick={() => orderSummary(Bookingdata.bookingUnits,Bookingdata) }>View</Button>
                    { Bookingdata.bookingStatus !== "Accecpted" && Bookingdata.bookingStatus !== "Canceled" && Bookingdata.bookingStatus !== "sorry canceled by owner" && Bookingdata.bookingStatus !== "completed" && <Button variant="primary btn-sm"  onClick={((e) =>(orderStatus(Bookingdata._id,"Accecpted",e)) )}>Accecpt</Button> }
                    { Bookingdata.bookingStatus !== "sorry canceled by owner" && Bookingdata.bookingStatus !== "Canceled" && Bookingdata.bookingStatus !== "Accecpted" && Bookingdata.bookingStatus !== "completed" && <Button variant="primary btn-sm"  onClick={((e) =>(orderStatus(Bookingdata._id,"sorry canceled by owner",e)) )}>Cancel</Button>  }
                    { Bookingdata.bookingStatus !== "sorry canceled by owner" && Bookingdata.bookingStatus !== "Canceled" && Bookingdata.bookingStatus === "Accecpted" && <Button variant="primary btn-sm"  onClick={((e) =>(orderStatus(Bookingdata._id,"completed",e)) )}>Completed</Button>  } 
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
        
       const filters = async (e) =>
       {
       await this.setState({filter:e.target.value});
      //  console.log(this.state.filter);
       if(this.state.filter !== "")
       {
        let bookings = await this.state.bookings;
        let filter = await bookings.filter((data) => data.bookingStatus === `${this.state.filter}`);
        // console.log(filter);
        await  this.setState({filterBookings:filter});
       }
       else
       {
        await  this.setState({filterBookings:this.state.bookings});
       }
      //  console.log(this.state.filterBookings);
    }

     const adminStatus = (id,sta) =>
     {
      console.log(sta);
      if( sta === 'true')
      {
      let data = {status:'false'}
     api.put('/admin/status/'+id,data,{
      headers:{'admin_token':`${JSON.parse(localStorage.getItem('admin_token'))}`}
     }).then((Response) =>
     {
       console.log(Response.data);
       this.admin();
     })
     }
     else if(sta ==='false')
     {
       let data = {status:'true'}
       api.put('/admin/status/'+id,data,{
        headers:{'admin_token':`${JSON.parse(localStorage.getItem('admin_token'))}`}
       }).then((Response) =>
       {
         console.log(Response.data);
         this.admin();
       })
     }
    }


       const ServiceUnitsToggles = ({datas,index}) =>
       (
       
        <div className="toggles-group">
        <input type="checkbox"  id={`checkbox${index}`} checked={datas.status === 'true'} onChange={()=> ServiceUnitStatus(datas._id,datas.status)} className="ios-toggle" />
        <label htmlFor={`checkbox${index}`} className="checkbox-label" >{datas.unitName}</label> 
        </div>
        
       )

       const ServiceUnitStatus  = (id,sta) =>
       {
         
         console.log(sta);
         if( sta === 'true')
         {
         let data = {status:'false'}
        api.put('/serviceUnits/status/'+id,data,getAdminRequestConfig()).then((Response) =>
        {
          console.log(Response.data);
          this.servicesUnits();
        })
      }
      else if(sta ==='false')
      {
        let data = {status:'true'}
        api.put('/serviceUnits/status/'+id,data,getAdminRequestConfig()).then((Response) =>
        {
          console.log(Response.data);
          this.servicesUnits();
        })
      }
       }
       
      

       const ServiceToggles = ({datas,index}) =>
       ( 
    
      <div className="toggles-group">
      <input type="checkbox"  id={`checkbox1${index}`} checked={datas.status === 'true'} onChange={()=> ServiceStatus(datas._id,datas.status)} className="ios-toggle" />
      <label htmlFor={`checkbox1${index}`} className="checkbox-label" >{datas.serviceName}</label> 
      </div>
  
       )
       
        
       const ServiceStatus  = (id,sta) =>
       {
         
         if( sta === 'true')
         {
         let data = {status:'false'}
        api.put('/services/status/'+id,data,getAdminRequestConfig()).then((Response) =>
        {
          console.log(Response.data);
          this.services();
        })
      }
      else if(sta ==='false')
      {
        let data = {status:'true'}
        api.put('/services/status/'+id,data,getAdminRequestConfig()).then((Response) =>
        {
          console.log(Response.data);
          this.services();
        })
      }
       }
   
  

        return (
      
            <div className="dashboard">
            
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
              {this.state.loader ? <Preloader/> :
                  <>
                <div className="dashboard-main">
                <div className="row">
                        <LineGraph />
                </div>
                <div className="row">
                <PieGraph />
                </div>
                <div  className="choose-heading "><h3>Bookings</h3></div>
                <div>
                
                <Form.Group >
                <Form.Label>filters</Form.Label>
                <Form.Control as="select" size="md"  value={this.state.filter}    onChange={(e) => filters(e)} custom>
                <option value="">all</option>
                <option>Accecpted</option>
                <option>requested</option> 
                <option>Canceled</option>
                <option>completed</option>
                <option>sorry canceled by owner</option>
                </Form.Control>
                </Form.Group>
               
                </div>
                {this.state.filterBookings.length <= 0 ? <div>no records</div> : false }
                {this.state.filterBookings.length !== 0 &&
                this.state.filterBookings.map((data,index) => 
                (
                <Cards Bookingdata={data} key={index}/>
                ))}
                </div>
                 <div className="dashboard-secondary">
                  <div className="box-container">
                    <div className="box">
                      <h3>Total Bookings</h3>
                    <span>{this.state.totalBookings}</span>
                    </div>
                    <div className="box">
                     <h3>Total Collected price</h3>
                     <span>₹{this.state.totalPrice}</span>
                     </div>
                    </div>
                    <div className="toggles">
                      <div>
                      <div  className="choose-heading "><h3>enable Bookings</h3></div>
                        { this.state.admin.map( (datas,index) =>
                        (
                      <div className="toggles-group" key={index}>
                      <input type="checkbox"  id="checkbox1" checked={datas.enableBooking === 'true'} onChange={()=> adminStatus(datas._id,datas.enableBooking)} className="ios-toggle" />
                      <label htmlFor="checkbox1" className="checkbox-label" >Bookings</label> 
                      </div>
                        ))
                        }
                     </div>
                    <div>
                   <div  className="choose-heading "><h3>Services Status</h3></div>
                   {this.state.services.map((data,index) => <ServiceToggles key={index} index={index} datas={data}/>)}
                    </div>
                    <div>
                   <div  className="choose-heading "><h3>Services Units Status</h3></div>
                   {this.state.servicesUnits.map((data,index) => <ServiceUnitsToggles key={index} index={index} datas={data}/>)}
                    </div>


                    </div>
                    
                </div>
                </>
          }
            </div> 
           
        )
    }
    
}

