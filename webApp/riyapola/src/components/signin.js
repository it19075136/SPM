import React, { useState } from 'react'
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'

function Signin  () { 
  const [user, setUser] = useState({
     email :"" ,
     password:""
   
})
const responseGoogle =(response)=>{
setUser({
 email:response.email,
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
const submitHandler=()=>{

}
  return(
  <Form className='form-centered'>
    <Form.Field>
    <Icon name="user"/>
      <label>Email</label>
      <input placeholder='Email' name="email" onChange={formHandler}/>
    </Form.Field>
    <Form.Field>
    <Icon name="email"/>
      <label>Password</label>
      <input placeholder='Password' name="password" onChange={formHandler}/>
    </Form.Field>
    <Button type='submit' onClick={submitHandler}>SignIn</Button>
    <GoogleLogin
    clientId="862096495152-812dp0vglkhcqffdtmae9tuhi72oouk2.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
  </Form>
)
}

export default Signin
