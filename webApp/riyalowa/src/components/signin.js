import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
import GoogleLogin from 'react-google-login'
import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class signin extends Component  {
  // const [user, setUser] = useState({
  //   email: "",
  //   password: ""

  // })
  // const [action, setAction] = useState({
  //   success:false
  // })
  state ={
    user:{
      email: "",
      password: ""
    },
    action:false,
  }
  render() {
 
  const responseGoogle = (response) => {
  //   setAction(({
  //     success:true
  //  }));
  //  this.setState({
  //    ...this.state,
  //    action:true
  //  })
  //   notify();
    // setUser({
    //   email: response.email,
    // })
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        email:response.profileObj.email?response.profileObj.email:""
      }
    })
   
    // e.preventDefault();
    // const Password = this.state.user.password;
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
       password:""
      }
    })
    // user.password = passwordHash.generate(user.password);
    axios.post('http://localhost:5000/user/getUser', this.state.user).then((res) => {
      console.log('in dispathc');

      // const { password } = res.data;
      // password = jwt.decode(password);
      console.log('res.data', res.data);
      // console.log('token', token);
      // console.log('password', password);
      // console.log(Password);
      const { token } = res.data;
        console.log('token', token)
        const userResponds = jwt.decode(token)
      if (userResponds.email){
        const login = {
          login: true
        }
        localStorage.setItem('login', login);
        // const userResponds =jwt.decode(token);
        // const userDetails ={
        //     _id:userResponds._id,
        //     name :userResponds.name,
        //     email : userResponds.email,
        //     gender : userResponds.gender,
        //     type : userResponds.type,
        // }
      //   setAction(({
      //    success:true
      // }));
      this.setState({
      ...this.state,
      action:true
    })
      //   setAction(prevState => ({
      //     ...prevState,
      //    success:true
      // }));
      //  console.log('action',action)
        
        console.log('decode token userRespond', userResponds);
        // dispatch({type:'ADD_USER',payload: userResponds})
        localStorage.setItem('user', token);
        console.log('in findUser');
        // resolve(userResponds);
        window.location.href = '/'
        notify();
      }
      else {
      //   setAction(({
      //     success:false
      //  }));
       this.setState({
        ...this.state,
        action:false
      })
        notify();
        console.log('in else');
      }
      // reject('err')
    }).catch((err) => {
    //   setAction(({
    //     success:false
    //  }));
     this.setState({
      ...this.state,
      action:false
    })
      notify();
      console.log('err');
      console.log(err);
      // reject('error')
    })
  }
  
  const formHandler = (e) => {
    // setUser({
    //   ...this.user,
    //   [e.target.name]:e.target.value
    // })
    // setUser(prevState => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value
    // }));
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        [e.target.name]:e.target.value
      }
    })


  }
  const submitHandler = (e) => {
    // console.log(user, "user");
    e.preventDefault();
    const Password = this.state.user.password;
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
       password:""
      }
    })
    // user.password = passwordHash.generate(user.password);
    axios.post('http://localhost:5000/user/getUser', this.state.user).then((res) => {
      console.log('in dispathc');

      const { password } = res.data;
      // password = jwt.decode(password);
      console.log('res.data', res.data);
      // console.log('token', token);
      console.log('password', password);
      console.log(Password);
      if (passwordHash.verify(Password, password)) {
        // const userResponds =jwt.decode(token);
        // const userDetails ={
        //     _id:userResponds._id,
        //     name :userResponds.name,
        //     email : userResponds.email,
        //     gender : userResponds.gender,
        //     type : userResponds.type,
        // }
      //   setAction(({
      //    success:true
      // }));
      this.setState({
      ...this.state,
      action:true
    })
    const login = {
      login:false
    }
    localStorage.setItem('login',login);
      //   setAction(prevState => ({
      //     ...prevState,
      //    success:true
      // }));
      //  console.log('action',action)
        const { token } = res.data;
        console.log('token', token)
        const userResponds = jwt.decode(token)
        console.log('decode token userRespond', userResponds);
        // dispatch({type:'ADD_USER',payload: userResponds})
        localStorage.setItem('user',token);
        console.log('in findUser');
        // resolve(userResponds);
        window.location.href = '/'
        notify();
      }
      else {
      //   setAction(({
      //     success:false
      //  }));
       this.setState({
        ...this.state,
        action:false
      })
        notify();
        console.log('in else');
      }
      // reject('err')
    }).catch((err) => {
    //   setAction(({
    //     success:false
    //  }));
     this.setState({
      ...this.state,
      action:false
    })
      notify();
      console.log('err');
      console.log(err);
      // reject('error')
    })
  }
  const forgetPasswordHandler = (e) => {
    //   const user ={
    //     email:email
    // }
    if (this.state.user.email) {
      axios.post('http://localhost:5000/user/getCode', this.state.user).then((res) => {
        //localstorage ekati reducx ekati danna oneda
        const { token } = res.data;
        localStorage.setItem('updatePasswordDetails', token);
        //    const  =jwt.decode(details);
        //     dispatch({type:'ADD_USER',payload:res.data});
        console.log('action axios');
        console.log(token);
        // resolve(token)
        window.location.href = '/forgetPassword'
      }).catch((err) => {
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
  return (
    <div>
      <Form className='user-form-centered'>
        <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
          <Icon name="sign-in" /> Sign In
        </Header>
        <Form.Field>
          <div>
            <Icon name="mail" />
            <label>Email<span style={{ color: '#FF0000' }}>*</span></label>
          </div>
          <input placeholder='Email' name="email" onChange={formHandler} />
        </Form.Field>
        <Form.Field>
          <div>
            <Icon name="key" />
            <label>Password<span style={{ color: '#FF0000' }}>*</span></label>
          </div>
          <input placeholder='Password' name="password" type="password" onChange={formHandler} />
        </Form.Field>
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
          onFailure={responseGoogle}
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



// import React, { useState } from 'react'
// import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
// import GoogleLogin from 'react-google-login'
// import axios from "axios"
// import passwordHash from 'password-hash'
// import jwt from 'jsonwebtoken'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// function Signin() {
//   const [user, setUser] = useState({
//     email: "",
//     password: ""

//   })
//   const [action, setAction] = useState({
//     success:false
//   })
 
//   const responseGoogle = (response) => {
//     setAction(({
//       success:true
//    }));
//     notify();
//     setUser({
//       email: response.email,
//     })
//     const login = {
//       login: true
//     }
//     localStorage.setItem('login', login);
//   }
  
//   const formHandler = (e) => {
//     // setUser({
//     //   ...this.user,
//     //   [e.target.name]:e.target.value
//     // })
//     setUser(prevState => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   }
//   const submitHandler = (e) => {
//     console.log(user, "user");
//     e.preventDefault();
//     const Password = user.password;
//     user.password = "";
//     // user.password = passwordHash.generate(user.password);
//     axios.post('http://localhost:5000/user/getUser', user).then((res) => {
//       console.log('in dispathc');

//       const { password } = res.data;
//       // password = jwt.decode(password);
//       console.log('res.data', res.data);
//       // console.log('token', token);
//       console.log('password', password);
//       console.log(Password);
//       if (passwordHash.verify(Password, password)) {
//         // const userResponds =jwt.decode(token);
//         // const userDetails ={
//         //     _id:userResponds._id,
//         //     name :userResponds.name,
//         //     email : userResponds.email,
//         //     gender : userResponds.gender,
//         //     type : userResponds.type,
//         // }
//         setAction(({
//          success:true
//       }));
//       //   setAction(prevState => ({
//       //     ...prevState,
//       //    success:true
//       // }));
//        console.log('action',action)
//         const { token } = res.data;
//         console.log('token', token)
//         const userResponds = jwt.decode(token)
//         console.log('decode token userRespond', userResponds);
//         // dispatch({type:'ADD_USER',payload: userResponds})
//         localStorage.setItem('user', token);
//         console.log('in findUser');
//         // resolve(userResponds);
//         window.location.href = '/'
//         notify();
//       }
//       else {
//         setAction(({
//           success:false
//        }));
//         notify();
//         console.log('in else');
//       }
//       // reject('err')
//     }).catch((err) => {
//       setAction(({
//         success:false
//      }));
//       notify();
//       console.log('err');
//       console.log(err);
//       // reject('error')
//     })
//   }
//   const forgetPasswordHandler = (e) => {
//     //   const user ={
//     //     email:email
//     // }
//     if (user.email) {
//       axios.post('http://localhost:5000/user/getCode', user).then((res) => {
//         //localstorage ekati reducx ekati danna oneda
//         const { token } = res.data;
//         localStorage.setItem('updatePasswordDetails', token);
//         //    const  =jwt.decode(details);
//         //     dispatch({type:'ADD_USER',payload:res.data});
//         console.log('action axios');
//         console.log(token);
//         // resolve(token)
//         window.location.href = '/forgetPassword'
//       }).catch((err) => {
//         // reject(err)
//       })
//     }


//   }
//   const notify = () => action.success ? toast.success('Login  was  successfull!', {
//     position: "bottom-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   }) : toast.error('Login was unsuccessful', {
//     position: "bottom-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//   })
//   return (
//     <div>
//       <Form className='user-form-centered'>
//         <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
//           <Icon name="sign-in" /> Sign In
//         </Header>
//         <Form.Field>
//           <div>
//             <Icon name="mail" />
//             <label>Email<span style={{ color: '#FF0000' }}>*</span></label>
//           </div>
//           <input placeholder='Email' name="email" onChange={formHandler} />
//         </Form.Field>
//         <Form.Field>
//           <div>
//             <Icon name="key" />
//             <label>Password<span style={{ color: '#FF0000' }}>*</span></label>
//           </div>
//           <input placeholder='Password' name="password" type="password" onChange={formHandler} />
//         </Form.Field>
//         <Header as="h4" textAlign='right' style={{ color: '#076AE0' }}  >
//           {/* <a onClick={forgetPasswordHandler} >Forgot Password?</a> */}
//           <a onClick={forgetPasswordHandler} >Forgot Password?</a>
//         </Header>
//         <Button type='submit' onClick={submitHandler}>SignIn</Button>
//         <Header as="h4" textAlign='center' >
//           OR
//         </Header>
//         <GoogleLogin
//           clientId="433588545715-a0rf1qdeefuafa8kn13lh9g2v810v9ri.apps.googleusercontent.com"
//           buttonText=" Sign in with Google"
//           onSuccess={responseGoogle}
//           onFailure={responseGoogle}
//           cookiePolicy={'single_host_origin'}
//         />
//         <Header as="h4" textAlign='center' >
//           Don't have an account yet?<a href="/signup" style={{ color: '#076AE0' }}> Register now</a>
//         </Header>
//       </Form>
//       <ToastContainer />
//     </div>
//   )
// }

// export default Signin
