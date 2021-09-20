import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
export const addUser =(payload)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/add',payload).then(res=>{
        
        const {token} = res.data;
        console.log(token,"token");
        
      
         if(token){
        //   setAction({
        //     success:true
        //  });
        // setAction(true)
       
          // console.log('action',action)
            const userResponds =jwt.decode(token);
            const userDetails ={
                _id:userResponds._id,
                name :userResponds.name,
                email : userResponds.email,
                type : userResponds.type,
                phoneNumber :userResponds.phoneNumber,
                password:userResponds.password,
                // wishList:userResponds.wishList,

            }

            console.log('decode token userRespond',userResponds);
            console.log('send details to redux',userDetails)
            localStorage.setItem('user',token);
            // window.location.href = '/'
            dispatch({type:'ADD_USER',payload:userDetails})
            resolve(res.data);
        }
        // else(token =='Email Already Exists'){
        //   // resolve(res.data);
        // //   setAction(({
        // //     success:false
        // //  }));
        // resolve(res.data);
        // }
        resolve(res.data);
         
    }).catch(err=>{
        console.log(err)
        // reject(err)
        // this.setState({
        //   ...this.state,
        //   action:false
        // })
        //   notify();
        resolve(err);
    })
    })
}

export const getUser =(payload)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/getUser', payload).then((res) => {
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
              // const login = {
              //   login: true
              // }
              // localStorage.setItem('login', login);
              const userResponds =jwt.decode(token);
              const userDetails ={
                _id:userResponds._id,
                name :userResponds.name,
                email : userResponds.email,
                type : userResponds.type,
                phoneNumber :userResponds.phoneNumber,
                password:userResponds.password,
                wishList:userResponds.wishList ? userResponds.wishList: [],
                image:userResponds.image ? userResponds.image: []
              }
            //   setAction(({
            //    success:true
            // }));
        //     this.setState({
        //     ...this.state,
        //     action:true
        //   })
            //   setAction(prevState => ({
            //     ...prevState,
            //    success:true
            // }));
            //  console.log('action',action)
              
              console.log('decode token userRespond', userResponds);
              dispatch({type:'ADD_USER',payload: userResponds})
              localStorage.setItem('user', token);
              console.log('in findUser');
              resolve(res.data)
              // resolve(userResponds);
            //   window.location.href = '/'
            //   notify();
            }
            else {
            //   setAction(({
            //     success:false
            //  }));
            //  this.setState({
            //   ...this.state,
            //   action:false
            // })
            //   notify();
            //   console.log('in else');
            resolve(res.data)
            }
            resolve(res.data)
            // reject('err')
          }).catch((err) => {
          //   setAction(({
          //     success:false
          //  }));
        //    this.setState({
        //     ...this.state,
        //     action:false
        //   })
        resolve(err)
        //     notify();
        //     console.log('err');
        //     console.log(err);
            // reject('error')
          })
})
}

export const getCode =(payload)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/getCode', payload).then((res) => {
        //localstorage ekati reducx ekati danna oneda
        const { token } = res.data;
        localStorage.setItem('updatePasswordDetails', token);
           const userResponds  =jwt.decode(token);
           const userDetails ={
            _id:userResponds._id,
            name :userResponds.name,
            email : userResponds.email,
            type : userResponds.type,
            phoneNumber :userResponds.phoneNumber,
            password:userResponds.password,
            wishList:userResponds.wishList ? userResponds.wishList: [],
            image:userResponds.image ? userResponds.image: []
          }
        if(token){

          // localStorage.setItem('user', token);
          // dispatch({type:'ADD_USER',payload:userDetails});
        console.log('action axios');
        console.log(token);
        resolve(res.data)
        }
        resolve(res.data)
        
        // window.location.href = '/forgetPassword'
      }).catch((err) => {
        // reject(err)
        resolve(err)
      })
})
}


export const userUpdate =(payload,decodeItem)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post(`http://localhost:5000/user/update/${decodeItem._id}`, payload).then((res) => {
            console.log('in post');
            const { token } = res.data;
            if (token) {
                // setAction(({
                //     success:true
                //  }));
                // this.setState({
                //     ...this.state,
                //     action:true
                //   })
                //   notify();
                localStorage.setItem('user',token);
                const userResponds = jwt.decode(token);
                const userDetails = {
                    _id: userResponds._id,
                    name: userResponds.name,
                    email: userResponds.email,
                    type: userResponds.type,
                    phoneNumber: userResponds.phoneNumber,
                    wishList:userResponds.wishList,
                    image:userResponds.image,
                    password:userResponds.password
                }
               
                console.log(userDetails);

                
                dispatch({type:'ADD_USER',payload:userDetails});
                resolve(res.data);
            }
            else{
                // this.setState({
                //     ...this.state,
                //     action:false
                //   })
                //   notify();
                resolve(res.data);
            }
            // setAction(({
            //     success:false
            //  }));
           
        }).catch((err) => {
            // reject(err)
            // setAction(({
            //     success:false
            //  }));
            // this.setState({
            //     ...this.state,
            //     action:false
            //   })
            //   notify();
              resolve(err);
        })

})
}

export const login = (payload) => dispatch => {
  dispatch({ type: 'ADD_USER', payload: payload })
}
