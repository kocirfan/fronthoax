import * as ACTIONS from './Constans';
import { login, signup} from '../api/apiCalls';

export const logoutSuccess = () =>{
    return {
        type: ACTIONS.LOGOUT_SUCCESS
    };
}

export const loginSuccess = (authState) =>{
    return {
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    };
}

//login aksiyon
export const loginHandler = (credentials) => {
   //login request atıyoruz
     return async function(dispatch) {
        const response =  await login(credentials);
        const authState = {
          ...response.data,
          password: credentials.password
        };
        //redux state login güncelliyoruz
        dispatch(loginSuccess(authState)); 
        return response;
    }
}

//signup aksiyon
// signup ardından loginhandler koş
export const  signupHandler = (user) =>{
    return async function (dispatch) {
        const response = await signup(user);
        await dispatch(loginHandler(user))
        return response;
    }
}