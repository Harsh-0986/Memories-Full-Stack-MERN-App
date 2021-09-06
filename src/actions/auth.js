import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    //Log in the user

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    //Sign up the user

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
