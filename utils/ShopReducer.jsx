export const initialState = {
  message: [],
  user: {
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  },
};

const shopReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      return { ...state, ...payload };
    case "SET_MESSAGE":
      return { ...state, ...payload };
  }
};

export default shopReducer;
