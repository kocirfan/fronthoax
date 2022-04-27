import React from "react";
import axios from "axios";

//bir class Component- statefull 

class UserSignupPage extends React.Component{

    //ovveride metot state
    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat : null
    }
                     
    onChange = event => {
         const {name, value} = event.target; //object destruction
         
            //event.target.value forma girilen değeri tutuyor
            // event.target.name formda ilgili alanı tutuyor
        
         this.setState({
            [name]: value    //[name]: value name ile value set ediliyor
        });
    }

    onClickSignup = event => {
        event.preventDefault();

        const {username, displayName, password} = this.state;  //object destruction

        const body = {  //key-value aynı ise 
            username,
            displayName,
            password
        }

        axios.post('/api/1.0/users', body);

    };
    

    //ovveride ettiği metot/ class componentlerde render zorunlu
    render(){
        // render metodu bir jsx dönmelidir
        return(
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChange} />
                </div>
                <div>
                    <label>Display Name</label>
                    <input name="displayName" onChange={this.onChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password"  onChange={this.onChange} />
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input name="passwordRepeat" type="password" onChange={this.onChange} />
                </div>
                <button onClick={this.onClickSignup}>Sign Up</button>
            </form>    
        );
    }
}

export default UserSignupPage;