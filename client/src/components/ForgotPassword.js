import React, { Component } from 'react'
import Header from './Header';
import api from '../config/api'
import {withRouter} from 'react-router-dom'

class ForgotPassword extends Component {
    constructor()
    {
        super();
        this.state ={
            password:"",
            conPassword:"",
            setNotify:""
        }
    }
     componentDidMount()
     {
        if(!this.props.match.params.token)
        {
            this.props.history.push('/Login');
        }
        console.log(this.props.match.params.token);
     }
    

    render() {

        const notifyHandler = (notification) => {
            this.setState({setNotify:notification});
          setTimeout(() => {
          this.setState({setNotify:""});
          }, 5000)
          }
    
        const changePwd = (e) =>
        {
           e.preventDefault();
           if(this.state.password !== this.state.conPassword)
           {
            notifyHandler("password didnt match");
           }
           else 
           {
            const password ={password:this.state.password}
             api.post('/user/resetPwd/'+this.props.match.params.token,password).then((responce) =>
               {
               notifyHandler(responce.data);
               document.getElementsByTagName('input').value="";
               setTimeout(() => {
                this.props.history.push('/Login')
                }, 5000)
               }
           ).catch((err)=>
            { 
                notifyHandler(err.response.data)
                setTimeout(() => {
                    this.props.history.push('/')
                    }, 5000)
                    }
            )
           }

        }
        return (
            <div>
                <>
              <Header btn={true}  Headertwo={true} />
              <form onSubmit={changePwd} className="form">
                    <div className="form-pwd">
                        <input   type="password" title="Minimum 8 characters, one number, one uppercase and one lowercase letter"  onChange={(e) => {this.setState({password:e.target.value})}}  pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Password" required />
                        <input   type="password" title="Minimum 8 characters, one number, one uppercase and one lowercase letter" onChange={(e) => {this.setState({conPassword:e.target.value})}} pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" placeholder="Confirm Password" required />
                        {this.state.setNotify !== '' && <div className="alert alert-primary"> {this.state.setNotify}</div>}
                         <button  >submit</button>
                    </div>
                </form>
               </> 
            </div>
        )
    }
}

export default  withRouter(ForgotPassword) ;