import React, { Component} from "react";
import Header from "./Header";
import  DatePicker  from "react-datepicker";
import {addDays} from 'date-fns'
import { withRouter } from "react-router-dom";
import api from '../config/api' 
import {dataApi} from '../config/api' 
import {getClientRequestConfig} from '../config/requestConfig'
import { toast } from 'react-toastify';
import Modal from './modal'
//images
import  deliveryDate  from "../images/cart_images/delivery_date.png";
import  pickDate from "../images/cart_images/pick-up-date.png";
import  bookingIMG from "../images/bookings.svg";
import Preloader from "./Preloader";



    

    


 class Booking extends Component {
  constructor() {
    super();
    this.scroll = this.scroll.bind(this);
    this.myInput = React.createRef()
  
    this.state = {
        user:{
          fname:"",
          lname:"",
          notes:"",
          email:"",
          address:"",
          phoneNo: "",
          city: "",
          state: "",
          zipcode:""
        },
      admin:[],
      adminModal:false,
      step1:false,
      step2:false,
      step_1:false,
      token:"",
      payment:"",
      submit:true,
      zipcode:"",
      servicename:{
        name:"",
        imgurl:null
      },
      articleSelect:"",
      formStatus: true,
      startDetails:null,
      pickupDate:null,
      deliveryDate:null,
      endDetails:null,
      email:"",
      password:"",
      cartItems:[],
      zipCodes:["620001","620002","620005","620006"],
      services: [],
      articles: [],
      effect:[],
      loader:true
    };
  this.fetchServices = this.fetchServices.bind(this);
  this.fetchServicesUnits= this.fetchServicesUnits.bind(this);
  this.admin= this.admin.bind(this);
  }

 

  admin = () =>
  {
    api.get("/admin/enable",getClientRequestConfig()).then( async(Response) => {
      console.log(Response.data);  
      await this.setState({admin:Response.data}) 
      this.state.admin.map((data) =>
      {
      if(data.enableBooking === 'false')
      {
       this.setState({adminModal:true})
      }
      return data.enableBooking;
    }
      )
      })
  }
  scroll(direction){
    let far = this.myInput.current.clientWidth/2*direction;
    let pos = this.myInput.current.scrollLeft + far;
    this.myInput.current.scrollLeft = pos;
  }

  fetchServicesUnits = () =>
    { 
        api.get("/serviceUnits/user",getClientRequestConfig()).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({articles:Response.data}) 
        })

    }
  
  fetchServices = () =>
    {
      api.get("/services/user/service",getClientRequestConfig()).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({services:Response.data}) 
        })
    }

   async componentDidMount() 
   {
   await this.fetchServices();
   await this.fetchServicesUnits();
   await this.admin();

     await this.setState({display:true , token:localStorage.getItem('auth_token')}) 
    //  console.log(this.state.token);


      api.get("/user",getClientRequestConfig()).then( async (Response) => {
        // console.log(Response.data);
       await this.setState({
        user:{
        fname:Response.data.fname,
        lname:Response.data.lname,
        notes:Response.data.notes,
        email:Response.data.email,
        address:Response.data.address,
        phoneNo:Response.data.phoneNo,
        city:Response.data.city,
        state:Response.data.state,
        zipcode:Response.data.zipcode
       },
       
       step_1:true,
       loader:false
       
       })
     }).catch(err =>
     {
         console.log(err.response.data);
     })
     
   }

  
  render() 
  {
   
  

    const Services = ({ data }) => {
      return (
        <div className={this.state.servicename.name === data.serviceName ? "serviceboxActive": "servicebox" }  id="hello" onClick={() => {  this.setState({servicename:{...this.state.servicename,name:data.serviceName , imgurl:data._id}, step1:true})} } >
          <div>
       
            <img src={`${dataApi}/services/${data._id}/image`} alt="error" />
          </div>
          <div>
            <span>{data.serviceName}</span>
          </div>
        </div>
      );
    };


    //article div onclick functions

    const design = (data) =>
    {
     
     let value =  this.state.effect.includes(data)
     if(value)
     {
       return "article-selected"
     }
     else
     {
      return "article-flex"
     }
    }

    const spandesign = (data) =>
    {
     
     let value =  this.state.effect.includes(data)
     if(value)
     {
       return "span-qty-div"
     }
     else
     {
      return "spanNone"
     }
    }

    
   
    
    

    const Articles =  ({data,index}) => {
      return (
        <div className="article-div"  >
        <div className={this.state.effect.length <= 0 ? "article-flex" : design(data.unitName)}
           ref={this.myCard} onClick={(e) => addCart(data,index)}>
          <img src={`${dataApi}/serviceUnits/${data._id}/image`} alt="error" />
          <span>{data.unitName}</span>
          </div>
          <span className="span-qty-div" className={this.state.effect.length <= 0 ? "spanNone" : spandesign(data.unitName)} >
          <span onClick={() => addArticles(index,"increment",data.unitName)} >+</span><span>{data.qty}</span><span onClick={() => addArticles(index,"decrement",data.unitName)}>-</span>
          </span>
        </div>
      );
    };

    

    const addCart = async (data,index) =>
    {
           
         
          if(this.state.effect.map((unit) => unit).includes(data.unitName))
          {
           
            await this.setState({effect:this.state.effect.filter(unit => unit !== data.unitName)})
          }
          else
          {
            await  this.setState({effect:[...this.state.effect,data.unitName]})
          }
          
          const obj = {"unitName":data.unitName ,"unitQty":data.qty,"unitRate":data.price,"unitImg":data._id};
          const datas = this.state.cartItems;
         if (datas.map(like => like.unitName).includes(data.unitName))
        {
           await this.setState({
            cartItems: this.state.cartItems.filter(item => item.unitName !== data.unitName)
          });
              
          if(this.state.cartItems.length <= 0)
              {  
                this.setState({step2:false , endDetails:null,deliveryDate:null,submit:true,startDetails:null,pickupDate:null});
              }
          
        }
        else
        { 
          await this.setState({cartItems:[...this.state.cartItems,obj]})
          await addArticles(index,"increment",data.unitName);
          this.state.step2 === false && this.setState({step2:true})
        }
          
      
    }

   




    const addArticles = async (e,operation,name) =>
    {
       
      
      if(operation === "increment")
      {
      this.setState(state =>
        { 
           const value = state.articles.map((data , index) =>
      {
        if(index === e)
        {
          if(data.qty >= 10 )
          {
          return data.qty;
          }
          else{
            return data.qty++;
          }
        }
        else { return data.qty;}
      });
      
      return value ;
         

    })
    
  }
    else if(operation === "decrement")
    {
      this.setState(state =>

        { const value = state.articles.map((data , index) =>
      {
        if(index === e)
        {
          if(data.qty <= 1)
          {
            
          return data.qty;
          }
          else{
            return data.qty--;
          }
        }
        else { return data.qty;}
      });
      return value ;

    })
    }
   
      const datas = this.state.cartItems;
       if (datas.map(like => like.unitName).includes(name))
        {
          
          await this.setState(  state => 
                { 
                if(operation === "increment") { 
               const value = state.cartItems.map( async (data) =>
              {
                if(data.unitName === name)
                {
                  if(data.unitQty >= 10 )
                  {
                   
                  return data.unitQty;
                  }
                  else{
                   
                    return data.unitQty++;
                  }
                }
                else { return data.unitQty;}
              });
              
              return value ;
               
            }
            else if(operation === "decrement")
            {
              console.log("decrement");
              
              const value = state.cartItems.map( async (data) =>
              {
                if(data.unitName === name)
                {
                  if(data.unitQty <= 1 )
                  {
                  
                  return data.unitQty;
                  }
                  else{

                  
                    return data.unitQty--;
                  }
                }
                else { return data.unitQty;}
              });
              
              return value ;

            }

              
            });
        }
        checkTotal();
    }


    const checkTotal = () =>
    {
      if(this.state.cartItems.reduce((sum , i) => (sum += i.unitQty * i.unitRate ),0) === 0 && this.state.step1 === true )
      {
        
        this.setState({submit:true});
      }
      else if(this.state.cartItems.reduce((sum , i) => (sum += i.unitQty * i.unitRate ),0) !== 0 && this.state.deliveryDate !== null )
      {
        
        this.setState({submit:false});
      }
    }
 

        const zipCode =  (code) =>
            {
              this.setState({zipcode:""})
               let validate = this.state.zipCodes.includes(code.target.value);
               if(validate)
               {
                this.setState({zipcode:code.target.value ,step_1:true})
               }
               else
                 {
                   this.setState({step_1:false ,servicename:{...this.state.servicename ,name:"",imgurl:""},step1:false})
                }
             
                
            }

          
          
            const filteredDate = (data) =>
            {
            var date = new Date(data),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
            return [day, mnth,date.getFullYear() ].join("-");
            }
          
          
            const Pickdate = (data) =>
          {
              let Date = filteredDate(data);
              console.log(Date);
              console.log(this.state.startDetails);
              this.setState({startDetails:data,pickupDate:Date});
              this.setState({endDetails:null,deliveryDate:null,submit:true});
            
          }
          const Deliverydate = (data) =>
          {
              let Date = filteredDate(data);
              this.setState({endDetails:data,deliveryDate:Date});
            if(this.state.submit  === true && this.state.cartItems.reduce((sum , i) => (sum += i.unitQty * i.unitRate ),0) !==0 )
            {
              this.setState({submit:false});
            }
          
          }

          const Handlebooking = async (event) =>
          {
            this.setState({loader:true})
            event.preventDefault();
              const Booking ={
              serviceName:this.state.servicename.name,
              pickupDate:this.state.pickupDate,
              deliveryDate:this.state.deliveryDate,
              specialNotes:this.state.user.notes,
              bookingUnits:this.state.cartItems,
              payments:{
                paymentMethod:"pay Local",
                amount:await this.state.cartItems.reduce((sum , i) => (sum += i.unitQty * i.unitRate ),0),
                paymentStatus:"did't pay"   
              },
            }
            console.log(Booking);

            api.post("/booking",Booking,getClientRequestConfig())
            .then(
              Response => {toast.success(Response.data);
             
              this.setState({
              step1:false,
              step2:false,
              payment:"",
              zipcode:null,
              servicename:{...this.state.servicename ,name:"",imgurl:""},
              articleSelect:"",
              formStatus: true,
              startDetails:null,
              pickupDate:null,
              deliveryDate:null,
              endDetails:null,
              email:"",
              password:"",
              cartItems:[],
              loader:false})

            }
              
            ).catch(err =>{
              toast.error(err.response.data);
            })
            
          
          }

          const CartItems = ({items}) =>
          {
           return(
                <div className="items-purchased order-layout">
                <div id="item"><img src={`${dataApi}/serviceUnits/${items.unitImg}/image`} height="30px" width="30px" alt="item pic"/>&nbsp;{items.unitName}</div>
                <div id="qty"> x{items.unitQty} </div>
                <div id="price">₹ {items.unitQty*items.unitRate} </div>
                </div>
                 
           );
          }
    
   
      
 
    return (
      <div className="booking">
         {this.state.adminModal &&  <Modal>
           <div>
             <img src={bookingIMG} height="auto" width="100%" alt="eroor on booking images"/>
             <div className="choose-heading">
               <h3> <div> Service Timing 9AM - 5PM </div> Bookings are didnt accecpt by this time sorry try after some time</h3>
               </div>
           </div>
       
         </Modal>
         }
         {this.state.loader ? <Preloader/> :
        <>
        <Header btn_name="MyAccount" path="/MyAccount" Headertwo={true}/>
        <div className="booking-div">
          <span className="userName">
             <div> <span className="login" onClick={() => { localStorage.clear();  this.props.history.push('/login')}}>logout</span></div>  
           </span>
          
             <div className="booking-service">
               <form onSubmit={Handlebooking}>

            <div className="booking-service-heading">
              <div className="choose-heading"> <h3>where would you likeus to provide service?</h3></div>
              <div className="booking-service-input">
                <input type="number" id="zipcode" placeholder="Zipcode"   onChange={(e) => zipCode(e)} />

              {this.state.zipcode === ""  ? <div style={{color:"red"}} >please fill Out with 6 digit</div> : <div style={{color:"green"}}> valided pincode</div> }
              </div>
            </div>

            <div className="choose-service">
              <div className="choose-heading">
                <h3>Choose service</h3>
              </div>

              <div className="choose-service-container">
                {this.state.services.map((dataItem , index) => (
                  <Services data={dataItem} key={index} />
                ))}
              </div>
               {this.state.step1 && this.state.step_1 === true ? 
               <>
               <div className="choose-heading">
                <h3>Choose Articles</h3>
              </div>
              <div className="choose-articles" id="content">
                
                <div className="left">
                  <span
                    id="left-button"
                    onClick={this.scroll.bind(null,-1)}
                  > &#10094;
                  </span>
                </div>
                <div  ref={this.myInput} className="article-group">
                  
                  {this.state.articles.map((dataItem, index) => (
                    <Articles key={index} data={dataItem} index={index} />
                  ))}
                </div>
                <div className="right">
                  <span
                    id="right-button"
                    onClick={this.scroll.bind(null,1)}>  
                   &#10095;
                  </span>
                </div>
              </div> </> : false }
              {this.state.step2 === true ? 
              
            
           
       <div className="full-width">        
     <div className="main-container">
    <div className="checkout-container">
    <div className="basket-icon">
    <img src="https://img.icons8.com/plasticine/100/000000/favorite-cart.png" alt="error" height="50px" width="50px"/> </div>
      
      <div className="order-summary-container">
        <h1> ORDER SUMMARY </h1>
        <hr/>
        <div className="order-summary-header order-layout">
          <div id="item">Items</div>
          <div id="qty">Qty</div>
          <div id="price"> Price</div>
        </div>
        <hr/>

        {this.state.cartItems.length === 0 ?
                 <div> cart is empty </div> :
                 <div>
                 {this.state.cartItems.map( (items,index) => (
                  <CartItems items={items} key={index} />
                    ))}
                    <hr/> 
                <div className="items-purchased order-layout">
                {this.state.servicename.name && <div id="item">service</div>}
                {this.state.pickupDate && this.state.deliveryDate ?  <div id="qty">Pickup Date</div> : false}
                {this.state.deliveryDate && this.state.pickupDate ? <div id="price">  delivery Date</div>: false}
                </div>
               
               <div className="items-purchased order-layout">
                <div id="item"> <img src={`${dataApi}/services/${this.state.servicename.imgurl}/image`} height="30px" width="30px" alt="service name error"/> {this.state.servicename.name}</div>
                {this.state.deliveryDate && <div id="qty">  <img src={pickDate} alt="deliveryDate error"/>  {this.state.pickupDate} </div>}
                {this.state.deliveryDate &&<div id="price"> <img src={deliveryDate} alt="deliveryDate error"/> {this.state.deliveryDate} </div>}
                </div>
                <hr/> 

              <div className="order-summary-header order-layout">
              <div id="item">Name</div>
              <div id="qty">{this.state.user.fname + "" + this.state.user.lname}</div>
              </div>
              <div className="order-summary-header order-layout">
              <div id="item">Address</div>
                 <div id="qty">{this.state.user.address  + "," + this.state.user.city + "," + this.state.user.state}</div>
              </div>

              <div className="order-summary-header order-layout">
              <div id="item">Zipcode</div>
              <div id="qty">{this.state.zipcode}</div>
              </div>
              <div className="order-summary-header order-layout">
              <div id="item">Phone number</div>
              <div id="qty">{this.state.user.phoneNo}</div>
              </div>
              <div className="order-summary-header order-layout">
              <div id="item">email</div>
              <div id="qty">{this.state.user.email}</div>
              </div>
              <hr/>
              <div className="order-summary-header order-layout">
              <div id="item">Notes</div>
              <div id="qty">{this.state.user.notes}</div>
              </div>



                 </div>
                 
               }
        
        
      </div>

      <div className="header"> ₹ {this.state.cartItems.reduce((sum , i) => (sum += i.unitQty * i.unitRate ),0)} <span>.00</span> </div>
      <div className="card-details-container">
      <div className="pickup-div ">
              <div>
                  <h3>Select PickUP Date </h3>
                <div>
                       <DatePicker 
                       placeholderText="Click to select a pickup details"
                       selected={this.state.startDetails}  
                       minDate={new Date()}  
                       maxDate={addDays(new Date(), 5)} 
                       onChange={(data) => Pickdate(data)}
                       dateFormat="dd/MM/yyyy"
                       className="datePickers"
                       />
                </div>

               { this.state.pickupDate && <div className="delivery-div">
              <div>
                <h3>Select Delivery Date</h3>
              </div>
              <div >
               {this.state.startDetails == null ? "please enter pickup date" : 
               <DatePicker 
                    placeholderText="Click to select a Delivery details" 
                       selected={this.state.endDetails}  
                       minDate={addDays(this.state.startDetails,2)}  
                       maxDate={addDays(this.state.startDetails, 10)} 
                       onChange={(data) => Deliverydate(data)}
                       dateFormat="dd/MM/yyyy"
                       className="datePickers"
                       />}
              </div>
              </div> }
            <div className="details">
              <div className="payment">
                <div>
                  <h3>Prefered payment method</h3>
                </div>
                <div>
                  <label htmlFor="localpay">pay Locally</label>
                  <input type="radio"  id="localpay" onChange={() => this.setState({payment:"Payment via Local"})}/>
                </div>
              </div>

             
            </div> 
               
               
              </div>
            </div> 
      </div>
      <div className="submit">
                <input type="submit" className={this.state.submit === false ? "sumbitNormal": "sumbitTransparant"} disabled={this.state.submit}  value="submit" />
      </div> 
      </div>
             </div>  </div>  : false }
            </div>
            </form>
          </div>
        </div>
   </>
  }
      </div> 
    );
  }
}
export default withRouter(Booking);