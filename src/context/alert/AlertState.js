import React, {useReducer} from 'react'
import {AlertContext} from "./alertContext";
import {alertReducer, HIDE_ALERT, SHOW_ALERT} from "./alertReducer";


export const AlertState = ({children}) => {
  const [state, dispatch] = useReducer(alertReducer,{visible: false})

  const show = (text, type = 'warning') => {
    dispatch({
      type: SHOW_ALERT,
      payload: {text, type}
    })
    setTimeout(hide, 2500)
  }
  const hide = () => dispatch({type: HIDE_ALERT})
  return(
    <AlertContext.Provider value={{show, hide, alert: state}}>
      {children}
    </AlertContext.Provider>
  )
}


