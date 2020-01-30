import React, { createContext, useReducer } from "react";

// actions
export const SET_MODAL_ACTION = "SET_MODAL_ACTION";

const initialState = {
  modal: null
};

function reducer(state, { type, payload }) {
  if (type === SET_MODAL_ACTION) {
    return { ...state, modal: payload };
  }
  return state;
}

const AppContext = createContext();

export function AppStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
