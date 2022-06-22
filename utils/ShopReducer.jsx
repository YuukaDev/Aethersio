export const initialState = {
  message: [],
  user: [],
};

const shopReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_USER":
      return { ...state, user: payload.user };
    case "SET_MESSAGE":
      return { ...state, message: payload.message };
  }
};

export default shopReducer;
