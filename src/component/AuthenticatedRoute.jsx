

import React ,{Component} from 'react';

import AuthenticationService from '../api/auth/AuthenticationService.js';
import {Route,Redirect} from 'react-router-dom';

class AuthenticatedRoute extends Component{
     
     render(){
        
         if(AuthenticationService.isUserLoggedin()){
            return <Route {...this.props}/>
         }else {
            return <Redirect to=  "/login"></Redirect>
         }
         
     }

}

export default AuthenticatedRoute