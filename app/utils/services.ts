import axios from "axios"
import { keyApi, urlApi } from "./vars";

export const axiosInstance = axios.create({
    baseURL: urlApi,
});

const config = {
    headers: {
        'Authorization': 'Bearer ' + keyApi
    }
}


export const getData = (url: string) => axios.get(`${urlApi + url}`, config)
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
