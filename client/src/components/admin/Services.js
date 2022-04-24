import React, { Component } from 'react'
import {Button, Form} from 'react-bootstrap'
import Modal from '../modal'
import api from '../../config/api'
import {dataApi} from '../../config/api' 
import {getAdminRequestConfig} from '../../config/requestConfig'
import Preloader from "../Preloader";

export default class Services extends Component {
  constructor()
    {
        super();
        this.services = this.services.bind(this);
        this.state = {
          services:[],
          showModal:false,
          editmodal:false,
          loader:true,
          serviceForm:{
            serviceName:"",
            status:null,
            serviceImage:null,
            serviceId:null,
          }
        }
    }
    
    services = () =>
    { 
        this.setState({loader:true});
        api.get("/services/admin/service",getAdminRequestConfig()).then( async(Response) => {
        console.log(Response.data);  
        await this.setState({services:Response.data}) 
        this.setState({loader:false});

        })

    }
    async componentDidMount()
    {
     await this.services();
   
    }
   
    render() 
    {
      const ServiceCard = ({data}) =>
    {
      return(
        
        <div className="card border-0 temporary-box-shadow mysites-card mb-4 cursor" onClick={() => this.setState({serviceForm:{...this.state.serviceForm , status:data.status,serviceName:data.serviceName,serviceId:data._id},editmodal:true})}>
        <div className="card-img-top wp-bg d-flex justify-content-center align-items-center">
        <img src={`${dataApi}/services/${data._id}/image`} alt="eroor in serivice"/>
        </div>

        <div className="card-body">
        <div className="d-flex">
      <h5 className="card-text font-weight-bold">{data.serviceName}</h5>
        <div className="arrow-group ml-2">
        <div className="arrow-head"></div>
        <div className="arrow-steam"></div>
        </div>
        </div>
        <p className="card-text ">{data.status}</p>  
        </div>
        </div>
       
      )
    } 
    
    const ServiceForm = (event) =>
    {
      this.setState({loader:true});
        event.preventDefault();
        var formData = new FormData();
          formData.append("serviceName",this.state.serviceForm.serviceName);
          formData.append("status",this.state.serviceForm.status);
          formData.append("serviceImage",this.state.serviceForm.serviceImage);
          
        console.log(formData);

        api.post('/services/admin/addService',formData,getAdminRequestConfig()).then(async(Response) =>
        {
          console.log(Response.data); 
          await this.setState({serviceForm:{...this.state.serviceForm , status:"",serviceName:"",serviceImage:null,serviceId:null}})
          await this.services();
          this.setState({loader:false});
        })
    }
        const ServiceEditform = (event) =>
        {
           this.setState({loader:true});
            event.preventDefault();
            var formData = new FormData();
              formData.append("serviceName",this.state.serviceForm.serviceName);
              formData.append("status",this.state.serviceForm.status);
              formData.append("serviceImage",this.state.serviceForm.serviceImage);
              
            console.log(formData);
    
            api.put('/services/update/'+this.state.serviceForm.serviceId,formData,getAdminRequestConfig()).then( async(Response) =>
            {
              console.log(Response.data);
              await this.setState({serviceForm:{...this.state.serviceForm , status:"",serviceName:"",serviceImage:null,serviceId:null}})
              await this.services();
              this.setState({loader:false});
            })
          
          }
    
   
        return (
          <>
           {this.state.loader ? <Preloader/>  :
          <div>
          {this.state.showModal &&  <Modal  closeModal={() => {this.setState({showModal:false});}} >
            <Form  onSubmit={ServiceForm} encType="multipart/form-data">
              <Form.Group >
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-serviceName">Service Name</label>
                <input type="text" id="input-serviceName"  className="form-control form-control-alternative" placeholder="Service Name"      value={this.state.serviceForm.serviceName}    onChange={(e) => this.setState({serviceForm:{...this.state.serviceForm , serviceName:e.target.value}})} />
              </div>  
              </Form.Group>
              <Form.Group >
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-serviceName">Status</label>
                <Form.Control as="select" size="md" value={this.state.serviceForm.status} onChange={(e) => this.setState({serviceForm:{...this.state.serviceForm , status:e.target.value}})}custom>
                <option value="">select</option>
                <option>true</option>
                <option>false</option>
                </Form.Control>
              </div>  
              </Form.Group>
              <Form.Group>
              <div className="form-group focused">
                <label className="form-control-label" htmlFor="input-serviceName">Service Image</label>
                <Form.Control 
                type="file" size="md"
                id="custom-file"
                label="select service img file"
                onChange={(e) => this.setState({serviceForm:{...this.state.serviceForm , serviceImage: e.target.files[0]}})}
                />
                </div>  
              </Form.Group>
            <Form.Group>
              <div className="form-group focused">
                <Button variant="primary btn-sm" type="submit"  >Submit</Button>    
              </div>  
            </Form.Group>
            </Form>
         </Modal>
         }

       {this.state.editmodal &&  <Modal  closeModal={() => {this.setState({editmodal:false,serviceForm:{...this.state.serviceForm , status:"",serviceName:"",serviceImage:null,serviceId:null}})}} >
          <Form  onSubmit={ServiceEditform} encType="multipart/form-data">
          <Form.Group >
          <div className="form-group focused">
          <label className="form-control-label" htmlFor="input-serviceName">Service Name</label>
          <input type="text" id="input-serviceName"  className="form-control form-control-alternative" placeholder="Service Name"   value={this.state.serviceForm.serviceName}   onChange={(e) => this.setState({serviceForm:{...this.state.serviceForm , serviceName:e.target.value}})} />
          </div>  
          </Form.Group>
          <Form.Group >
          <Form.Label>Status</Form.Label>
          <Form.Control as="select" size="md" value={this.state.serviceForm.status} onChange={(e) => this.setState({serviceForm:{...this.state.serviceForm , status:e.target.value}})}custom>
         <option value="">select</option>
          <option>true</option>
          <option>false</option>
          </Form.Control>
          </Form.Group>
        <Form.Group>
        <Form.File 
        id="custom-file"
        label="select service img file"
         
        onChange={(e) => this.setState({serviceForm:{...this.state.serviceForm , serviceImage:e.target.files[0]}})}
        />
        </Form.Group>
          <Button variant="primary btn-sm" type="submit"  >Submit</Button>    
          </Form>
         </Modal>
         }
         
          <div><Button varient="btn-primary btn-sm" onClick={() => this.setState({showModal:true})} >ADD</Button></div>
          <div className="admin-service">
          {this.state.services.length <= 0 ? <div>Loading Data </div> : false }
          {this.state.services.length !== 0 &&
          this.state.services.map((data,index) => 
          (
            <ServiceCard data={data} key={index}/>
          ))}
          
          </div>
          </div>
    }
          </>
        )
    }
}
