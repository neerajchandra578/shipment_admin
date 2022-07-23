import React, {Component} from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginComponent from '../login/LoginComponent';
import LogoutComponent from '../login/LogoutComponent';

import DashboardComponent from '../dashboard/DashboardComponent';

import UserListComponent from '../dashboard/UserListComponent';

import UserComponent from '../dashboard/UserComponent';

import HeaderComponent from '../header/HeaderComponent';
import PageNotFoundComponent from '../PageNotFoundComponent';
import AuthenticatedRoute from '../AuthenticatedRoute';
import TripComponent from '../trip/TripComponent';
import TripList from '../trip/TripList';
import VechileComponent from '../vechile/VechileComponent';
import VechileList from '../vechile/VechileList';

import VendorComponent from '../vendor/VendorComponent';
import VendorList from '../vendor/VendorList';
import TransactionsList from '../transactions/TransactionsList';


class PreLoginHome extends Component{

    constructor(props){
        super(props)

    }


        render() {
            return (
            <Router>
            {/* <div className="App"> */}
              {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        
                <div className="container">
                  <Link className="navbar-brand" to={"/sign-in"}>Digita Serve  </Link>
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav> */}
              <>
                        <HeaderComponent/>
              {/* <div className="outer">
                <div className="inner"> */}
                  <Switch>
                    { <Route exact path='/' component={LoginComponent} /> }
                    <Route path="/login" component={LoginComponent} />

                    <Route path="/welcome/:name" component= {DashboardComponent}/>

          



                    <Route path="/userList" component= {UserListComponent}/>
                    
                    <Route path="/user/:id" component= {UserComponent}/>

                    <Route path="/vechileList" component= {VechileList}/>
                    <Route path="/vendorList" component= {VendorList}/>
                    <Route path="/tripList" component= {TripList}/>
                    
                    <Route path="/vechile/:id" component= {VechileComponent}/>
                    <Route path="/trip/:id" component= {TripComponent}/>
                    <Route path="/vendor/:id" component= {VendorComponent}/>

                    <Route path="/transList/:id" component= {TransactionsList}/>


                    {/* <AuthenticatedRoute path="/userList" component= {UserListComponent}/>
                    <AuthenticatedRoute path="/predList" component= {PredictionListComponent}/>
                    
                    <AuthenticatedRoute path="/user/:id" component= {UserComponent}/>
                    <AuthenticatedRoute path="/pred/:id" component= {PredictionComponent}/>

                    <AuthenticatedRoute path="/otherAppInfo" component= {OtherAppInfoComponent}/>
                    <AuthenticatedRoute path="/wpnoList" component= {WhatsAppNoList}/>
                    <AuthenticatedRoute path="/whatsno/:id" component= {WhatsAppNoComponent}/>
                    <AuthenticatedRoute path="/scheduleList" component= {ScheduleList}/>
                    <AuthenticatedRoute path="/schedul/:id" component= {ScheduleComponent}/> */}
                    

                <AuthenticatedRoute path="/logout" component= {LogoutComponent}/>
                    <Route component={PageNotFoundComponent} />
                  </Switch>
                {/* </div>
              </div> */}
              </>
            {/* </div> */}
            </Router>
                        );
    }

}

export default PreLoginHome;