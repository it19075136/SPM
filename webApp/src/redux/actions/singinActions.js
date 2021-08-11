import axios from "axios"
import passwordHash from "password-hash"
import jwt from 'jsonwebtoken'
export const  findUser=(user)=>dispatch=>{

    return new Promise((resolve,reject)=>{
        console.log(user);
        axios.post('http://localhost:5000/user/getUser',user).then((res)=>{
            console.log('in dispathc');
            
            const {password} = res.data;
            // password = jwt.decode(password);
            console.log('res.data', res.data);
            // console.log('token', token);
            console.log('password',password);
            console.log(user.password);
            if(passwordHash.verify(user.password,password)){
                // const userResponds =jwt.decode(token);
            // const userDetails ={
            //     _id:userResponds._id,
            //     name :userResponds.name,
            //     email : userResponds.email,
            //     gender : userResponds.gender,
            //     type : userResponds.type,
            // }
            const {token}= res.data;
            const userResponds=jwt.decode(token)
            console.log('decode token userRespond',userResponds);
                dispatch({type:'ADD_USER',payload: userResponds})
                localStorage.setItem('user',token);
                console.log('in findUser');
                resolve(userResponds);
            }
            else{
                console.log('in else');
            }
            // reject('err')
        }).catch((err)=>{
            console.log('err');
            console.log(err);
            reject('error')
        })
    }) 
    
}
export const updatePassword=(email)=>dispatch=>{
    return new Promise((resolve,reject)=>{
        console.log(email);
        const user ={
            email:email
        }
        axios.post('http://localhost:5000/user/getCode',user).then((res)=>{
            //localstorage ekati reducx ekati danna oneda
            const {token} =res.data;  
            localStorage.setItem('updatePasswordDetails',token);
        //    const  =jwt.decode(details);
        //     dispatch({type:'ADD_USER',payload:res.data});
            console.log('action axios');
            console.log(token);
            resolve(token)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export const addNewPassword=(user)=>dispatch=>{
    return new Promise((resolve,reject)=>{
        const password = passwordHash.generate(user.password);
        console.log('in promise in addNewPAssword')
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
                gender : userResponds.gender,
                type : userResponds.type,
                phoneNumber :userResponds.phoneNumber
            }
            console.log(userDetails);
            dispatch({type:'ADD_USER',payload:userDetails});
            resolve(userDetails);
        }
        }).catch((err)=>{
            reject(err)
        })
    })
}