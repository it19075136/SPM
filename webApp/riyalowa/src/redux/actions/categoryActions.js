import axios from "axios";
import * as actionType from '../../utils/constants';

export const getAllCategories = () => dispatch => {
    return new Promise((resolve,reject) => {
        axios.get('http://localhost:5000/category')
        .then(res => {
            if(res.status == 200){
                dispatch({
                    type : actionType.GET_ALL_CATEGORIES,
                    payload : res.data
                })
                resolve(res.data)
             }
             else{
                 resolve(res)
             }
        }).catch((err) => {
            reject(err);
        })
    });
}

export const deleteCategories = (id) => dispatch => {
    return new Promise((resolve,reject) => {
        axios.delete(`http://localhost:5000/category/${id}`)
        .then(res => {
            dispatch({
                type : actionType.DELETE_CATEGORIES,
                payload : id
            })
            resolve(res.data)
        }).catch((error) => {
            reject(error)
        })
    })
}