import React from "react";
import {signup} from "../api/apiCalls"

//bir class Component- statefull

class UserSignupPage extends React.Component {
  //ovveride metot state
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
    pendingApiCall: false
  };

  onChange = (event) => {
    const { name, value } = event.target; //object destruction

    //event.target.value forma girilen değeri tutuyor
    // event.target.name formda ilgili alanı tutuyor

    this.setState({
      [name]: value //[name]: value name ile value set ediliyor
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
    }catch(error){}

    this.setState({ pendingApiCall: false});
    // aktif sorgu olduğu durumda tekrarlayan işlemi önlemk adına axios da durum yönetimi
  };

  //ovveride ettiği metot/ class componentlerde render zorunlu
  render() {
    const {pendingApiCall} = this.state;
    // render metodu bir jsx dönmelidir
    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign Up</h1>
          <div className="form-group">
            <label>Username</label>
            <input className="form-control" name="username" onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input className="form-control" name="displayName" onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" name="password" type="password" onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label>Password Repeat</label>
            <input className="form-control"
              name="passwordRepeat"
              type="password"
              onChange={this.onChange}
            />
          </div>
          <div className="text-center">
            <button 
             className="btn btn-primary mt-2"
             onClick={this.onClickSignup}
             disabled={pendingApiCall}>
                 {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                 Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

// Koşullu Render örneği- Conditional rendering {this.state.pendingApiCall && <span className="spinner-border spinner-border-sm"></span>} 

export default UserSignupPage;
