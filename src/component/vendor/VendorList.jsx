import React ,{Component} from 'react';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'
import moment from 'moment';

class VendorList extends Component {


    componentDidMount(){
          let userName = AuthenticationService.getLoggedinUserName()
          UserDataService.getAllVendors().
         then( response => {

            console.log(`res  ${response.data}`)
            
             this.setState({
                 todos : response.data
             })
         })
    }

    refreshVendor(){
        let userName = AuthenticationService.getLoggedinUserName()
        UserDataService.getAllVendors().
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

        this.deleteVendorById = this.deleteVendorById.bind(this);
        this.refreshVendor = this.refreshVendor.bind(this);
        this.createVendor = this.createVendor.bind(this);
    }

    deleteVendorById(id){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.deleteVendor(id).
        then( response => {

           console.log(`res of gettodo ${response.data}`)
           this.refreshTodo()
            this.setState({
                message : `User with id ${id} has been deleted successfully`
            })
        }) 
    }

    createVendor(){
        this.props.history.push(`/vendor/${-1}`)
    }

    updateVendorById(id){
         
        this.props.history.push(`/vendor/${id}`)
    }


    render(){
        return (
            <div style = {{background : "#ffffff", height:"100%"}} className="todolist">
            <h1> List of Vendors </h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Address </th>
                        <th> Update </th>
                        <th> Delete </th>
                    </tr>
                </thead>
                <tbody>

                {
                    this.state.todos.map (
                        todo => 
                            <tr key={todo.id}>
                        <td> {todo.id} </td>
                        <td> {todo.vendorName} </td>
                        <td> {todo.vendorAddress} </td>
                        <td> <button className="btn btn-success" onClick={() => this.updateVendorById(todo.id)}>Update</button> </td>
                        <td> <button className="btn btn-warning" onClick={() => this.deleteVendorById(todo.id)}>Delete</button> </td>
                        
                        </tr>
                        
                    )
                }

                </tbody>
            </table>
             <button className="btn btn-success" onClick={ this.createVendor}> Add New Vendor </button>
            
             </div>
  
            </div>
        )
    }
}

export default VendorList