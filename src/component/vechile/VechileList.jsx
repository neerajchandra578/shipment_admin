import React ,{Component} from 'react';
import UserDataService from '../../api/postlogin/UserDataService.js';
import AuthenticationService from '../../api/auth/AuthenticationService.js'
import moment from 'moment';

class VechileList extends Component {


    componentDidMount(){
          let userName = AuthenticationService.getLoggedinUserName()
          UserDataService.getAllVechiles().
         then( response => {

            console.log(`res ${response.data}`)
            
             this.setState({
                 todos : response.data
             })
         })
    }

    refreshVechile(){
        let userName = AuthenticationService.getLoggedinUserName()
        UserDataService.getAllVechiles().
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
            todos : [],
            message : null
        }

        this.deleteVechileById = this.deleteVechileById.bind(this);
        this.refreshVechile = this.refreshVechile.bind(this);
        this.createVechile = this.createVechile.bind(this);
    }

    deleteVechileById(id){
        let loggedinUserName = AuthenticationService.getLoggedinUserName()
        UserDataService.deleteVechile(id).
        then( response => {

           console.log(`res of  ${response.data}`)
           this.refreshVechile()
            this.setState({
                message : `Vechile with id ${id} has been deleted successfully`
            })
        }) 
    }

    createVechile(){
        this.props.history.push(`/vechile/${-1}`)
    }

    updateVechileById(id){
         
        this.props.history.push(`/vechile/${id}`)
    }


    render(){
        return (
            <div style = {{background : "#ffffff", height:"100%"}} className="todolist">
            <h1> List of Vechiles </h1>
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <div className="container">
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Reg Number </th>
                        <th> Status </th>
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
                        <td> {todo.vechileName} </td>
                        <td> {todo.vechileRegNumber} </td>
                        <td> {todo.active ? "On Trip":"Availble"}</td>
                        <td> <button className="btn btn-success" onClick={() => this.updateVechileById(todo.id)}>Update</button> </td>
                        <td> <button className="btn btn-warning" onClick={() => this.deleteVechileById(todo.id)}>Delete</button> </td>
                        
                        </tr>
                        
                    )
                }

                </tbody>
            </table>
             <button className="btn btn-success" onClick={ this.createVechile}> Add New Vechile</button>
            
             </div>
  
            </div>
        )
    }
}

export default VechileList