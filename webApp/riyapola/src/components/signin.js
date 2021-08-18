import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
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
      <label>Email</label>
      <input placeholder='Email' name="email" onChange={formHandler}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' name="password" onChange={formHandler}/>
    </Form.Field>
    <Button type='submit' onClick={submitHandler}>SignIn</Button>
    <GoogleLogin
    clientId=""
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
    />
  </Form>
)
}

export default Signin
