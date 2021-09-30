import axios from "axios"
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import { UPDATE_PENDING_SPAREPARTS_ADS, UPDATE_PENDING_VEHICLE_ADS ,ADD_USER} from "../../utils/constants"
export const addUser =(payload)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/add',payload).then(res=>{
        
        const {token} = res.data;
        console.log(token,"token");
        
      
         if(token){
        
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

            console.log('decode token userRespond',userResponds);
            console.log('send details to redux',userDetails)
            localStorage.setItem('user',token);
           
            dispatch({type:ADD_USER,payload:userDetails})
            resolve(res.data);
        }
       
        resolve(res.data);
         
    }).catch(err=>{
        console.log(err)
      
        resolve(err);
    })
    })
}

export const getUser =(payload)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/getUser', payload).then((res) => {
            console.log('in dispathc');
          
            console.log('res.data', res.data);
            
            const { token } = res.data;
              console.log('token', token)
              const userResponds = jwt.decode(token)
            if (userResponds.email){
              
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
              dispatch({type:ADD_USER,payload:userDetails})
           
              console.log('decode token userRespond', userResponds);
              dispatch({type:ADD_USER,payload: userResponds})
              localStorage.setItem('user', token);
              console.log('in findUser');
              resolve(res.data)
             
            }
            else {
           
            resolve(res.data)
            }
            resolve(res.data)
            
          }).catch((err) => {
         
        resolve(err)
      
          })
})
}

export const getCode =(payload)=>dispatch =>{
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/user/getCode', payload).then((res) => {
        
        const { token } = res.data;
        console.log("updatePasswordDetails",token)
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

          dispatch({type:ADD_USER,payload:userDetails})
        console.log('action axios');
        console.log(token);
        resolve(res.data)
        }
        resolve(res.data)
        
       
      }).catch((err) => {
       
        resolve(err)
      })
})
}


export const userUpdate =(payload,decodeItem)=>dispatch =>{
    return new Promise((resolve, reject) => {
      console.log("payload",payload)
      console.log("decodeItem",decodeItem)
        axios.post(`http://localhost:5000/user/update/${decodeItem._id}`, payload).then((res) => {
         
            const { token } = res.data;
            console.log('token',token);
            if (token) {
               
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
               
                console.log("userDetails",userDetails);

                
                dispatch({type:ADD_USER,payload:userDetails});
                resolve(res.data);
            }
            else{
                
                resolve(res.data);
            }
           
           
        }).catch((err) => {
           
              resolve(err);
        })

})
}

export const getAllSellers = (type, pendingAds) => dispatch => {

  return new Promise((resolve, reject) => {
    axios.get('http://localhost:5000/user/').then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        if (pendingAds.find(elem => elem.userId == res.data[index]._id))
          pendingAds = [...pendingAds.filter(item => item.userId != res.data[index]._id), { ...pendingAds.find(elem => elem.userId == res.data[index]._id), userId: res.data[index].name }];
      }
      switch (type) {
        case "VEHICLE":
          dispatch({
            type: UPDATE_PENDING_VEHICLE_ADS,
            payload: pendingAds
          })
          break;
        case "SPAREPART":
          dispatch({
            type: UPDATE_PENDING_SPAREPARTS_ADS,
            payload: pendingAds
          })
          break;
        default:
          break;
      }
      resolve(pendingAds)
    }).catch((err) => {
      reject(err)
    })
  });
}

export const login = (payload) => dispatch => {
  dispatch({ type: ADD_USER, payload: payload })
}
export const deleteProfile =(payload)=>dispatch =>{
  return new Promise((resolve, reject) => {
      axios.delete(`http://localhost:5000/user/${payload._id}`).then(res=>{
     
      console.log(res.data,"res.data");

      resolve(res.data);
       
  }).catch(err=>{
      console.log(err)
    
      resolve(err);
  })
  })
}
