import axios from 'axios';
import { ADD_VEHICLE_AD, DELETE_VEHICLE_AD, GET_ALL_VEHICLE_ADS, GET_PUBLISHED_VEHICLE_ADS, GET_VEHICLE_AD_BY_ID, UPDATE_VEHICLE_AD } from '../../utils/constants';

export const publishVehicleAd = (payload) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/vehicle', payload)
            .then(res => {
                if (res.status == 200) {
                    dispatch({
                        type: ADD_VEHICLE_AD,
                        payload: res.data
                    })
                    resolve(res.data);
                }
                else
                    resolve(res);
            }).catch((err) => {
                reject(err)
            })
    })
}

export const updateVehicleAd = (payload, id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`http://localhost:5000/vehicle/${id}`, payload).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: UPDATE_VEHICLE_AD,
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

export const deleteVehicleAd = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:5000/vehicle/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: DELETE_VEHICLE_AD,
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

export const getVehicleAdById = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/vehicle/${id}`).then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: GET_VEHICLE_AD_BY_ID,
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

export const getPublishedVehicleAds = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/vehicle/published/ads').then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: GET_PUBLISHED_VEHICLE_ADS,
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

export const getPendingVehicleAds = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/vehicle/pending/ads').then((res) => {
            if (res.status == 200) {
                dispatch({
                    type: GET_ALL_VEHICLE_ADS,
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