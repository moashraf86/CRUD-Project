import streams from '../apis/streams';
import history from '../customHistory';


import { 
  SIGN_IN,
  SIGN_OUT, 
  CREATE_STREAM, 
  EDIT_STREAM, 
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM } from "./types"

// SIGN IN ACTION CREATOR
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  }
}
// SIGN OUT ACTION CREATOR
export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

export const createStream = (formValues) => {
  return async (dispatch, getState) => {
    const {userId} = getState().auth;
    const response = await streams.post('/streams', {...formValues, userId})
    dispatch({type: CREATE_STREAM, payload: response.data})

    //Run Programmatic Navigation to get the user back  to streamsList
    history.push('/streams')
    window.location.reload()
  }
}

export const editStream = (id,formValues) => {
  return async (dispatch) => {
    const response = await streams.patch(`/streams/${id}`, formValues)
    dispatch({type: EDIT_STREAM, payload: response.data})

    //Run Programmatic Navigation to get the user back  to streamsList
    history.push('/streams')
    window.location.reload();
  }
}

export const fetchStream = (id, formValues) => {
  return async (dispatch) => {
    const response = await streams.get(`/streams/${id}`)
    dispatch({type: FETCH_STREAM, payload: response.data})
  }
}
export const fetchStreams = (formValues) => {
  return async (dispatch) => {
    const response = await streams.get('/streams')
    dispatch({type: FETCH_STREAMS, payload: response.data})
  }
}

export const deleteStream = (id) => {
  return async (dispatch) => {
    await streams.delete(`streams/${id}`)
    dispatch({type: DELETE_STREAM, payload: id})
  }
}
