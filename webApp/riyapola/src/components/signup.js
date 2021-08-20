import React, { useState } from 'react'
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'

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
          phoneNumber:"",
          type:"buyerSeller",
          password:"",
          Repassword:""
  })
  const responseGoogle =(response)=>{
    setUser({
      name:response.name,
      email:response.email,
      phoneNumber:response.phoneNumber,
      type:"buyerSeller"
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
 
  <Form className="form-centered">
    <Form.Field>
    <Icon name="user"/>
      <label>Name</label>
      <input placeholder='Name'name="name" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <Icon name="mail"/>
      <label>Email</label>
      <input placeholder='Email' name="email" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <Icon name="phone"/>
      <label>phoneNumber</label>
      <input placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <Icon name="key"/>
      <label>Password</label>
      <input placeholder='Password' name="password" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <Icon name="key"/>
      <label>Re Enter Password</label>
      <input placeholder='Re Enter Password'name="Repassword" onChange={formHandler}/>
    </Form.Field>
    <Form.Field >
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit' onClick={submitHandler}>Signup</Button>
    <GoogleLogin
    clientId="862096495152-812dp0vglkhcqffdtmae9tuhi72oouk2.apps.googleusercontent.com"
    buttonText="Signup"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}

    />
  </Form>
)
}

export default Signup
