import axios from "axios";


class PreloginService {

    
    checkAppExistance(appName){
        return axios.get(`http://localhost:8080/v1/${appName}/check_if_app_exists`);
    }


}

export default new PreloginService