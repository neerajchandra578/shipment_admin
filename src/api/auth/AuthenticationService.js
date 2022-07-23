import axios from "axios"

export const AUTHENTICATED_USER_KEY = 'authenticatedUser'

class AuthenticationService {


    exceuteBasicAuth(userName,password){
        let basicAuthHeader = 'Basic '+ window.btoa(userName +":"+password)
        return axios.get('http://localhost:8080/basicAuth',
        {
            headers : {
                authorization : basicAuthHeader
              } 
        })
    }

    exceuteMyJwtAuth(userName,password){
        let basicAuthHeader = 'Basic '+ window.btoa(userName +":"+password)
        return axios.get('http://localhost:8080/authenticat',
        {
            headers : {
                authorization : basicAuthHeader
              } 
        })
    }

    //

    exceuteJwtAuth(username,password){
        let basicAuthHeader = 'Basic '+ window.btoa(username +":"+password)
        return axios.post('http://localhost:8080/authenticate',
        {
            username,
            password
        })
    }
 
    registerSuccessfulLogin(username,password){
        let basicAuthHeader = 'Basic '+ window.btoa(username +":"+password)
        sessionStorage.setItem(AUTHENTICATED_USER_KEY,username)
        this.setUpAxiosInterceptor(basicAuthHeader)
    }

    registerSuccessfulLoginWithJwt(username,token){
                let basicAuthHeader = 'Bearer '+ token
                sessionStorage.setItem('authenticatedUser',username)
                this.setUpAxiosInterceptor(basicAuthHeader)
            }

    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedin(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return false 
        else return true
        
    }

    getLoggedinUserName(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return '' 
        else return user
        
    }

    setUpAxiosInterceptor(basicAuthHeader){
        axios.interceptors.request.use(
             (config) => {
                  if(this.isUserLoggedin()){
                  config.headers.authorization = basicAuthHeader
                  }
                  return config
             }
        )
    }

     
}
export default new AuthenticationService