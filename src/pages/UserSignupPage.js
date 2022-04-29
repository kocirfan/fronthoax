import React from "react";
import {signup, changeLanguage} from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation} from 'react-i18next';

//bir class Component- statefull

class UserSignupPage extends React.Component {
  //ovveride metot state
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false,
    errors: {}
  };

  onChange = (event) => {
    const { t } = this.props;
    const { name, value } = event.target; //object destruction
    const errors = {...this.state.errors} // errors objesinin kopyasını oluşturmak ...
    errors[name] = undefined;
    if(name === 'password' || name === 'passwordRepeat'){
      if(name === 'password' && value !== this.state.passwordRepeat){
        errors.passwordRepeat = t('Password mismatch');
      }else if(name === 'passwordRepeat' && value !== this.state.password){
        errors.passwordRepeat = t('Password mismatch');
      }else{
        errors.passwordRepeat = undefined;
      }
    }

    //event.target.value forma girilen değeri tutuyor
    // event.target.name formda ilgili alanı tutuyor

    this.setState({
      [name]: value, //[name]: value name ile value set ediliyor
      errors
    });
  };

  onClickSignup = async event => {
    event.preventDefault();

    const { username, displayName, password } = this.state; //object destruction

    const body = {
      //key-value aynı ise
      username,
      displayName,
      password,
    };
    this.setState({pendingApiCall: true});

    try{
        const response = await signup(body);
    }catch(error){
      if(error.response.data.validationErrors){
        this.setState({errors: error.response.data.validationErrors});
      }
    }

    this.setState({ pendingApiCall: false});
    // aktif sorgu olduğu durumda tekrarlayan işlemi önlemk adına axios da durum yönetimi
  };
  onChangeLanguage = language =>{
    const {i18n} = this.props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  }

  //ovveride ettiği metot/ class componentlerde render zorunlu
  render() {
    const {pendingApiCall, errors} = this.state;
    const {username, displayName, password, passwordRepeat} = errors;
    const { t } = this.props;
    // render metodu bir jsx dönmelidir
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t('Sign Up')}</h1>
          <Input name="username" label={t("Username")} error={username} onChange={this.onChange} />
          <Input name="displayName" label={t("Display Name")} error={displayName} onChange={this.onChange} />
          <Input name="password" label={t("Password")} error={password} type="password" onChange={this.onChange} />
          <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat} type="password" onChange={this.onChange} />
         
          <div className="text-center">
            <button 
             className="btn btn-primary mt-2"
             onClick={this.onClickSignup}
             disabled={pendingApiCall || passwordRepeat !== undefined}>
                 {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                 {t('Sign Up')}
            </button>
          </div>
          <div>
          <img src="https://countryflagsapi.com/tr/flat/24.png"  alt="Turkey flag" onClick={() => this.onChangeLanguage('tr')} style={{cursor: 'pointer'}} />
          <img src="https://countryflagsapi.com/us/flat/24.png" alt="England flag" onClick={() => this.onChangeLanguage('en')} style={{cursor: 'pointer'}} />

          </div>
        </form>
      </div>
    );
  }
}

// Koşullu Render örneği- Conditional rendering {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} 

// translation için
const UserSignupPageWithTranslation = withTranslation()(UserSignupPage);  // Higher Order Component
export default UserSignupPageWithTranslation;
