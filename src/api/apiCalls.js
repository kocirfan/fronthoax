import axios from "axios";

export const signup = (body) =>{
    return axios.post('/api/1.0/users', body);
};

//Basic-Authentication
export const login = creds =>{
    return axios.post('/api/1.0/auth', {}, {auth: creds});
};

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
};

//user listele
// export const getUsers = () =>{
//     return axios.get('api/1.0/users');
// }

//pagination ile user listele-çek
export const getUsers = (page = 0, size = 3) =>{
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
};

// Login kullanıcıyı listeden çıkarmak
export const setAuthorizationHeader = ({username, password, isLoggedIn}) =>{
    if(isLoggedIn){
        const authorizationHeaderValue = `Basic ${btoa(username +':'+ password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    }else{
        delete axios.defaults.headers['Authorization'];
    }
   
};

//tekil kullanıcı
export const getUser = username =>{
    return axios.get(`/api/1.0/users/${username}`);
};

