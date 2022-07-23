import React, {Component} from 'react';
import moment, { months } from 'moment';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'

class VechileComponent extends Component{

    constructor(props){
        super(props);
        this.state = {
            id : this.props.match.params.id,
            vechileName : '',
            vechileRegNumber : '',
            isActive : false
        }

        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.validateForm = this.validateForm.bind(this)

    }


    componentDidMount(){
        
        if(this.state.id == -1){
            return;
        }

        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.getVechileById(this.state.id)
        .then(
             response => {
                this.setState({
                    vechileName : response.data.vechileName,
                    vechileRegNumber : response.data.vechileRegNumber,
                    isActive: response.data.active
                })
            }
        )
    }

    getTodByIds(id){
        
    }


    onSubmitForm(values){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        
        
        if(this.state.id == -1){
            UserDataService.createVechile(
                {
                    vechileName : values.vechileNam,
                    vechileRegNumber : values.vechileRegNumb,
                    isActive : false
                }).then(
                    response => {
                        this.props.history.push('/vechileList')
                    }
                )
        }else{
            UserDataService.updateVechileDetails(this.state.id,
                {
                    id : this.state.id,
                    vechileName : values.vechileNam,
                    vechileRegNumber : values.vechileRegNumb,
                    isActive: this.state.isActive

                }).then(
                    response => {
                        this.props.history.push('/vechileList')
                    }
                )
        }


        console.log(values)

    
    }
    validateForm(values){
        console.log(values)
        let errors = {}
         if(!values.vechileNam){
             errors.vechileNam = "Please enter Vechile Name"
         }else if (values.vechileRegNumb.length <2){
             errors.vechileRegNumb = "Please enter atleast 2 char for Number"
         }

        // if(!moment(values.targetDate).isValid()){
        //     errors.targetDate = "Please enter target Date" 
        // }

        return errors;
    }

    render(){

        let vechileNameInitaliVal = this.state.vechileName
        let vechileRegNumberInitaliVal = this.state.vechileRegNumber
         
    


        return( 
        <div>
             <h2> &nbsp;&nbsp;Create New Vechile Form </h2>
             <div className="container">
             <Formik 
                initialValues = { 
                    {
                        vechileNam : vechileNameInitaliVal,
                        vechileRegNumb : vechileRegNumberInitaliVal,
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
                              component="div" name="vechileNam"/>

                            <ErrorMessage
                              className="alert alert-warning"
                              component="div" name="vechileRegNumb"/>


                             <fieldset className="form-group">
                                 <label>Name</label>
                                 <Field className="form-control" type="text" name="vechileNam"></Field>
                              </fieldset>   

                              <fieldset className="form-group">
                                 <label>Registration No</label>
                                 <Field className="form-control" type="text" name="vechileRegNumb"
                                 ></Field>
                              </fieldset>  

                              {this.state.id != -1 &&    <fieldset className="form-group">
                                 <label>Availability</label>
                                 <Field className="form-control"  readonly='true' name ="avl" value={this.state.isActive?"On Trip":"Available"}></Field>
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

export default VechileComponent

