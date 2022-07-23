import axios from "axios";

//for Loacal Host
//export const SERVER_IP_ADDRESS = 'localhost'
//for aws
export const SERVER_IP_ADDRESS = '3.16.158.189'

class UserDataService {

    

    getTransByTripId(tripId){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/transactions/trip/${tripId}`);
    }

    getAllUsers(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/users`);
    }
    getAvailableUsers(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/users/available`);
    }

    getUserById(userId){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/users/${userId}`);
    }

    createUser(userData){

        return  axios({
            method: 'post',
            url: `http://${SERVER_IP_ADDRESS}:8080/users`,
            headers: {}, 
            data:  userData, 
            
          });
    }

    updateUserDetails(userId,userData){
        return axios.put(`http://${SERVER_IP_ADDRESS}:8080/users/${userId}`,userData);
    }

    deleteUser(userId){
        return axios.delete(`http://${SERVER_IP_ADDRESS}:8080/users/${userId}`);
    }


    getAllVechiles(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/vechiles`);
    }

    getAllAvailableVechiles(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/vechiles/available`);
    }

    getVechileById(userId){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/vechiles/${userId}`);
    }

    createVechile(userData){

        return  axios({
            method: 'post',
            url: `http://${SERVER_IP_ADDRESS}:8080/vechiles`,
            headers: {}, 
            data:  userData, 
            
          });
    }

    updateVechileDetails(userId,userData){
        return axios.put(`http://${SERVER_IP_ADDRESS}:8080/vechiles/${userId}`,userData);
    }

    deleteVechile(userId){
        return axios.delete(`http://${SERVER_IP_ADDRESS}:8080/vechiles/${userId}`);
    }



    getAllVendors(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/vendorList`);
    }

    getVendorById(userId){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/vendor/${userId}`);
    }

    createVendor(userData){

        return  axios({
            method: 'post',
            url: `http://${SERVER_IP_ADDRESS}:8080/vendor`,
            headers: {}, 
            data:  userData, 
            
          });
    }

    updateVendorDetails(userId,userData){
        return axios.put(`http://${SERVER_IP_ADDRESS}:8080/vendor/${userId}`,userData);
    }

    deleteVendor(userId){
        return axios.delete(`http://${SERVER_IP_ADDRESS}:8080/vendor/${userId}`);
    }


    getAllTrips(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/trips`);
    }

    getTripById(userId){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/trips/${userId}`);
    }

    createTrip(userData){
        return  axios({
            method: 'post',
            url: `http://${SERVER_IP_ADDRESS}:8080/trip/mob`,
            headers: {}, 
            data:  userData, 
            
          });
    }

    updateTripDetails(userId,userData){
        return axios.put(`http://${SERVER_IP_ADDRESS}:8080/trips/update/${userId}`,userData);
    }

    deleteTrip(userId){
        return axios.delete(`http://${SERVER_IP_ADDRESS}:8080/trips/delete/${userId}`);
    }

    endTrip(userId){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/trips/endTrip/${userId}`);
    }



    getDashboardView(){
        return axios.get(`http://${SERVER_IP_ADDRESS}:8080/dashview`);
    }

}

export default new UserDataService