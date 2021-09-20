import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    //Log in the user
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    //Sign up the user
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};