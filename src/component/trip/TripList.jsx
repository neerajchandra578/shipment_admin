import React ,{Component} from 'react';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'
import moment from 'moment';

class TripList extends Component {


    componentDidMount(){
          let userName = AuthenticationService.getLoggedinUserName()
          UserDataService.getAllTrips().
         then( response => {

            
             this.setState({
                 todos : response.data
             })
         })
    }

    refreshTrip(){
        let userName = AuthenticationService.getLoggedinUserName()
        UserDataService.getAllTrips().
        then( response => {

           console.log(`res of  ${response.data}`)
            this.setState({
                todos : response.data
            })
        })
    }

    constructor(props){
        super(props)

        this.state = {
            todos : [],
            message : null
        }

        this.deleteTripById = this.deleteTripById.bind(this);
        this.refreshTrip = this.refreshTrip.bind(this);
        this.createTrip = this.createTrip.bind(this);
        this.checkTransById = this.checkTransById.bind(this);
        this.endById = this.endById.bind(this);
    }

    deleteTripById(id){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.deleteTrip(id).
        then( response => {

           console.log(`res of  ${response.data}`)
           this.refreshTrip()
            this.setState({
                message : `Trip with id ${id} has been deleted successfully`
            })
        }) 
    }

    endById(id){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.endTrip(id).
        then( response => {

           console.log(`res of  ${response.data}`)
           this.refreshTrip()
            this.setState({
                message : `Trip with id ${id} has been ended successfully`
            })
        }) 
    }

    createTrip(){
        this.props.history.push(`/trip/${-1}`)
    }

    updateTripById(id){
         
        this.props.history.push(`/trip/${id}`)
    }

    checkTransById(id){
        this.props.history.push(`/transList/${id}`)
    }


    render(){
        return (
            <div style = {{background : "#ffffff", height:"100%"}} className="todolist">
            <h1> List of Trips </h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th> ID </th>
                        <th> Source </th>
                        <th> Destination </th>
                        <th> Weight At Start </th>
                        <th> Current Weight </th>
                        <th> Total Amount </th>
                        <th> Created On </th>
                        <th> Last Updated </th>
                        <th> Transactions</th>
                        <th> Update </th>
                        <th> Delete </th>
                        <th> Trip Actions</th>
                    </tr>
                </thead>
                <tbody>

                {
                    this.state.todos.map (
                        todo => 
                            <tr key={todo.tripId}>
                        <td> {todo.tripId} </td>
                        <td> {todo.sourcePlace} </td>
                        <td> {todo.destinationPlace} </td>
                        <td> {todo.loadedParcelWeight.toString()} </td>
                        <td> {todo.currentWeight.toString()} </td>
                        <td> {todo.totalAmount.toString()} </td>
                        <td> {moment(todo.createdAt).format('YYYY-MM-DD HH:mm:ss')} </td>
                        <td> {moment(todo.updatedAt).format('YYYY-MM-DD HH:mm:ss')} </td>
                        <td> <button className="btn btn-link" onClick={() => this.checkTransById(todo.tripId)}>Check Transactions</button> </td>
                        <td> <button className="btn btn-success" onClick={() => this.updateTripById(todo.tripId)}>Update</button> </td>
                        <td> <button className="btn btn-warning" onClick={() => this.deleteTripById(todo.tripId)}>Delete</button> </td>
                       {todo.active && <td> <button className="btn btn-danger" onClick={() => this.endById(todo.tripId)}>End Trip</button> </td>}
                       {!todo.active && <td style={({color:'#66bb6a'})}> <b>Trip Completed</b> </td>}
                        
                        </tr>
                        
                    )
                }

                </tbody>
            </table>
             <button className="btn btn-success" onClick={ this.createTrip}> Add Trip</button>
  
             </div>
  
            </div>
        )
    }
}

export default TripList