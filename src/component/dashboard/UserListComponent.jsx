import React ,{Component} from 'react';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'
import moment from 'moment';

class UserListComponent extends Component {


    componentDidMount(){
          let userName = AuthenticationService.getLoggedinUserName()
          UserDataService.getAllUsers().
         then( response => {

            console.log(`res of getAll Users ${response.data}`)
            
             this.setState({
                 todos : response.data
             })
         })
    }

    refreshUser(){
        let userName = AuthenticationService.getLoggedinUserName()
        UserDataService.getAllUsers().
        then( response => {

           console.log(`res of gettodo ${response.data}`)
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

        this.deleteUserById = this.deleteUserById.bind(this);
        this.refreshUser = this.refreshUser.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    deleteUserById(id){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.deleteUser(id).
        then( response => {

           console.log(`res of getUsers ${response.data}`)
           this.refreshUser()
            this.setState({
                message : `User with id ${id} has been deleted successfully`
            })
        }) 
    }

    createUser(){
        this.props.history.push(`/user/${-1}`)
    }

    updateUserById(id){
         
        this.props.history.push(`/user/${id}`)
    }


    render(){
        return (
            <div style = {{background : "#ffffff", height:"100%"}} className="todolist">
            <h1 style={({textAlign:'center', marginTop: '20px',marginBottom:'20px'})}> List of Users </h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th> ID </th>
                        <th> User Name </th>
                        <th> Email </th>
                        <th> Status </th>
                        <th> Created Date </th>
                        <th> Mobile </th>
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
                        <td> {todo.userName} </td>
                        <td> {todo.emailId} </td>
                        <td> {todo.active ? "On Trip":"Availble"}</td>
                        <td> {moment(todo.createdAt).format('YYYY-MM-DD')} </td>
                        <td> {todo.mobileNo.toString()} </td>
                        <td> <button className="btn btn-success" onClick={() => this.updateUserById(todo.id)}>Update</button> </td>
                        <td> <button className="btn btn-warning" onClick={() => this.deleteUserById(todo.id)}>Delete</button> </td>
                        
                        </tr>
                        
                    )
                }

                </tbody>
            </table>
             <button className="btn btn-success" onClick={ this.createUser}> Add New User </button>
          

             </div>
  
            </div>
        )
    }
}

export default UserListComponent