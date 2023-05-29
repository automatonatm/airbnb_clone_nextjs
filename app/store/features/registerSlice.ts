import { createSlice } from '@reduxjs/toolkit';


interface RegisterState {
  isOpen: boolean;
}

const initialState = {
    isOpen: false
}  as RegisterState


 const registerSlice = createSlice({
  name: 'register',
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


export const {reset, onClose, onOpen} = registerSlice.actions

export default registerSlice.reducer


