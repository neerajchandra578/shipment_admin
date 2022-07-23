import React, {Component} from 'react';
import moment, { months } from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'

class UserComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            createdAtDate : moment(new Date()).format('YYYY-MM-DD'),
            userName : '',
            userMobile : '',
            userEmail : '',
            fullName : '',
            userPassword : '',
            isBlocked : '',
            isActive : false,
        }

        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.validateForm = this.validateForm.bind(this)

    }


    componentDidMount(){
        
        if(this.state.id == -1){
            return;
        }



        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.getUserById(this.state.id)
        .then(
             response => {
                this.setState({
                    createdAtDate : moment(response.data.createdAt).format('YYYY-MM-DD'),
                    userEmail : response.data.emailId,
                    userName : response.data.userName,
                    userMobile : response.data.mobileNo,
                    fullName : response.data.fullName,
                    userPassword : response.data.password,
                    isBlocked :  response.data.isBlocked,
                    isActive: response.data.active,
                })
            }
        )
    }

    getTodByIds(id){
        
    }


    onSubmitForm(values){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        // var blockedStatus = "0"
        // if(values.usr_block == "ub_yes"){
        //     blockedStatus = "1"
        // } 
        
        if(this.state.id == -1){
                       UserDataService.createUser(
                {
//                    id : this.state.id,
                    userName : values.username,
                    fullName : values.username,
                    mobileNo : values.usermobile,
                    emailId : values.useremail,
                    fullName : values.fullName,
                     password : values.userpass,
                    // userBlocked : blockedStatus
                }).then(
                    response => {
                        this.props.history.push('/userlist')
                    }
                )
        }else{
            UserDataService.updateUserDetails(this.state.id,
                {
                    id : this.state.id,
                    userName : values.username,
                    fullName : values.username,
                    mobileNo : values.usermobile,
                    emailId : values.useremail,
                    fullName : values.fullName,
                     password : values.userpass,
                     isActive : this.state.isActive
                }).then(
                    response => {
                        this.props.history.push('/userlist')
                    }
                )
        }


        console.log(values)

    
    }
    validateForm(values){
        console.log(values)
        let errors = {}
         if(!values.username){
             errors.username = "Please enter UserName"
         }
       else if(!values.fullName){
            errors.fullName = "Please enter FullName"
        }
       else  if(!values.useremail){
            errors.useremail = "Please enter User Email"
        }
        else if(!values.userpass){
            errors.userpass = "Please enter userPassword"
        }
        else  if (values.usermobile.length <10){
             errors.commonError = "Please enter atleast 10 char for Mobile"
         }


        return errors;
    }

    render(){

        let userNameInitaliVal = this.state.userName
        let userMobileInitaliVal = this.state.userMobile
        let userEmailInitaliVal = this.state.userEmail
        let assignefullNameInitaliVal = this.state.fullName
        let userPassInitaliVal = this.state.userPassword
        
        return( 
        <div>
             <h2> &nbsp;&nbsp;New User Form </h2>
             <div className="container">
             <Formik 
                initialValues = { 
                    {
                     username : userNameInitaliVal,
                     usermobile : userMobileInitaliVal,
                     useremail : userEmailInitaliVal,
                     fullName : assignefullNameInitaliVal,
                     userpass : userPassInitaliVal,

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
                              component="div" name="username"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="fullName"/>

                             <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="usermobile"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="useremail"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="userpass"/>
                             
                             <fieldset className="form-group">
                                 <label>UserName</label>
                                 <Field className="form-control" type="text" name="username"></Field>
                              </fieldset>   

                              
                              <fieldset className="form-group">
                                 <label>Full Name </label>
                                 <Field className="form-control" type="text" name="fullName"></Field>
                              </fieldset> 

                              <fieldset className="form-group">
                                 <label>UserMobile</label>
                                 <Field className="form-control" type="number" name="usermobile"
                                  maxLength="10"
                                 ></Field>
                              </fieldset>  

                              <fieldset className="form-group">
                                 <label>UserEmail</label>
                                 <Field className="form-control" type="text" name="useremail"></Field>
                              </fieldset>  

                              <fieldset className="form-group">
                                 <label>UserPassword</label>
                                 <Field className="form-control" type="text" name="userpass"></Field>
                              </fieldset>  

                              {this.state.id != -1 &&    <fieldset className="form-group">
                                 <label>Availability</label>
                                 <Field className="form-control"  readonly='true' value={this.state.isActive?"On Trip":"Available"}></Field>
                              </fieldset>}


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

export default UserComponent

