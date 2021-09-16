import React, { Component } from 'react'
import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import axios from "axios"
import { connect } from 'react-redux'
import hashPassword from 'password-hash'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser } from '../redux/actions/userActions';

// constructor(props){
//   super(props);
//   this.state={
//      name :"" ,
//       email :"" ,
//       phoneNumber:"",
//       type:"buyerSeller"
//   }
// }

class signup extends Component{ 
  // const [user, setUser] = useState({
  //   name :"" ,
  //         email :"" ,
  //         password:"",
  //         type:"buyerSeller",
  //         phoneNumber:""
  // })
  state = {
    user:{
      name :"" ,
      email :"" ,
      password:"",
      type:"buyerSeller",
      phoneNumber:""
    },
    repassword:"",
    action:false,

  }
  // const  [repassword, setRepassword] = useState("");
  // const [action, setAction] = useState({
  //   success:false
  // })
  // const [action, setAction] = useState(false)
  render() {
  const responseGoogle =(response)=>{
    
    // setUser({
    //   ...user,
    //   name:response.profileObj.name,
    //   email:response.profileObj.email,
    //   phoneNumber:response.profileObj.phoneNumber,
    //   image:[response.profileObj.imageUrl]
    //   // type:"buyerSeller"
    // })
    this.setState({
      ...this.state,
      user:{
        ...this.state.user,
        name:response.profileObj.name?response.profileObj.name:"",
        email:response.profileObj.email?response.profileObj.email:"",
        phoneNumber:response.profileObj.phoneNumber?response.profileObj.phoneNumber:"",
        image:response.profileObj.imageUrl?[response.profileObj.imageUrl]:[],
      }
    })

    // console.log('user',response.profileObj.name)
    // console.log('user',user)
    // console.log('response',response)
    const login = {
      login:true
    }
    localStorage.setItem('login',login);
    // this.state.user.password = hashPassword.generate(this.state.user.password);
    this.props.addUser(this.state.user).then(res=>{
        const {token} = res;
        // console.log(token,"token");
        
        if(token){
        //   setAction({
        //     success:true
        //  });
        // setAction(true)
        console.log('true')
        this.setState({
          ...this.state,
          action:true
        })
          notify();
          // console.log('action',action)
            // const userResponds =jwt.decode(token);
            // const userDetails ={
            //     _id:userResponds._id,
            //     name :userResponds.name,
            //     email : userResponds.email,
            //     type : userResponds.type,
            //     phoneNumber :userResponds.phoneNumber
            // }

            // console.log('decode token userRespond',userResponds);
            // console.log('send details to redux',userDetails)
            // localStorage.setItem('user',token);
            window.location.href = '/'
            // dispatch({type:'ADD_USER',payload:userDetails})
            // resolve(res.data);
        }
        else{
          // resolve(res.data);
        //   setAction(({
        //     success:false
        //  }));
        console.log('false')
        this.setState({
          ...this.state,
          action:false
        })
          notify();
        }
      
         
    }).catch(err=>{
        console.log(err)
        // reject(err)
        this.setState({
          ...this.state,
          action:false
        })
          notify();
    })
    // while(user){

    // }
    // window.location.href = '/'

  }
  const formHandler =(e)=>{
    // setUser({
    //   ...this.user,
    //   [e.target.name]:e.target.value
    // })
  //   setUser(prevState => ({
  //     ...prevState,
  //     [e.target.name]:e.target.value
  // }));
  this.setState({
    ...this.state,
    user:{
      ...this.state.user,
      [e.target.name]:e.target.value
    }
  })
  
  }
  const submitHandler=(e)=>{
    // console.log(user,"user");
    e.preventDefault();
    // user.type= "buyerSeller"
    // this.setState({
    //   ...this.state,
    //   user:{
    //     ...this.state.user,
    //     type:""
    //   }
    // })
    this.state.user.password = hashPassword.generate(this.state.user.password);
    this.props.addUser(this.state.user).then(res=>{
      console.log(res,"res.data")
        const {token} = res;
        // console.log(token,"token");
        
      
         if(token){
        //   setAction({
        //     success:true
        //  });
        // setAction(true)
        console.log('true')
        this.setState({
          ...this.state,
          action:true
        })
          notify();
          const login = {
            login:false
          }
          localStorage.setItem('login',login);
          // console.log('action',action)
            // const userResponds =jwt.decode(token);
            // const userDetails ={
            //     _id:userResponds._id,
            //     name :userResponds.name,
            //     email : userResponds.email,
            //     type : userResponds.type,
            //     phoneNumber :userResponds.phoneNumber
            // }

            // console.log('decode token userRespond',userResponds);
            // console.log('send details to redux',userDetails)
            // localStorage.setItem('user',token);
            window.location.href = '/'
            // dispatch({type:'ADD_USER',payload:userDetails})
            // resolve(res.data);
        }
        else{
          // resolve(res.data);
        //   setAction(({
        //     success:false
        //  }));
        console.log('false')
        this.setState({
          ...this.state,
          action:false
        })
          notify();
        }
         
    }).catch(err=>{
        console.log(err)
        // reject(err)
    })
  }
  const notify = () => this.state.action ? toast.success('singup is successfull!', {
    position:"bottom-right",
    autoClose:2000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:true,
    progress:undefined,
}) :  toast.error('Action was unsuccessful, please check and try again!', {
    position:"bottom-right",
    autoClose:2000,
    hideProgressBar:false,
    closeOnClick:true,
    pauseOnHover:true,
    draggable:true,
    progress:undefined,
}) 
  return(
 
  <Form className="user-form-centered">
      <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
      <Icon name="signup"/>   Sign Up
                </Header>
    <Form.Field >
    <div>
    <Icon name="user"/>
      <label >Name<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Name'name="name" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="mail"/>
      <label>Email<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Email' name="email" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="phone"/>
      <label>phoneNumber<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input className="userinput" placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Password' name="password" type="password" onChange={formHandler} />
    </Form.Field>
    <Form.Field>
    <div>
    <Icon name="key"/>
      <label>Re Enter Password<span style={{ color: '#FF0000' }}>*</span></label>
      </div>
      <input placeholder='Re Enter Password'name="Repassword" type="password" onChange={(e)=>{this.setState({...this.state,repassword:[e.target.value]})}}/>
    </Form.Field>
    <Form.Field >
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit' onClick={submitHandler}>Signup</Button>
    <Header as="h4"  textAlign='center' >
    OR
</Header>
    <GoogleLogin
    clientId="433588545715-a0rf1qdeefuafa8kn13lh9g2v810v9ri.apps.googleusercontent.com"
    buttonText="Sign up with Google"
    onSuccess={responseGoogle}
    onFailure={()=>{ this.setState({
      ...this.state,
      action:true
    })
      notify();}}
    cookiePolicy={'single_host_origin'}
    />
    
    
    <Header as="h4"  textAlign='center' >
    Have an account? <a href="/signin" style={{ color: '#076AE0' }}>  Login Here</a>
</Header>
    <ToastContainer/>
  </Form>
)
  }
}
const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { addUser })(signup)


// import React, { useState } from 'react'
// import { Button, Checkbox, Form, Header, Icon } from 'semantic-ui-react'
// import GoogleLogin, { GoogleLogout } from 'react-google-login'
// import axios from "axios"
// import hashPassword from 'password-hash'
// import jwt from 'jsonwebtoken'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // constructor(props){
// //   super(props);
// //   this.state={
// //      name :"" ,
// //       email :"" ,
// //       phoneNumber:"",
// //       type:"buyerSeller"
// //   }
// // }

// function Signup () { 
//   const [user, setUser] = useState({
//     name :"" ,
//           email :"" ,
//           password:"",
//           type:"buyerSeller",
//           phoneNumber:""
//   })
//   const  [repassword, setRepassword] = useState("");
//   // const [action, setAction] = useState({
//   //   success:false
//   // })
//   const [action, setAction] = useState(false)
//   const responseGoogle =(response)=>{
//     setUser({
//       ...user,
//       name:response.profileObj.name,
//       email:response.profileObj.email,
//       phoneNumber:response.profileObj.phoneNumber,
//       image:[response.profileObj.imageUrl]
//       // type:"buyerSeller"
//     })
//     console.log('user',response.profileObj.name)
//     console.log('user',user)
//     console.log('response',response)
//     const login = {
//       login:true
//     }
//     localStorage.setItem('login',login);
//     // while(user){

//     // }
//     // window.location.href = '/'

//   }
//   const formHandler =(e)=>{
//     // setUser({
//     //   ...this.user,
//     //   [e.target.name]:e.target.value
//     // })
//     setUser(prevState => ({
//       ...prevState,
//       [e.target.name]:e.target.value
//   }));
  
//   }
//   const submitHandler=(e)=>{
//     console.log(user,"user");
//     e.preventDefault();
//     user.type= "buyerSeller"
//     user.password = hashPassword.generate(user.password);
//     axios.post('http://localhost:5000/user/add',user).then(res=>{
//         const token = res.data;
//         console.log(token,"token");
//         if(token =='Email Already Exists'){
//           // resolve(res.data);
//         //   setAction(({
//         //     success:false
//         //  }));
//         console.log('false')
//         setAction(false);
//           notify();
//         }
      
//         else if(token){
//         //   setAction({
//         //     success:true
//         //  });
//         // setAction(true)
//         console.log('true')
//         setAction(true)
//           notify();
//           console.log('action',action)
//             const userResponds =jwt.decode(token);
//             const userDetails ={
//                 _id:userResponds._id,
//                 name :userResponds.name,
//                 email : userResponds.email,
//                 type : userResponds.type,
//                 phoneNumber :userResponds.phoneNumber
//             }

//             console.log('decode token userRespond',userResponds);
//             console.log('send details to redux',userDetails)
//             localStorage.setItem('user',token);
//             // window.location.href = '/'
//             // dispatch({type:'ADD_USER',payload:userDetails})
//             // resolve(res.data);
//         }
         
//     }).catch(err=>{
//         console.log(err)
//         // reject(err)
//     })
//   }
//   const notify = () => action ? toast.success('singup is successfull!', {
//     position:"bottom-right",
//     autoClose:2000,
//     hideProgressBar:false,
//     closeOnClick:true,
//     pauseOnHover:true,
//     draggable:true,
//     progress:undefined,
// }) :  toast.error('Action was unsuccessful, please check and try again!', {
//     position:"bottom-right",
//     autoClose:2000,
//     hideProgressBar:false,
//     closeOnClick:true,
//     pauseOnHover:true,
//     draggable:true,
//     progress:undefined,
// }) 
//   return(
 
//   <Form className="user-form-centered">
//       <Header as='h2' style={{ color: '#076AE0' }} textAlign='center'>
//       <Icon name="signup"/>   Sign Up
//                 </Header>
//     <Form.Field >
//     <div>
//     <Icon name="user"/>
//       <label >Name<span style={{ color: '#FF0000' }}>*</span></label>
//       </div>
//       <input placeholder='Name'name="name" onChange={formHandler} />
//     </Form.Field>
//     <Form.Field>
//     <div>
//     <Icon name="mail"/>
//       <label>Email<span style={{ color: '#FF0000' }}>*</span></label>
//       </div>
//       <input placeholder='Email' name="email" onChange={formHandler} />
//     </Form.Field>
//     <Form.Field>
//     <div>
//     <Icon name="phone"/>
//       <label>phoneNumber<span style={{ color: '#FF0000' }}>*</span></label>
//       </div>
//       <input className="userinput" placeholder='phoneNumber' name="phoneNumber" onChange={formHandler} />
//     </Form.Field>
//     <Form.Field>
//     <div>
//     <Icon name="key"/>
//       <label>Password<span style={{ color: '#FF0000' }}>*</span></label>
//       </div>
//       <input placeholder='Password' name="password" type="password" onChange={formHandler} />
//     </Form.Field>
//     <Form.Field>
//     <div>
//     <Icon name="key"/>
//       <label>Re Enter Password<span style={{ color: '#FF0000' }}>*</span></label>
//       </div>
//       <input placeholder='Re Enter Password'name="Repassword" type="password" onChange={(e)=>{setRepassword(e.target.value)}}/>
//     </Form.Field>
//     <Form.Field >
//       <Checkbox label='I agree to the Terms and Conditions' />
//     </Form.Field>
//     <Button type='submit' onClick={submitHandler}>Signup</Button>
//     <Header as="h4"  textAlign='center' >
//     OR
// </Header>
//     <GoogleLogin
//     clientId="433588545715-a0rf1qdeefuafa8kn13lh9g2v810v9ri.apps.googleusercontent.com"
//     buttonText="Sign up with Google"
//     onSuccess={responseGoogle}
//     onFailure={()=>console.log('err')}
//     cookiePolicy={'single_host_origin'}
//     />
    
    
//     <Header as="h4"  textAlign='center' >
//     Have an account? <a href="/signin" style={{ color: '#076AE0' }}>  Login Here</a>
// </Header>
//     <ToastContainer/>
//   </Form>
// )
// }

// export default Signup
