import { createSlice } from '@reduxjs/toolkit';


interface LoginState {
  isOpen: boolean;
}

const initialState = {
    isOpen: false
}  as LoginState
 

 const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    reset: () => initialState,
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});


export const { reset, onClose, onOpen } = loginSlice.actions;

export default loginSlice.reducer


