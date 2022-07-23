import React ,{Component} from 'react';
import  { BrowserRouter as Router , Route,Switch, Link} from 'react-router-dom' 
import UserDataService from '../../api/postlogin/UserDataService.js';


class DashboardComponent extends Component {

    constructor(props){
        super(props)


        this.state = {
            welcomeServerRes : '',
            dashRes : '',
        }
    }

    
    componentDidMount(){

      UserDataService.getDashboardView().
     then( response => {        
         this.setState({
          dashRes : response.data
         })
     })
}

   

    render(){
        return (
        
        <div style={ ({ margin: '0.8rem' }) }>
           <div className="row">
  <div  className="col-3"  >

    <div className="card" style={ ( {backgroundColor : '#007bff',color: '#FFF'})} >

      <div className="card-body">

        <h5 className="card-title" style={({position: 'lett',right: '35px',top: '45px',fontStyle: 'italic',textTransform: 'capitalize',opacity: 0.9,display: 'block',fontSize: '18px'  })}>Total Users </h5>
        <span class="count-numbers" style={({  position: 'absolute', right: '35px',top: '-10px',bottom:'10px',fontSize: '12px',display: 'block',fontSize: '5em',opacity: 0.8 })}>{this.state.dashRes.totalUsers}</span>
        <a href="/userList"  style={ ( {backgroundColor : '#007bff',color: '#FFF'})}>List of Users</a>
        <p></p>
        <p></p>
      </div>
    </div>

  </div>

  <div  className="col-3">
    <div className="card" style={ ( {backgroundColor : '#ef5350',color: '#FFF'})}>
      <div className="card-body">
        <h5 className="card-title" style={({position: 'lett',right: '35px',top: '45px',fontStyle: 'italic',textTransform: 'capitalize',opacity: 0.9,display: 'block',fontSize: '18px'  })}>Total Vechile </h5>
        <span class="count-numbers" style={({  position: 'absolute', right: '35px',top: '-10px',bottom:'10px',fontSize: '12px',display: 'block',fontSize: '5em',opacity: 0.8 })}>{this.state.dashRes.totalVechiles}</span>
        <a href="/vechileList"  style={ ( {backgroundColor : '#ef5350',color: '#FFF'})}>List of Vechiles</a>
        <p></p>
        <p></p>
      </div>
    </div>
  </div>

  <div   className="col-3">
    <div className="card" style={ ( {backgroundColor : '#66bb6a',color: '#FFF'})}>
      <div className="card-body">
        <h5 className="card-title" style={({position: 'lett',right: '35px',top: '45px',fontStyle: 'italic',textTransform: 'capitalize',opacity: 0.9,display: 'block',fontSize: '18px'  })}>Total Trips </h5>
        <span class="count-numbers" style={({  position: 'absolute', right: '35px',top: '-10px',bottom:'10px',fontSize: '12px',display: 'block',fontSize: '5em',opacity: 0.8 })}>{this.state.dashRes.totalTrips}</span>
        <a href="/tripList"  style={ ( {backgroundColor : '#66bb6a',color: '#fff'})}>List Of Trips</a>
        <p></p>
        <p></p>
      </div>
    </div>
  </div>

  <div   className="col-3">
    <div className="card" style={ ( {backgroundColor : '#26c6da',color: '#FFF'})}>
      <div className="card-body">
        <h5 className="card-title" style={({position: 'lett',right: '35px',top: '45px',fontStyle: 'italic',textTransform: 'capitalize',opacity: 0.9,display: 'block',fontSize: '18px'  })}>Total Vendors </h5>
       
        <span class="count-numbers" style={({  position: 'absolute', right: '35px',top: '-10px',bottom:'10px',fontSize: '12px',display: 'block',fontSize: '5em',opacity: 0.8 })}>{this.state.dashRes.totalVendors}</span>
        <a href="/vendorList"  style={ ( {backgroundColor : '#26c6da',color: '#fff'})}>List Of Vendors</a>
        <p></p>
        <p></p>
      </div>
    </div>
  </div>

</div>






           </div>
        )
        

    }
}

export default DashboardComponent