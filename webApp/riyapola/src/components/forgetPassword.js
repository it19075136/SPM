import React, { useState } from 'react'
import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
function ForgetPassword  () { 
  const [user, setUser] = useState({
     password:""
   
})
const [forgetPassword, setForgetPassword] = useState({
    reEnterPassword:"",
    OTP:0
})
const item = localStorage.getItem("updatePasswordDetails");
const OTPDetails = jwt.decode(item);

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
const forgetPasswordHandle=(e)=>{
    setForgetPassword({
        ...forgetPassword,
        [e.target.name]:e.target.value
    })
}
const submitHandler=(e)=>{
  console.log(user,"user");
    e.preventDefault();
    const password = passwordHash.generate(user.password);
    console.log('in promise in addNewPAssword')

        if(passwordHash.verify(forgetPassword.reEnterPassword,password) && OTPDetails.code == forgetPassword.OTP){
                axios.post(`http://localhost:5000/user/update/${user._id}`,{password}).then((res)=>{
                    console.log('in post');
                    const {token} =res.data;    
                if(token){
                    localStorage.setItem('user',token);
                    const userResponds = jwt.decode(token);
                    const userDetails ={
                        _id:userResponds._id,
                        name :userResponds.name,
                        email : userResponds.email,
                        type : userResponds.type,
                        phoneNumber :userResponds.phoneNumber,
                        password:userResponds.password,
                        wishList:userResponds.userResponds,
                        image:userResponds.image
                    }
                    console.log(userDetails);
                    // dispatch({type:'ADD_USER',payload:userDetails});
                    // resolve(userDetails);
                }
                }).catch((err)=>{
                    // reject(err)
                })
            }
}
  return(
    <div>
  <Form className='user-form-centered'>
      <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
      <Icon name="sign-in"/> Sign In
                </Header>
    <Form.Field>
      <div>
    <Icon name="mail"/>
      <label>OTP Code<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='OTP Code' name="OTP" onChange={forgetPasswordHandle}/>
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="key"/>
      <label>new Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='new Password' name="password" type="password" onChange={formHandler}/>
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Re Enter Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Re Enter Password' name="reEnterPassword" type="password" onChange={forgetPasswordHandle}/>
    </Form.Field>
    <Button type='submit' onClick={submitHandler}>Re Set Password</Button>
  </Form>
  
</div>
)
}

export default ForgetPassword
