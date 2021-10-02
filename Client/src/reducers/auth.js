import { AUTH , LOGOUT } from '../constantes/actionTypes'




const authReducer = ( state ={authData: null},action) => {
    switch ( action.type ) {
        case AUTH:
            localStorage.setItem('profile' , JSON.stringify({...action?.data}) );
            return {...state, authData : action?.data};
        case LOGOUT:
            localStorage.clear();
            return ;
       
        default:
            return posts;           
    }
}

export default authReducer