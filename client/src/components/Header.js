import React, { Component } from 'react'
import header_phone from '../images/phone.png';
import header_clock from '../images/clock.svg';
import {Link} from "react-router-dom"; 

 class Header extends Component {
   
   
    constructor()
    {
    super();         
    this.state = {
        headertwo:true,
        btnDisplay:true,
        navbar_list:
        [
            {
            id:1,
            text:"HOME",
            url:"#header"
             }
            ,{
            id:2,
            text:"SERVICE",
            url:"#service" 
            },
            {
            id:3,
            text:"HOW ITS WORKS",
            url:"#timeline"
            },
            {
            id:4,
            text:"PRICING",
            url:"#pricing"
            },
            {
            id:5,
            text:"ABOUT US",
            url:"#footer"
            }

        ],
        header_bar:
        [
            {
                id:1,
                src:header_clock,
                text_one:"OPEN HOURS",
                text_two:"8AM - 9PM"
            },
            {
                id:2,
                src:header_phone,
                text_one:"CONATCTS",
                text_two:"9897969504"
            }

        ]
    
  }
  

}
componentDidMount()
  {
  this.setState({
    headertwo: this.props.Headertwo,
    btnDisplay:this.props.btn
  })
  }
 

    render() 
    {
       
        const HeaderTwo =  () => {
            return(
 
                 <div className="header-two">
                    <nav>
                     <ul>
                          {this.state.navbar_list.map((list) =>{
                           return( <li  key={list.id}  className="navlink">
                               <a href={list.url}>{list.text}</a>
                               </li> )
                         })
                          }
 
                     </ul>
                     </nav>
                 </div>
 
                 
             )
         }

         const Button = () =>
         { 
            return(
            <li>
            <Link to={this.props.path} className="bookingbtn"> 
                 {this.props.btn_name}
            </Link>
            </li>
            )
         }
       
        

        return (
            <header id="header"> 
                <div className="header-one">
                <div className="site-title">
                   <Link to="/" className="link"> <h1>CLEAN THUNI</h1></Link>
                </div>
                <div className="navbar">
                <nav>    
                <ul>
                {
                 this.state.header_bar.map((list) =>( 
                      <li key={list.id}>
                     <div className="header-info"> 
                     <div><img src={list.src}alt="error"/>
                     </div>
                      <div className="info">
                          <span>{list.text_one}</span>
                          <span>{list.text_two}</span>
                          </div> 
                          </div> 
                          </li>))
                }
                {  this.state.btnDisplay ? true : <Button/> }
                </ul>
                </nav>
                </div>
                </div>
                <hr/>
                 { this.state.headertwo ?  true : <HeaderTwo/> }   
            </header>
        )
    }
}
export default  Header;