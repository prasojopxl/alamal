import axios from "axios"
import { keyApi, keyApi2, urlApi, urlBase } from "./vars";

export const axiosInstance = axios.create({
    baseURL: urlApi,
});

const config = {
    headers: {
        'Authorization': 'Bearer ' + keyApi
    }
}
const config2 = {
    headers: {
        'Authorization': 'Bearer ' + keyApi2
    }
}

export const getDataSelf = (url: string) => axios.get(`${urlBase + url}`)
    .then((res) => {
        return res
    }).catch((error) => {
        console.log(error)
    })

export const getData = (url: string) => axios.get(`${urlApi + url}`, config)
    .then((res) => {
        return res
    }).catch((error) => {
        console.log(error)
    })

export const getData2 = (url: string) => axios.get(`${urlApi + url}`, config2)
    .then((res) => {
        return res
    }).catch((error) => {
        console.log(error)
    })

export const getDataOpen = (url: string) => axios.get(`${urlApi + url}`)
    .then((res) => {
        return res
    }).catch((error) => {
        console.log(error)
    })    
