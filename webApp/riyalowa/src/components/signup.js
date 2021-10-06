import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Icon, Input } from 'semantic-ui-react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import axios from "axios"
import { connect } from 'react-redux'
import hashPassword from 'password-hash'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../redux/actions/userActions';

class signup extends Component {
  state = {
    user: {
      name: "",
      email: "",
      password: "",
      type: "buyerSeller",
      phoneNumber: ""
    },
    repassword: "",
    action: false,

  }

  render() {
    const responseGoogle = (response) => {
      console.log('in responseGoogle')
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          name: response.profileObj.name ? response.profileObj.name : "",
          email: response.profileObj.email ? response.profileObj.email : "",
          phoneNumber: response.profileObj.phoneNumber ? response.profileObj.phoneNumber : "",
          image: response.profileObj.imageUrl ? [response.profileObj.imageUrl] : [],
        }
      })


      const login = {
        login: true
      }
      localStorage.setItem('login', login);
      console.log('this.state.user',this.state.user)
      this.props.addUser(this.state.user).then(res => {
        const { token } = res;
        console.log('res',res)
        console.log('token',token)

        if (token) {

          console.log('true')
          this.setState({
            ...this.state,
            action: true
          })
          notify();
          
          window.location.href = '/'

        }
        else {

          console.log('false')
          this.setState({
            ...this.state,
            action: false
          })
          notify();
        }


      }).catch(err => {
        console.log(err)

        this.setState({
          ...this.state,
          action: false
        })
        notify();
      })


    }
    const formHandler = (e) => {
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          [e.target.name]: e.target.value
        }
      })

    }
    const submitHandler = (e) => {

      e.preventDefault();
      console.log('this.state',this.state)
      if( this.state.user.email && this.state.user.password && this.state.user.phoneNumber && this.state.user.name && (this.state.repassword===  this.state.user.password)){
       console.log('in if')
        const pass = hashPassword.generate(this.state.user.password);
      this.setState({
        ...this.state,
        user:{
          ...this.state.user,
          password:pass
        }
      })
      this.props.addUser(this.state.user).then(res => {
        console.log(res, "res.data")
        const { token } = res;
        if (token) {

          console.log('true')
          this.setState({
            ...this.state,
            action: true
          })
          notify();
          const login = {
            login: false
          }
          localStorage.setItem('login', login);

          window.location.href = '/'

        }
        else {

          console.log('false')
          this.setState({
            ...this.state,
            action: false
          })
          notify();
        }

      }).catch(err => {
        console.log(err)

      })
    }
    else{
      this.setState({
        ...this.state,
        action: false,
      },()=>{
        notify();
      })
    }
    }
    const notify = () => this.state.action ? toast.success('singup is successfull!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }) : toast.error('Action was unsuccessful, please check and try again!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    return (

      <Form className="user-form-centered">
        <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
          <Icon name="signup" />   Sign Up
        </Header>
        {/* <Form.Field >
    <div>
    <Icon name="user"/>
      <label >Name<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Name'name="name" onChange={formHandler} />
    </Form.Field> */}
        <Icon name="user" />
        <Form.Field required
          width='16'
          id='name'
          name="name"
          control={Input}
          label='name'
          placeholder='Enter Name'
          onChange={formHandler}
          error={this.state.user.name == ""}
        />
        {/* <Form.Field>
    <div>
    <Icon name="mail"/>
      <label>Email<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Email' name="email" onChange={formHandler} />
    </Form.Field> */}
        <Icon name="mail" />
        <Form.Field required
          width='16'
          id='email'
          name="email"
          control={Input}
          label='email'
          placeholder='Enter Email'
          onChange={formHandler}
          error={this.state.user.email == ""}
        />
        {/* <Form.Field>
    <div>
    <Icon name="phone"/>
      <label>phoneNumber<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input className="userinput" placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} />
    </Form.Field> */}
        <Icon name="phone" />
        <Form.Field required
          width='16'
          id='phoneNumber'
          name="phoneNumber"
          control={Input}
          label='phoneNumber'
          placeholder='Enter Phone Number'
          onChange={formHandler}
          error={this.state.user.phoneNumber == ""}
        />
        {/* <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Password' name="password" type="password" onChange={formHandler} />
    </Form.Field> */}
        <Icon name="key" />
        <Form.Field required
          width='16'
          id='password'
          name="password"
          control={Input}
          label='password'
          placeholder='Enter Password'
          onChange={formHandler}
          error={this.state.user.password == ""}
          type='password'
        />
        {/* <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Re Enter Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Re Enter Password'name="Repassword" type="password" onChange={(e)=>{this.setState({...this.state,repassword:[e.target.value]})}}/>
    </Form.Field> */}
        <Icon name="key" />
        <Form.Field required
          width='16'
          id='repassword'
          name="repassword"
          control={Input}
          label='Re Enter password'
          placeholder='Re enterEnter password'
          onChange={(e) => { this.setState({ ...this.state, repassword: e.target.value }) }}
          error={this.state.repassword == ""}
          type='password'
        />
        <Form.Field >
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit' onClick={submitHandler}>Signup</Button>
        <Header as="h4" textAlign='center' >
          OR
        </Header>
        <GoogleLogin
          clientId="433588545715-a0rf1qdeefuafa8kn13lh9g2v810v9ri.apps.googleusercontent.com"
          buttonText="Sign up with Google"
          onSuccess={responseGoogle}
          onFailure={() => {
            this.setState({
              ...this.state,
              action: false
            })
            notify();
          }}
          cookiePolicy={'single_host_origin'}
        />


        <Header as="h4" textAlign='center' >
          Have an account? <a href="/signin" style={{ color: '#076AE0' }}>  Login Here</a>
        </Header>
        <ToastContainer />
      </Form>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { addUser })(signup)