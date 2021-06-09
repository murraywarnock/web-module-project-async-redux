//Holiday API key:
// eb9fa68e-817f-45c3-bd47-c388834e0dc8

import axios from 'axios';
import { COUNTRIES_URL, API_KEY } from '../constants/index'

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAIL = "FETCH_FAIL";


//1. is our action creator returning an object.
//2. if so pass into reducer as usual.
//3. is our action creator returning a function?
//4. if so, pass dispatch into that function and let the action do what it wants.

export const getCountry = () => {
    return (dispatch) => {
        //1. Fetch_Start
        dispatch(fetchStart());
        
        //2. fetch data from api
        axios.get(`${COUNTRIES_URL}?key=${API_KEY}`)
        .then(resp => {
            //3. if fetch is successful, Fetch_Success with that data
           
            const max = resp.data.countries.length;
            const randomCountryIndex = Math.floor(Math.random() * max);

            console.log("randomCountryIndex: ", randomCountryIndex);

            dispatch(fetchSuccess(resp.data.countries[randomCountryIndex]));
        })
        .catch(err=>{
            //4. if fetch is not successful, Fetch_Fail with error message
            dispatch(fetchFail(err));
        });

    }
}


export const fetchStart = ()=> {
    return({type: FETCH_START});
}

export const fetchSuccess = (country)=> {
    return({type: FETCH_SUCCESS, payload:country});
}

export const fetchFail = (error)=> {
    return({type: FETCH_FAIL, payload:error});
}