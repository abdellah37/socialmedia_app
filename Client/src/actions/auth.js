import { AUTH ,ERRORSIGNIN,RESET, ERRORSIGNUP} from "../constantes/actionTypes";
import * as api from "../api";

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log("hadi data");
    console.log(data);
    console.log("hadi data");

    if (data === "invalid") {
      console.log("data sign up ", data);

      dispatch({ type: ERRORSIGNUP });

      history.push("/auth");
    } else {

      dispatch({type : RESET});
      console.log("data sign in ", data);

      dispatch({ type: AUTH, data });

      history.push("/");
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    if (data === "invalid") {
      console.log("data sign in ", data);

      dispatch({ type: ERRORSIGNIN });

      history.push("/auth");
    } else {
      dispatch({type : RESET});
      console.log("data sign in ", data);

      dispatch({ type: AUTH, data });

      history.push("/");
    }
  } catch (error) {
    console.log(error.message);
  }
};
