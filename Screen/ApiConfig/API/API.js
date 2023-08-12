import { Component } from 'react';
import axios from 'axios';
import URLs from './URLs';

const CONTENT_TYPE = 'application/json';
const API_TIMEOUT = 300000;
const API_KEY = 'CiSOtCc3cFhOJFwXWSddh5i7OtKcmuBfEKvHlcPfGPwYegGOfN';


// Set Header And Interceptors
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE;
axios.defaults.headers.post['Accept'] = CONTENT_TYPE;
axios.defaults.timeout = API_TIMEOUT;
axios.interceptors.request.use((config) => {
    // config.data = {
    //     ...config.data,
    //     "Authorization": "CiSOtCc3cFhOJFwXWSddh5i7OtKcmuBfEKvHlcPfGPwYegGOfN", //Fixed For All Api Call
    //     "Host": "calculated when request is sent"

    // }

    config.headers['Authorization'] = 'CiSOtCc3cFhOJFwXWSddh5i7OtKcmuBfEKvHlcPfGPwYegGOfN'; // Fixed For All Api Call
    config.headers['Host'] = '<calculated when request is sent>'; // Replace with your actual host
    return config;
   
})
axios.interceptors.response.use((response) => {
    return response;
})

export function APIControllerResponse(object, error) {
    this.object = object
    this.error = error
}


//Actual Call Api And Handle Response

export default class API extends Component {
    async AxiosApi(URL, Data, Method, baseURL) {
        return new Promise((resolve, reject) => {
            const options = {
                url: URL,
                method: Method || 'POST',
                data: Data,
                baseURL: baseURL || URLs.MainBaseURL
            };
            console.log('options:', options)
            axios(options)
                .then(response => {
                    console.log("response===",response);
                    if (response.status === 200) {
                        resolve(new APIControllerResponse(response.data, null))
                    }
                    else {
                        resolve(new APIControllerResponse(null, { code: response.status, message: response.statusText }))
                    }
                })
                .catch(error => {
                    console.log("error===",error);

                    if (error.response) {
                        resolve(new APIControllerResponse(null, { code: error.code, message: error.message }))
                    } else if (error.request) {
                        resolve(new APIControllerResponse(null, { code: error.code, message: error.message }))
                    } else {
                        resolve(new APIControllerResponse(null, { code: error.code, message: error.message }))
                    }
                })
        })
    }
}

API.shared = new API();