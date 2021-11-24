import { AUTH , LOGOUT ,ERRORSIGNIN, RESET,RESETUP,ERRORSIGNUP} from '../constantes/actionTypes'




const authReducer = ( state ={authData: null},action) => {
    switch ( action.type ) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

         return { ...state, authData: action.data, loading: false, errors: null };
            

            
        case LOGOUT:
            localStorage.clear();
        return { ...state, authData: null, loading: false, errors: null };

        case ERRORSIGNIN:

        return { ...state, authData: null, loading: false, wrongpassword : true  , errors: null };
        case ERRORSIGNUP:
        return { ...state, authData: null, loading: false, differntPass : true  , errors: null };
        case RESETUP:
        return { ...state, authData: null, loading: false, differntPass : false  , errors: null };
        case RESET:
        return { ...state, authData: null, loading: false, wrongpassword : false  , errors: null };
        default:
        return state;           
    }
}

export default authReducer 