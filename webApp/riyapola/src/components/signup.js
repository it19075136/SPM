import React, { useState } from 'react'
import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import hashPassword from 'password-hash'
import jwt from 'jsonwebtoken'

// constructor(props){
//   super(props);
//   this.state={
//      name :"" ,
//       email :"" ,
//       phoneNumber:"",
//       type:"buyerSeller"
//   }
// }
function Signup () { 
  const [user, setUser] = useState({
    name :"" ,
          email :"" ,
          password:"",
          type:"buyerSeller",
          phoneNumber:""
  })
  const  [repassword, setRepassword] = useState("");
  const responseGoogle =(response)=>{
    setUser({
      name:response.name,
      email:response.email,
      phoneNumber:response.phoneNumber,
      // type:"buyerSeller"
    })
  }
  const formHandler =(e)=>{
    // setUser({
    //   ...this.user,
    //   [e.target.name]:e.target.value
    // })
    setUser(prevState => ({
      ...prevState,
      [e.target.name]:e.target.value
  }));
  
  }
  const submitHandler=(e)=>{
    console.log(user,"user");
    e.preventDefault();
    user.type= "buyerSeller"
    user.password = hashPassword.generate(user.password);
    axios.post('http://localhost:5000/user/add',user).then(res=>{
        const token = res.data;
        console.log(token,"token");
        if(token ='Email Already Exists'){
          // resolve(res.data);
        }
        else if(token){
            const userResponds =jwt.decode(token);
            const userDetails ={
                _id:userResponds._id,
                name :userResponds.name,
                email : userResponds.email,
                type : userResponds.type,
                phoneNumber :userResponds.phoneNumber
            }
            console.log('decode token userRespond',userResponds);
            console.log('send details to redux',userDetails)
            localStorage.setItem('user',token);
            // dispatch({type:'ADD_USER',payload:userDetails})
            // resolve(res.data);
        }
         
    }).catch(err=>{
        console.log(err)
        // reject(err)
    })
  }
  return(
 
  <Form className="user-form-centered">
      <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
                    Sign Up
                </Header>
    <Form.Field>
    <div>
    <Icon name="user"/>
      <label>Name</label>
      </div>
      <input placeholder='Name'name="name" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="mail"/>
      <label>Email</label>
      </div>
      <input placeholder='Email' name="email" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="phone"/>
      <label>phoneNumber</label>
      </div>
      <input className="userinput" placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Password</label>
      </div>
      <input placeholder='Password' name="password" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Re Enter Password</label>
      </div>
      <input placeholder='Re Enter Password'name="Repassword" onChange={(e)=>{setRepassword(e.target.value)}}/>
    </Form.Field>
    <Form.Field >
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit' onClick={submitHandler}>Signup</Button>
    <Header as="h4"  textAlign='center' >
    OR
</Header>
    <GoogleLogin
    clientId="862096495152-812dp0vglkhcqffdtmae9tuhi72oouk2.apps.googleusercontent.com"
    buttonText="Sign up with Google"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}

    />
    
    <Header as="h4"  textAlign='center' >
    Have an account? <a href="/signin" style={{ color: '#076AE0' }}>  Login Here</a>
</Header>
  </Form>
)
}

export default Signup
