import React, {Component} from 'react';
import moment, { months } from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'

class VendorComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            vendorName : '',
            vendorAddress : ''
        }

        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.validateForm = this.validateForm.bind(this)
       // this.getTodById = this.getTodById.bind(this)
    }


    componentDidMount(){
        
        if(this.state.id == -1){
            return;
        }



        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.getVendorById(this.state.id)
        .then(
             response => {
                this.setState({
                    vendorName : response.data.vendorName,
                    vendorAddress : response.data.vendorAddress,
                })
            }
        )
    }

    getTodByIds(id){
        
    }


    onSubmitForm(values){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        var blockedStatus = "0"
        if(values.usr_block == "ub_yes"){
            blockedStatus = "1"
        } 
        
        if(this.state.id == -1){
            console.log("Inside Crt")
            UserDataService.createVendor(
                {
                    vendorName : values.vendorName,
                    vendorAddress : values.vendorAddress,
                }).then(
                    response => {
                        this.props.history.push('/vendorlist')
                    }
                )
        }else{
            UserDataService.updateVendorDetails(this.state.id,
                {
                    id : this.state.id,
                    vendorName : values.vendorName,
                    vendorAddress : values.vendorAddress,

                }).then(
                    response => {
                        this.props.history.push('/vendorlist')
                    }
                )
        }


        console.log(values)

    
    }
    validateForm(values){
        console.log(values)
        let errors = {}
         if(!values.vendorName){
             errors.vendorName = "Please enter Name"
         }else if (values.vendorAddress.length <5){
             errors.vendorAddress = "Please enter atleast 5 char address"
         }


        return errors;
    }

    render(){

        let vechileNameInitaliVal = this.state.vendorName
        let vechileRegNumberInitaliVal = this.state.vendorAddress
         


        return( 
        <div>
             <h2> &nbsp;&nbsp;New Vendor Form </h2>
             <div className="container">
             <Formik 
                initialValues = { 
                    {
                        vendorName : vechileNameInitaliVal,
                        vendorAddress : vechileRegNumberInitaliVal,
                     }}
                onSubmit = {this.onSubmitForm}
                validate = {this.validateForm}

                validateOnBlur = {false}
                validateOnChange = {false}
                enableReinitialize = {true}

                 
                 >
                 {
                     (props) => (
                         <Form >
                             <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="vendorName"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="vendorAddress"/>


                             <fieldset className="form-group">
                                 <label>Name</label>
                                 <Field className="form-control" type="text" name="vendorName"></Field>
                              </fieldset>   

                              <fieldset className="form-group">
                                 <label>Address No</label>
                                 <Field className="form-control" type="text" name="vendorAddress"

                                 ></Field>
                              </fieldset>  

                              <button className="btn btn-success" type="submit" name="submt"
                              style={{ marginTop: "15px" }}>Save</button>

                         </Form>
                     )
                 }
             </Formik>
             </div>    
        </div>)
               
    }

}

export default VendorComponent

