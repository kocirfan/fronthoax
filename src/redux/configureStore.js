import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';
import { setAuthorizationHeader } from '../api/apiCalls';

// güvenlik için secureLs kullanıyoruz
const secureLS = new SecureLS();


//localStorage veriyi okuyoruz
const getStateFromStorage = () =>{
    /// veriyi doğrudan localstorage dan almak yerine secureLs in get motodu ile alıyoruz
    const hoaxAuth = secureLS.get('hoax-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined,
    }
    if(hoaxAuth) {
        return hoaxAuth; 
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLS.set('hoax-auth', newState);

}

const configureStore = () => {
    
   const initialState =  getStateFromStorage();
   setAuthorizationHeader(initialState);
   
    const store = createStore(authReducer, initialState, applyMiddleware(thunk));

    //local-storage veriyi yaz
    store.subscribe(()=>{
        updateStateInStorage(store.getState());
        setAuthorizationHeader(store.getState());
    })
    return store;
}


export default configureStore;