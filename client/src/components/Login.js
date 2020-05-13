import React, { Component } from 'react'
import Header from './Header'
import { toast } from 'react-toastify';
import { Redirect , withRouter } from 'react-router-dom';
import form_pic from '../images/laundry_login.svg';
import api from '../config/api'
import Modal from './modal'
import Preloader from "./Preloader";

 class Login extends Component {
    constructor()
    {
        super();
        this.state={
            display:false,
            login:false,
            showModal:false,
            id:"",
            email:"",
            password:"",
            fname:"",
            lname:"",
            pno:"",
            state:"",
            city:"",
            notes:"",
            address:"",
            loginEmail:"",
            loginPwd:"",
            zipcode:null,
            token:"",
            setNotify:"",
            loader:false
            
        }
      }

     componentDidMount()
     {
        if(localStorage.getItem('auth_token')){  this.props.history.push('/Booking') }
      
     }

     

    render() 
    {

          const formHandler = (event) =>
              {
                this.setState({loader:true});
                const {email , password , fname , lname, notes ,address , pno , city , state , zipcode } = this.state
                event.preventDefault();
                const user = {
                   
                    email:email,
                    pwd:password,
                    fname:fname,
                    lname:lname,
                    notes:notes,
                    address:address,
                    phoneNo:pno,
                    city:city,
                    state:state,
                    zipcode:zipcode

                }
            
                api.post("/user/register",user).then((Response) => { 
                    console.log(Response);
                    Animate("login")
                   toast.success("successfully Register" );
                   this.setState({loader:false});
                }).catch(err =>{
                  
                  toast.error(err.response.data);
                  this.setState({loader:false});
                })
              }


              if(this.state.login === true)
              {
                console.log(this.state.login);
                  return  <Redirect to="/Booking" />
              }

              const onExitsinguser = (event) =>
              {
                this.setState({loader:true});
                event.preventDefault();
                const {loginEmail , loginPwd } = this.state
                console.log(loginEmail,loginPwd);
                const Exitsinguser = {
                    email:loginEmail,
                    pwd:loginPwd
                }

            
                api.post("/user/login",Exitsinguser).then((Response) => 
                {
                     toast.success("successfully logined" );
                    console.log(Response);
                    if(Response.data["admin_token"])
                    {
                      localStorage.setItem('admin_token',JSON.stringify(Response.data.admin_token));
                      this.setState({login:true});
                      this.setState({loader:false});
                      this.props.history.push('/admin')
                    }
                    else if(Response.data["auth_token"])
                    {
                      localStorage.setItem('auth_token',JSON.stringify(Response.data.auth_token));
                      this.setState({login:true});
                      this.setState({loader:false});
                      this.props.history.push('/Booking')
                      
                    }
                    
                   
                }).catch(err =>{
                 toast.error(err.response.data);
                 this.setState({loader:false});
                })

                
            }

             
      const notifyHandler = (notification) => {
        this.setState({setNotify:notification});
      setTimeout(() => {
      this.setState({setNotify:""});
      }, 5000)
      }

          const forgot = (e) =>
          {
          e.preventDefault();
          const {loginEmail } = this.state
          api.post("/user/forgotPassword/"+loginEmail).then((Response) => 
          {
            console.log(Response)
            notifyHandler("pasword reset link is  sent to your mail address if Your mail address is vaild");
          });

         
          }  
  
 const Animate = (a) =>
{
if (a ==="signup")
  {
  let form=   document.getElementsByTagName("form")[1];
 form.style.display="none";
  let form1=   document.getElementsByTagName("form")[0];
   form1.style.display="block";
    
  }

  else if( a === "login")
    {
      
  let form1=   document.getElementsByTagName("form")[0];
  form1.style.display="none";
 let form=   document.getElementsByTagName("form")[1];
 form.style.display="block";

    }
  console.log("hi",a);
}

        return (
          
            <div>
  
  {this.state.showModal && <Modal closeModal={() => {this.setState({showModal:false})}}>
   <form onSubmit={forgot}>
     <div className="form-group " >
          <label className="form-control-label" htmlFor="input-email">Email address</label>
          <input type="email" id="input-username"  className="form-control form-control-alternative"   onChange={(e) => {this.setState({loginEmail:e.target.value})}}  placeholder="email@example.com"  />
     </div>
    <button type="submit" className="btn-primary btn">login</button>
    {this.state.setNotify !== '' && <div className="alert alert-primary"> {this.state.setNotify}</div>}
   </form>

  </Modal>}
  
 <Header btn={true}  Headertwo={true} />
 {this.state.loader && <Preloader/>}
<div className="container">

  <div className="info">
    <h1>ACCOUNT LOGIN</h1><span>login to <i className="fa fa-heart"></i> your <span style={{cursor:"pointer"}} onClick={() => Animate("signup")}>Account</span></span>
  </div>
</div>

<div className="form">
{this.state.loader && <Preloader/>}
  <div className="image"><img src={form_pic} alt="error" /></div>
  
  <form  onSubmit={formHandler} className="register-form">
    <input type="text" placeholder="First Name"  onChange={(e) => {this.setState({fname:e.target.value})}}   required/>
    <input type="text" placeholder="Last Name"  onChange={(e) => {this.setState({lname:e.target.value})}}  required/>
    <input type="email" placeholder="Email" name="email"  value={this.state.email} onChange={(e) => {this.setState({email:e.target.value})}}  required/>
    <input type="tel" placeholder="Phone"   onChange={(e) => {this.setState({pno:e.target.value})}} required/>
    <input   type="password" title="Minimum 8 characters, one number, one uppercase and one lowercase letter"  onChange={(e) => {this.setState({password:e.target.value})}}  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Password" required />
    <input  type="password" title="Minimum 8 characters, one number, one uppercase and one lowercase letter" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Confirm Password" required />
    <input id="text" type="text"  placeholder="Address"  onChange={(e) => {this.setState({address:e.target.value})}}  required/>
    <input type="text"  placeholder="City"  onChange={(e) => {this.setState({city:e.target.value})}} required/>
    <input type="text"  placeholder="State"   onChange={(e) => {this.setState({state:e.target.value})}} required/>
    <input type="text"  placeholder="Zipcode"   onChange={(e) => {this.setState({zipcode:e.target.value})}} required/>
    <textarea  placeholder="speaial notes" onChange={(e) => {this.setState({notes:e.target.value})}} id="" required></textarea>
    <button>create</button>
    <p className="message">Already registered? <button  onClick={() => Animate("login")}>Sign In</button></p>
  </form>
  
  <form onSubmit={onExitsinguser} className="login-form">
    <input type="email" placeholder="Email" name="email"   onChange={(e) => {this.setState({loginEmail:e.target.value})}}   required/>
    <input id="password" name="password" type="password"  onChange={(e) => {this.setState({loginPwd:e.target.value})}}   title="Minimum 8 characters, one number, one uppercase and one lowercase letter" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Password" required/>
    <span className="float-right p-1 cursor text-danger" onClick={() => this.setState({showModal:true})}>Forgot password ?</span>
    <button type="submit">login</button>
    <p className="message">Not registered?<button className="Elem" onClick={() => Animate("signup")}>Create an account</button></p>
  </form>
</div>

            </div>

        )
    }
}

export default withRouter(Login);