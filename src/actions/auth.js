import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index.js'

export const signin = (formData, history) => async(dispatch) => {
    try {
        //log in the user
        //returning data from sign in
        const { data } = await api.signIn(formData)

        dispatch({ type: AUTH,data})

        history.push('/')
    } catch (error) {
        console.log(error)
    }

}

export const signup = (formData, history) => async(dispatch) => {
    console.log(formData)
    try {
        //sign up the user
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH,data})

        history.push('/')
    } catch (error) {
        console.log(error)
    }

}