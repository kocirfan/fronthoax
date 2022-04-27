import React from "react";

//bir class Component- statefull 

class UserSignupPage extends React.Component{

    //ovveride ettiği metot/ class componentlerde render zorunlu
    render(){
        // render metodu bir jsx dönmelidir
        return(
            <form>
                <h1>Sign Up</h1>
                <div>
                    <label>Username</label>
                    <input />
                </div>
                <div>
                    <label>Display Name</label>
                    <input />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" />
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input type="password" />
                </div>
                <button>Sign Up</button>
            </form>    
        );
    }
}

export default UserSignupPage;