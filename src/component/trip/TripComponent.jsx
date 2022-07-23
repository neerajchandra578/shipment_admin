import React, {Component} from 'react';
import moment, { months } from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'

class TripComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            createdAtDate : moment(new Date()).format('YYYY-MM-DD'),
            splace : '',
            dplace : '',
            pweight : '',
            userId : '',
            vechileId : '',
            availUsers : [],
            availVechiles : [],
            preSelectedUser: '',
            preSelectedVechile : '',
            selectVechileError : false,
            selectUserError : false,
        }

        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.validateForm = this.validateForm.bind(this)
        this.selectUser = this.selectUser.bind(this);
       // this.getTodById = this.getTodById.bind(this)
    }


    componentDidMount(){

        

        
        if(this.state.id == -1){
        
            UserDataService.getAvailableUsers().
            then( response => {           
                this.setState({
                    availUsers : response.data,
                    userId: response.data[0].id
                })
            })
    
            UserDataService.getAllAvailableVechiles().
            then( response => {           
                this.setState({
                    availVechiles : response.data,
                    vechileId: response.data[0].id
                })
            })
        
            return;
        }



        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.getTripById(this.state.id)
        .then(
             response => {
                this.setState({
                    createdAtDate : moment(response.data.createdAt).format('YYYY-MM-DD'),
                    sourcePlace : response.data.sourcePlace,
                    destinationPlace : response.data.destinationPlace,
                    parcelWeight : response.data.loadedParcelWeight,
                    assignedMobile : response.data.assignedMobileNo,
                    preSelectedUser : response.data.userId.userName,
                    preSelectedVechile : response.data.vechileId.vechileName+" - "+response.data.vechileId.vechileRegNumber,
                    isBlocked :  response.data.isBlocked
                })

                console.log("UserName is ",this.state.preSelectedUser);
                
            }
        )
    }

    getTodByIds(id){
        
    }

    selectUser = (e) => {
        let idx = e.target.selectedIndex;
        
        let orgVal = e.target.value;
        this.setState({
            userId : orgVal,
            selectUserError : false
        })
        console.log('Selected User: ', idx);
        console.log('Selected ID: ', orgVal);

    }
    selectVechile = (e) => {
        let idx = e.target.selectedIndex;
        
        let orgVal = e.target.value;
        this.setState({
            vechileId : orgVal,
            selectVechileError : false
        })
        console.log('Selected Vechile: ', idx);
        console.log('Selected Vechile ID: ', orgVal);

    }

    onSubmitForm(values){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        var blockedStatus = "0"
        if(values.usr_block == "ub_yes"){
            blockedStatus = "1"
        } 
        
        if(this.state.id == -1){
            console.log("Inside Crt")
            UserDataService.createTrip(
                {
                    vechileId : this.state.vechileId,
                    sourcePlace : values.splace,
                    destinationPlace : values.dplace,
                    parcelWeight : values.pweight,
                    userId : this.state.userId
                    
                }).then(
                    response => {
                        this.props.history.push('/tripList')
                    }
                )
        }else{
            UserDataService.updateUserDetails(this.state.id,
                {
                    id : this.state.id,
                    userName : values.username,
                    userMobile : values.usermobile,
                    userEmail : values.useremail,
                    assignedMobile : values.assignedmob,
                    userPassword : values.userpass,
                    userBlocked : blockedStatus
                }).then(
                    response => {
                        this.props.history.push('/tripList')
                    }
                )
        }


        console.log(values)

    
    }
    validateForm(values){
        console.log(values)
        let errors = {}
         if(!values.splace){
             errors.splace = "Please enter Source Place"
         }
        else if(!values.dplace){
            errors.dplace = "Please enter Destination Place"
        }
       else if(!values.pweight){
            errors.pweight = "Please enter Weight"
        }
        else if(!this.state.vechileId){
            this.setState({
                selectVechileError : true
            })

        }
        else if(!this.state.userId){
            this.setState({
                selectUserError : true
            })

        }
        //

        return errors;
    }

    render(){

        let sourcePlaceInitaliVal = this.state.sourcePlace
        let destinationPlaceInitaliVal = this.state.destinationPlace
        let parcelWeightInitaliVal = this.state.parcelWeight

        let userPassInitaliVal = this.state.userPassword
        
        // var isBlockedIntlVal = "ub_no"
        // if(this.state.isBlocked == "1"){
        //     isBlockedIntlVal = "ub_yes"
        // }


        const { availUsers } = this.state;
        const { availVechiles } = this.state;

	let availUsersList = availUsers.length > 0
		&& availUsers.map((item, i) => {
          
		return (
			<option key={i} value={item.id}>{item.userName}</option>
		)
	}, this);

    

    let availVechileList = availVechiles.length > 0
    && availVechiles.map((item, i) => {
    
    return (
        <option key={i} value={item.id}>{item.vechileName+" - "+item.vechileRegNumber}</option>
    )
}, this);





        return( 
        <div>
             <h2> &nbsp;&nbsp;New User Form </h2>
             <div className="container">
             {this.state.selectVechileError && <div class="alert alert-danger" role="alert"> Please Select Available Vechile</div>}
             {this.state.selectUserError && <div class="alert alert-danger" role="alert"> Please Select Available User</div>}
             <Formik 
                initialValues = { 
                    {
                        splace : sourcePlaceInitaliVal,
                        dplace : destinationPlaceInitaliVal,
                        pweight : parcelWeightInitaliVal,
                     userpass : userPassInitaliVal,
                  //   usr_block : isBlockedIntlVal,

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
                              component="div" name="splace"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="dplace"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="pweight"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="sel_vechile"/>



                             <fieldset className="form-group">
                                 <label>Source Place</label>
                                 <Field className="form-control" type="text" name="splace"></Field>
                              </fieldset>   

                              <fieldset className="form-group">
                                 <label>Destinaton Place</label>
                                 <Field className="form-control" type="text" name="dplace"
                                  maxLength="10"
                                 ></Field>
                              </fieldset>  

                              <fieldset className="form-group">
                                 <label>Parcel Weight</label>
                                 <Field className="form-control" type="text" name="pweight"></Field>
                              </fieldset>  


                                {this.state.preSelectedUser != '' &&    <fieldset className="form-group">
                                 <label>Selected User</label>
                                 <Field className="form-control"  readonly='true' value={this.state.preSelectedUser}></Field>
                              </fieldset>} 
                       
                              {this.state.preSelectedUser == '' &&  <fieldset className="form-group">
                                 <label>Select User</label>
                                 <Field className="form-control" name="sel_user" as="select"    onChange={this.selectUser}>
                                    {availUsersList}
                                    </Field>

                              </fieldset>} 

                              {this.state.preSelectedVechile != '' &&    <fieldset className="form-group">
                                 <label>Selected Vechile</label>
                                 <Field className="form-control"  readonly='true' value={this.state.preSelectedVechile}></Field>
                              </fieldset>} 



                              {this.state.preSelectedVechile == '' &&   <fieldset className="form-group">
                                 <label>Select Vechile</label>
                                 <Field className="form-control" name="sel_vechile" as="select"    onChange={this.selectVechile}>
                                 {availVechileList}
                                    </Field>

                              </fieldset> }


              

                              {/* <fieldset style={{ marginTop: "15px" }} className="form-group">
                                 <label style={{ marginRight: "15px" }} >User Blocked </label>
                                 <Field as="select" name="usr_block" >
                                        <option value="ub_yes">Yes (Block)</option>
                                        <option value="ub_no">No </option>
                                </Field>
                              </fieldset>   */}

                              <button className="btn btn-success" type="submit" name="submt"
                              style={{ marginTop: "15px" , marginBottom: "35px" }}>Save</button>

                         </Form>
                     )
                 }
             </Formik>
             </div>    
        </div>)
               
    }

}

export default TripComponent

