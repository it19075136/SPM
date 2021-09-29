import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userUpdate } from '../redux/actions/userActions';
import { connect } from 'react-redux'
class forgetPassword extends Component { 
//   const [user, setUser] = useState({
//      password:""
   
// })
// const [forgetPassword, setForgetPassword] = useState({
//     reEnterPassword:"",
//     OTP:0
// })
state={
  user:{
    password:"",
    _id:""
  },
  reEnterPassword:"",
  OTP:null
}
render() {
const item = localStorage.getItem("updatePasswordDetails");
const OTPDetails = jwt.decode(item);
const userdetais = localStorage.getItem("user");
const user = jwt.decode(userdetais);

const formHandler =(e)=>{
// setUser({
//   ...this.user,
//   [e.target.name]:e.target.value
// })
// setUser(prevState => ({
//  ...prevState,
//  [e.target.name]:e.target.value
// }));
this.setState({
  ...this.state,
  user:{
    ...this.state.user,
    [e.target.name]:e.target.value
  }
})
}
const forgetPasswordHandle=(e)=>{
    // setForgetPassword({
    //     ...forgetPassword,
    //     [e.target.name]:e.target.value
    // })
    this.setState({
      ...this.state,
      [e.target.name]:e.target.value
    })
}
const submitHandler=(e)=>{
  // console.log(user,"user");
    e.preventDefault();
    // const password = passwordHash.generate(user.password);
     const password = passwordHash.generate(this.state.user.password);
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        password:passwordHash.generate(this.state.user.password),
      }
    })
    console.log('in promise in addNewPAssword')
    console.log("this.state.reEnterPassword",this.state.reEnterPassword)
    console.log("password",password)
    console.log("this.state.OTP",OTPDetails.code)
    console.log("this.state.OTP",this.state.OTP)

        if(passwordHash.verify(this.state.reEnterPassword,password) && passwordHash.verify(this.state.OTP,OTPDetails.code)){
                // axios.post(`http://localhost:5000/user/update/${this.state.user._id}`,{password})
                console.log('out post');
                this.props.userUpdate(this.state.user,user).then((res)=>{
                    console.log('in post');
                    const {token} =res;    
                if(token){
                    // localStorage.setItem('user',token);
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
                    // console.log(userDetails);
                    this.setState({
                      ...this.state,
                      action:true
                    })
                      notify();
                    // dispatch({type:'ADD_USER',payload:userDetails});
                    // resolve(userDetails);
                }
                else{
                  // console.log(userDetails);
                    this.setState({
                      ...this.state,
                      action:false
                    })
                      notify();
                }
                }).catch((err)=>{
                    // reject(err)
                })
            }
}
const notify = () => this.state.action ? toast.success('Login  was  successfull!', {
  position: "bottom-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}) : toast.error('Login was unsuccessful', {
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
  <ToastContainer />
</div>
)
}
}
export default connect(null, { userUpdate })(forgetPassword)
