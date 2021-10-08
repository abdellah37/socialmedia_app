import { AUTH } from '../constantes/actionTypes'
import * as api from '../api';


export const signup = (formData,history) => async (dispatch) => {
    
    try{
        const { data } = await api.signUp(formData);
        console.log("hadi data");
        console.log(data);
        console.log("hadi data");
        
        dispatch({ type: AUTH, data });
    

        history.push('/');

    } catch ( error ) {
     console.log(error.message);
         
    }


}

export const signin = (formData,history) => async (dispatch) => {
    
    try{
        const { data } = await api.signIn(formData);
        console.log("data sign up ", data)

        dispatch( {type: AUTH, data });

        history.push('/');

    } catch ( error ) {
     console.log(error.message);
         
    }


}