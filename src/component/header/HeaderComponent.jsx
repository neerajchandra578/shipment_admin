import React ,{Component} from 'react';
import  { BrowserRouter as Router , Route,Switch, Link} from 'react-router-dom' 
//import 'bootstrap/dist/css/bootstrap.css';

import AuthenticationService from '../../api/auth/AuthenticationService.js'
import { withRouter } from 'react-router';


class HeaderComponent extends Component {
    render(){

         const isUserLoggedIn = AuthenticationService.isUserLoggedin();
         console.log(isUserLoggedIn)
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                    <div className="navbar-brand"><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shipment </a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li ><Link className="nav-link" to = "/welcome/admin">Home</Link> </li>}
                        {isUserLoggedIn && <li ><Link className="nav-link" to = "/userList">List Of Users</Link></li>} 

                        {isUserLoggedIn && <li ><Link className="nav-link" to = "/vechileList">Vechile</Link></li>} 
                        {isUserLoggedIn && <li ><Link className="nav-link" to = "/vendorList">Vendor</Link></li>} 
                        {isUserLoggedIn && <li ><Link className="nav-link" to = "/tripList">Trip</Link></li>} 
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end" >
                        {!isUserLoggedIn && <li ><Link className="nav-link" to = "/login">Login &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></li>}
                        {isUserLoggedIn && <li ><Link className="nav-link" to = "/logout" onClick={AuthenticationService.logout}>Logout&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></li>}
                    </ul>
                 </nav>   
            </header>
        )
    }
}

export default withRouter(HeaderComponent)
