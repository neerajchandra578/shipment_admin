import React ,{Component} from 'react';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'
import moment from 'moment';

class TransListComponent extends Component {


    componentDidMount(){
          let userName = AuthenticationService.getLoggedinUserName()
          UserDataService.getTransByTripId(this.state.id).
         then( response => {

            console.log(`res  ${response.data}`)
            
             this.setState({
                 todos : response.data
             })
         })
    }


    constructor(props){
        super(props)

        this.state = {
            id : this.props.match.params.id,
            todos : [],
            message : null
        }


    }



    render(){
        return (
            <div style = {{background : "#ffffff", height:"100%"}} className="todolist">
            <h1> List of Transactions </h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th> ID </th>
                        <th> Source </th>
                        <th> Destination </th>
                        <th> Amount </th>
                        <th> Paid Mode </th>
                        <th> Luggage Weight </th>
                        <th> Load / Unload </th>
                        <th> UserName </th>
                        <th> Vechile Name </th>
                        <th> Vendor Name </th>
                        <th> Vechile Reg </th>
                    </tr>
                </thead>
                <tbody>

                {
                    this.state.todos.map (
                        todo => 
                            <tr key={todo.id}>
                        <td> {todo.id} </td>
                        <td> {todo.tripId.sourcePlace} </td>
                        <td> {todo.tripId.destinationPlace} </td>
                        <td style={{"backgroundColor": `${todo.debitCreditType == "Credit" ? '#66bb6a' : '#ef5350'}`}} ><b>{todo.debitCreditType == "Credit"?"+":"-"}  {todo.amount.toString()} </b></td>
                        <td> {todo.amountPaidMode} </td>
                        <td> {todo.luggageUnloadedWeight} </td>
                        <td> {todo.loadUnloadType} </td>
                        <td> {todo.tripId.userId.userName} </td>
                        <td> {todo.tripId.vechileId.vechileName} </td>
                        <td> {todo.vendorName==null?todo.vendor.vendorName:todo.vendorName}</td>
                        <td> {todo.tripId.vechileId.vechileRegNumber} </td>
                                           
                        </tr>
                        
                    )
                }

                </tbody>
            </table>
             </div>
  
            </div>
        )
    }
}

export default TransListComponent