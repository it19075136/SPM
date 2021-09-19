import axios from 'axios';
import * as actionType from '../../utils/constants';

export const publishSparepartsAd = (payload) => dispatch => {
    return new Promise ((resolve, reject) => {
        axios.post('http://localhost:5000/spareparts', payload)
        .then(res => {
            if(res.status == 200){
                dispatch({
                    type: actionType.ADD_SPAREPARTS_AD,
                    payload: res.data
                })
                resolve(res.data);
            }
            else    
                resolve(res);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const updateSparepartsAd = (payload, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:5000/spareparts/${id}`, payload).then((res) => {
            if(res.status == 200) {
                dispatch({
                    type: actionType.UPDATE_SPAREPARTS_AD,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res.data);
        }).catch((err) => {
            reject(err);
        })
    })
}

export const deleteSparepartsAd = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:5000/spareparts/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: actionType.DELETE_SPAREPARTS_AD,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res)
        }).catch((err) => {
            reject(err);
        })
    });
}

export const getSparepartAdById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/spareparts/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: actionType.GET_SPAREPARTS_AD_BY_ID,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res)
        }).catch((err) => {
            reject(err);
        })
    });
}

export const getPublishedSparepartsAds = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/spareparts/published/ads').then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: actionType.GET_PUBLISHED_SPAREPARTS_ADS,
                    payload: res.data
                })
                resolve(res.data)
            }
            else
                resolve(res)
        }).catch((err) => {
            reject(err);
        })
    });
}

export const getAllSparePartsAds = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/spareparts/').then((res) => {
            if(res.status == 200){
                dispatch({
                    type: actionType.GET_ALL_SPAREPARTS_ADS,
                    payload: res.data
                })
                resolve(res.data)
            }
            else    
                resolve(res.data)
        }).catch((err) => {
            reject(err);
        })
    })
}