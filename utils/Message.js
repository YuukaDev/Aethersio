import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
};

function reducer(state, action) {
    switch (action.type) {

    }
}

export function MessageProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <MessageProvider value={value}>{children}</MessageProvider>
}