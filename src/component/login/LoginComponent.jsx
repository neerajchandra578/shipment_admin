import React, {Component} from "react";
import PreLoginService from '../../api/prelogin/PreloginService.js'
import AuthenticationService from '../../api/auth/AuthenticationService.js'

class LoginComponent extends Component{



    componentDidMount(){

  }


    constructor(props){
        super(props)
        this.state = {
            statusCode : '',
            statusMsg : '',
            userNameVal : '',
            passVal : '',
            showLoginSuccess : false,
            showInvalidLogin : false,
        }



        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordValueChange = this.handlePasswordValueChange.bind(this);
        this.onLoginClicked = this.onLoginClicked.bind(this);
    }

    handleUserNameChange(event){
        this.setState({ userNameVal: event.target.value})
    }

    handlePasswordValueChange(event){
        this.setState({ passVal: event.target.value})
    }

    onLoginClicked(){


        if(this.state.userNameVal === "admin" && this.state.passVal === "admin"){
            AuthenticationService.registerSuccessfulLoginWithJwt(this.state.userNameVal,"234324sfdsfsdf");
          //  this.props.history.push(`/welcome/${this.state.userNameVal}`)
            this.props.history.push(`/welcome/admin`)            
        }

    }




        render() {
            return (

                <div className="outer" style={{ margin: "55px" ,align : "center"  }}>
                <div className="inner">
                 <form>
    
                    <h3>Log in {this.props.match.params.app_code}
                    
                    </h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" 
                        name="username"
                        value={this.state.userNameVal} 
                        onChange = {this.handleUserNameChange}/>
                    </div>
    
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password"
                         name = "pass" 
                         value ={this.state.passVal}
                         onChange = {this.handlePasswordValueChange} />
                    </div>
    
                  
                   <button type="submit" className="btn btn-dark btn-lg btn-block"
                    style={{ marginTop: "15px" ,align : "center" ,textAlign: "center" }}
                    onClick={this.onLoginClicked}
                   >Login</button> 
                
                </form>
               

                {this.state.statusCode == "01" && <h4>Please check with Admin for error code :- APPNP-31234</h4>}
                </div>
                </div>
            
            );
    }

}

export default LoginComponent;