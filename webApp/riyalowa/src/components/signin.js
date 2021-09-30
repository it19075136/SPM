import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Icon, Input } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import { getUser, getCode } from '../redux/actions/userActions';
class signin extends Component {

  state = {
    user: {
      email: "",
      password: ""
    },
    action: false,
  }
  render() {

    const responseGoogle = (response) => {
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          email: response.profileObj.email ? response.profileObj.email : ""
        }
      })
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          password: ""
        }
      })
      this.props.getUser(this.state.user).then((res) => {
        console.log('in dispathc');
        console.log('res.data', res);

        const { token } = res;
        console.log('token', token)
        const userResponds = jwt.decode(token)
        if (userResponds.email) {
          const login = {
            login: true
          }
          localStorage.setItem('login', login);

          this.setState({
            ...this.state,
            action: true
          })


          console.log('decode token userRespond', userResponds);

          console.log('in findUser');

          window.location.href = '/'
          notify();
        }
        else {

          this.setState({
            ...this.state,
            action: false
          })
          notify();
          console.log('in else');
        }

      }).catch((err) => {

        this.setState({
          ...this.state,
          action: false
        })
        notify();
        console.log('err');
        console.log(err);

      })
    }
    const ErrResponseGoogle = (response) => {
      this.setState({
        ...this.state,
        action: false
      })
      notify();


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
      const Password = this.state.user.password;
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          password: ""
        }
      })

      this.props.getUser(this.state.user).then((res) => {
        console.log('in dispathc');

        const { password } = res;

        console.log('res.data', res);

        console.log('password', password);
        console.log('Password', Password);
        if (passwordHash.verify(Password, password)) {

          this.setState({
            ...this.state,
            action: true
          })
          const login = {
            login: false
          }
          localStorage.setItem('login', login);

          const { token } = res;
          console.log('token', token)
          const userResponds = jwt.decode(token)
          console.log('decode token userRespond', userResponds);

          console.log('in findUser');

          window.location.href = '/'
          notify();
        }
        else {

          this.setState({
            ...this.state,
            action: false
          })
          notify();
          console.log('in else');
        }

      }).catch((err) => {

        this.setState({
          ...this.state,
          action: false
        })
        notify();
        console.log('err');
        console.log(err);

      })
    }
    const forgetPasswordHandler = (e) => {

      if (this.state.user.email) {
        console.log('this.state.user.email', this.state.user.email)
        this.props.getCode(this.state.user).then((res) => {

          const { token } = res;
          if (token) {
            localStorage.setItem('updatePasswordDetails', token);

            console.log('action axios');
            console.log(token);

            window.location.href = '/forgetPassword'
          }

        }).catch((err) => {

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
    return (
      <div>
        <Form className='user-form-centered'>
          <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
            <Icon name="sign-in" /> Sign In
          </Header>
          {/* <Form.Field>
          <div>
            <Icon name="mail" />
            <label>Email<span style={{ color: '#FF0000' }}>*</span></label>
          </div>
          <input placeholder='Email' name="email" onChange={formHandler} required={true} />
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
            <Icon name="key" />
            <label>Password<span style={{ color: '#FF0000' }}>*</span></label>
          </div>
          <input placeholder='Password' name="password" type="password" onChange={formHandler} />
        </Form.Field> */}
          <Icon name="key" />
          <Form.Field
            required
            width='16'
            id='password'
            name="password"
            control={Input}
            label='password'
            placeholder='Enter Password'
            onChange={formHandler}
            type='password'
            error={this.state.user.password == ""}
          />
          <Header as="h4" textAlign='right' style={{ color: '#076AE0' }}  >
            {/* <a onClick={forgetPasswordHandler} >Forgot Password?</a> */}
            <a onClick={forgetPasswordHandler} >Forgot Password?</a>
          </Header>
          <Button type='submit' onClick={submitHandler}>SignIn</Button>
          <Header as="h4" textAlign='center' >
            OR
          </Header>
          <GoogleLogin
            clientId="433588545715-a0rf1qdeefuafa8kn13lh9g2v810v9ri.apps.googleusercontent.com"
            buttonText=" Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={ErrResponseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          <Header as="h4" textAlign='center' >
            Don't have an account yet?<a href="/signup" style={{ color: '#076AE0' }}> Register now</a>
          </Header>
        </Form>
        <ToastContainer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { getUser, getCode })(signin)