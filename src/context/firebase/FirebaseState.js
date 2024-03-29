import React, {useReducer} from "react";
import {FirebaseContext} from "./firebaseContext";
import {ADD_NOTE, FETCH_NOTES, firebaseReducer, REMOVE_NOTE, SHOW_LOADER} from "./firebaseReducer";
import axios from "axios";

// const url = process.env.REACT_APP_DB_URL

export const instance = axios.create({
  baseURL: 'https://todo-react-06.firebaseio.com/',
})

export const FirebaseState = ({children}) => {
  const initialState = {
    notes: [],
    loading: false
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchNotes = async () => {
    showLoader()
    const res = await instance.get(`notes.json`)

    const payload = Object.keys(res.data).map(key => {
      return {
        ...res.data[key],
        id: key
      }
    })
    dispatch({type: FETCH_NOTES, payload})
  }

  const addNote = async title => {
    const note = {
      title, data: new Date().toLocaleString()
    }
    try {
      const res = await instance.post(`notes.json`, note)
      const payload = {
        ...note,
        id: res.data.name
      }
      dispatch({type: ADD_NOTE, payload})
    } catch (e) {
      throw new Error(e.message)
    }
  }

  const removeNote = async id => {
    await instance.delete(`notes/${id}.json`)
    dispatch({type: REMOVE_NOTE, payload: id})
  }
  return (
    <FirebaseContext.Provider value={{
      showLoader, addNote, fetchNotes, removeNote,
      loading: state.loading,
      notes: state.notes
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}