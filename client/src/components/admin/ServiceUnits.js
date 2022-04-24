import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap'
import Modal from '../modal'
import api from '../../config/api'
import {dataApi} from '../../config/api' 
import {getAdminRequestConfig} from '../../config/requestConfig'
import Preloader from "../Preloader";

export default class ServiceUnits extends Component {
    constructor()
    {
        super();
        this.servicesUnits = this.servicesUnits.bind(this);
        this.state = {
          servicesUnits:[],
          showModal:false,
          updateModal:false,
          loader:true,
          serviceUnitsForm:{
            serviceUnitsName:"",
            status:null,
            serviceUnitsImage:null,
            maxlimit:"",
            minlimit:"",
            price:"",
           servicesUnitsId:null,
          }
        }
    }
    
    servicesUnits = () =>
    { 
       this.setState({loader:true});
        api.get("serviceUnits/",getAdminRequestConfig()).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({servicesUnits:Response.data}) 
        this.setState({loader:false});
        })
        

    }
    async componentDidMount()
    {
      await this.servicesUnits();
    }
   
    render() 
    {
      const ServiceUnitCard = ({data}) =>
    {
      return(
        
        <div className="card border-0 temporary-box-shadow mysites-card mb-4 cursor" onClick={() =>  this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm ,servicesUnitsId:data._id , serviceUnitsName:data.unitName,maxlimit:data.maxLimit,minlimit:data.minLimit,status:data.status,price:data.price},updateModal:true})}>
        <div className="card-img-top wp-bg d-flex justify-content-center align-items-center">
        <img src={`${dataApi}/serviceUnits/${data._id}/image`} alt="eroor in serivice"/>
        </div>

        <div className="card-body">
        <div className="d-flex">
        <h5 className="card-text font-weight-bold">unit Name :-  &nbsp;{data.unitName}</h5>
       
        </div>
        <p className="card-text"> status:  &nbsp;{data.status}</p>
        <p className="card-text"> min limit:  &nbsp;{data.maxLimit}</p>
        <p className="card-text ">max limit:  &nbsp;{data.minLimit}</p>  
        <p className="card-text "> price :  &nbsp;₹{data.price}</p>  
        </div>
        </div>
       
      )
    } 

    const ServiceUnitForm = (event) =>
    {
      this.setState({loader:true});
        event.preventDefault();
        var formData = new FormData();
          formData.append("unitName",this.state.serviceUnitsForm.serviceUnitsName);
          formData.append("status",this.state.serviceUnitsForm.status);
          formData.append("minLimit",this.state.serviceUnitsForm.minlimit);
          formData.append("maxLimit",this.state.serviceUnitsForm.maxlimit);
          formData.append("price",this.state.serviceUnitsForm.price);
          formData.append("qty","0");
          formData.append("serviceUnitsImage",this.state.serviceUnitsForm.serviceUnitsImage);
           console.log(formData);
        api.post('/serviceUnits/add',formData,getAdminRequestConfig()).then((Response) =>
        {
          console.log(Response.data);
          this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsName:"",maxlimit:"",minlimit:"",status:"",price:"",servicesUnitsId:""}})
          this.servicesUnits();
          this.setState({loader:false});
        })
        
      

    }

    const ServiceUnitEdit = (event) =>
    {
      this.setState({loader:true});
        event.preventDefault();
        var formData = new FormData();
          formData.append("unitName",this.state.serviceUnitsForm.serviceUnitsName);
          formData.append("status",this.state.serviceUnitsForm.status);
          formData.append("minLimit",this.state.serviceUnitsForm.minlimit);
          formData.append("maxLimit",this.state.serviceUnitsForm.maxlimit);
          formData.append("price",this.state.serviceUnitsForm.price);
          formData.append("qty","0");
          formData.append("serviceUnitsImage",this.state.serviceUnitsForm.serviceUnitsImage);
        console.log(formData);
        api.put('/serviceUnits/update/'+ this.state.serviceUnitsForm.servicesUnitsId,formData,getAdminRequestConfig()).then((Response) =>
        {
          console.log(Response.data);
          this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsName:"",maxlimit:"",minlimit:"",status:"",price:"",servicesUnitsId:""}})
          this.servicesUnits();
          this.setState({loader:false});
        }).catch(err => {
          console.log(err.response.data);
        }
        )
        
      

    }
   
        return (
         
          <div>
          {this.state.showModal &&  <Modal  closeModal={() => {this.setState({showModal:false})}} >
          <Form  onSubmit={ServiceUnitForm} encType="multipart/form-data">
            <Form.Group >
            <div className="form-group focused">
            <label className="form-control-label" htmlFor="input-serviceUnitName">Service unit Name</label>
            <input type="text" id="input-serviceUnitName"  className="form-control form-control-alternative" placeholder="Service Unit Name"   value={this.state.serviceUnitsForm.serviceUnitsName}    onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsName:e.target.value}})} />
            </div>  
            </Form.Group>
            <Form.Group >
            <div className="form-group focused">
            <label className="form-control-label" htmlFor="input-MinLimit">minimum limit</label>
            <input type="number" id="input-MinLimit"  className="form-control form-control-alternative" placeholder="min limit"   value={this.state.serviceUnitsForm.minlimit}   onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , minlimit:e.target.value}})} />
            </div>  
            </Form.Group>
            <Form.Group >
            <div className="form-group focused">
            <label className="form-control-label" htmlFor="input-MaxLimit">maximum limit</label>
            <input type="number" id="input-MaxLimit"  className="form-control form-control-alternative" placeholder="max limit"   value={this.state.serviceUnitsForm.maxlimit}   onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , maxlimit:e.target.value}})} />
            </div>  
            </Form.Group>
            <Form.Group >
            <div className="form-group focused">
            <label className="form-control-label" htmlFor="input-price">price</label>
            <input type="number" id="input-price"  className="form-control form-control-alternative" placeholder="price"   value={this.state.serviceUnitsForm.price}        onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , price:e.target.value}})} />
            </div>  
            </Form.Group>
            <Form.Group >
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-price">Status</label>
                <Form.Control as="select" size="md"  value={this.state.serviceUnitsForm.status}    onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , status:e.target.value}})}custom>
                  <option value="">select</option>
                  <option>true</option>
                  <option>false</option>
                </Form.Control>
              </div>  
            </Form.Group>
          <Form.Group>
            <div className="form-group focused">
            <label className="form-control-label" htmlFor="input-price">Service unit Image</label>
            <Form.Control 
            id="custom-file" type="file" size="md"
            label="select serive img file"
            onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsImage:e.target.files[0]}})}
            />
            </div>  
          </Form.Group>
          <Button variant="primary btn-sm" type="submit"  >Submit</Button>    
          </Form>
         </Modal>
         }

         {this.state.updateModal &&  <Modal  closeModal={() => {this.setState({updateModal:false,serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsName:"",maxlimit:"",minlimit:"",status:"",price:"",servicesUnitsId:""}})}} >
          <Form  onSubmit={ServiceUnitEdit} encType="multipart/form-data">
          <Form.Group >
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-serviceUnitName">Service unit Name</label>
          <input type="text" id="input-serviceUnitName"  className="form-control form-control-alternative" placeholder="Service Unit Name"   value={this.state.serviceUnitsForm.serviceUnitsName}   onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsName:e.target.value}})} />
          </div>  
          </Form.Group>
          <Form.Group >
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-MinLimit">minimum limit</label>
          <input type="number" id="input-MinLimit"  className="form-control form-control-alternative" placeholder="min limit"  value={this.state.serviceUnitsForm.minlimit}    onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , minlimit:e.target.value}})} />
          </div>  
          </Form.Group>
          <Form.Group >
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-MaxLimit">maximum limit</label>
          <input type="number" id="input-MaxLimit"  className="form-control form-control-alternative" placeholder="max limit"    value={this.state.serviceUnitsForm.maxlimit}   onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , maxlimit:e.target.value}})} />
          </div>  
          </Form.Group>
          <Form.Group >
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-price">price</label>
          <input type="number" id="input-price"  className="form-control form-control-alternative" placeholder="price"  value={this.state.serviceUnitsForm.price}     onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , price:e.target.value}})} />
          </div>  
          </Form.Group>
          <Form.Group >
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-price">Status</label>
          <Form.Control as="select" size="md"  value={this.state.serviceUnitsForm.status}     onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , status:e.target.value}})}custom>
          <option value="">select</option>
            <option>true</option>
            <option>false</option>
          </Form.Control>
          </div>  
          </Form.Group>
        <Form.Group>
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-price">Service unit Image</label>
          <Form.Control 
          id="custom-file"  type="file" size="md"
          label="select serive img file"
          onChange={(e) => this.setState({serviceUnitsForm:{...this.state.serviceUnitsForm , serviceUnitsImage:e.target.files[0]}})}
          />
          </div>  
        </Form.Group>
          <Button variant="primary btn-sm" type="submit"  >Submit</Button>    
          </Form>
         </Modal>
         }

         
        
         { this.state.loader ? <Preloader/>  :
          <>
          <div><Button varient="btn-primary btn-sm" onClick={() => this.setState({showModal:true})} >ADD</Button></div>
          <div className="admin-service">
          {this.state.servicesUnits.length <= 0 ? <div>Loading Data </div> : false }
          {this.state.servicesUnits.length !== 0 &&
          this.state.servicesUnits.map((data,index) => 
          (
            <ServiceUnitCard data={data} key={index}/>
          ))}     
          </div>
           </>
         }   
         
         
          </div>
    
          
        )
    }
}
