import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Icon,Input } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userUpdate } from '../redux/actions/userActions';
import { connect } from 'react-redux';
class forgetPassword extends Component { 

state={
  user:{
    password:""
  },
  reEnterPassword:"",
  OTP:""
}
render() {
const item = localStorage.getItem("updatePasswordDetails");
const OTPDetails = jwt.decode(item);
const userdetais = localStorage.getItem("user");
const user = jwt.decode(userdetais);

const formHandler =(e)=>{
this.setState({
  ...this.state,
  user:{
    ...this.state.user,
    [e.target.name]:e.target.value
  }
})
}
const forgetPasswordHandle=(e)=>{
  
    this.setState({
      ...this.state,
      [e.target.name]:e.target.value
    })
}
const submitHandler=(e)=>{
    e.preventDefault();
     const password = passwordHash.generate(this.state.user.password);
     console.log("hashpassword",password)
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        password:password
      }
    })
    console.log('in promise in addNewPAssword')
    console.log("this.state.reEnterPassword",this.state.reEnterPassword)
    console.log("password",password)
    console.log("this.state.OTP",OTPDetails.code)
    console.log("this.state.OTP",this.state.OTP)

        if(passwordHash.verify(this.state.reEnterPassword,password) && passwordHash.verify(this.state.OTP,OTPDetails.code)){
                console.log("updatedetails",OTPDetails)
                console.log('this.state.user',this.state.user);
                console.log('password',password);
                this.props.userUpdate({"password":password},OTPDetails).then((res)=>{
                    console.log('in post');
                    const {token} =res;    
                if(token){
                    localStorage.removeItem('user');
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
                  
                    this.setState({
                      ...this.state,
                      action:true
                    })
                      notify();
                      window.location.href = '/signin'
                    
                }
                else{
                 
                  
                    this.setState({
                      ...this.state,
                      action:false
                    },()=>{
                      notify();
                      window.location.href = '/'
                    })
                     
                }
                }).catch((err)=>{
                   
                })
            }
            else{
              this.setState({
                ...this.state,
                action:false
              },()=>{
                notify();
                // window.location.href = '/'
              })
            }
}
const notify = () => this.state.action ? toast.success('password change  was  successfull!', {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}) : toast.error('password change unsuccessful', {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
})
  return(
    <div>
  <Form className='user-form-centered'>
      <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
      {/* <Icon name="sign-in"/> */}
       Forgot Password
                </Header>
    {/* <Form.Field>
      <div>
    <Icon name="mail"/>
      <label>OTP Code<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='OTP Code' name="OTP" onChange={forgetPasswordHandle}/>
    </Form.Field> */}
    <Icon name="key" />
         <Form.Field required
                    width='16'
                    id='OTP'
                    name="OTP"
                    control={Input}
                    label='OTP'
                    placeholder='Enter OTP Code'
                    onChange={forgetPasswordHandle}
                    error={this.state.OTP == ""}
                />
    {/* <Form.Field>
    
    <div>
    <Icon name="key"/>
      <label>new Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='new Password' name="password" type="password" onChange={formHandler}/>
    </Form.Field> */}
    <Icon name="key" />
         <Form.Field required
                    width='16'
                    id='password'
                    name="password"
                    control={Input}
                    label='password'
                    placeholder='Enter New Password'
                    onChange={formHandler}
                    error={this.state.user.password == ""}
                    type='password'
                />
    {/* <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Re Enter Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Re Enter Password' name="reEnterPassword" type="password" onChange={forgetPasswordHandle}/>
    </Form.Field> */}
    <Icon name="key" />
         <Form.Field required
                    width='16'
                    id='reEnterPassword'
                    name="reEnterPassword"
                    control={Input}
                    label='Re Enter Password'
                    placeholder='Re Enter password'
                    onChange={forgetPasswordHandle}
                    error={this.state.reEnterPassword == ""}
                    type='password'
                />
    <Button type='submit' onClick={submitHandler}>Re Set Password</Button>
  </Form>
  <ToastContainer />
</div>
)
}
}
export default connect(null, { userUpdate })(forgetPassword)
