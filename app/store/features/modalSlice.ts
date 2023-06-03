import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpenLoginModal: boolean;
  isOpenRegisterModal: boolean;
  isOpenRentModal: boolean;
}

const initialState = {
  isOpenLoginModal: false,
  isOpenRegisterModal: false,
  isOpenRentModal: false,
} as ModalState;

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    reset: () => initialState,

    onOpenLoginModal: (state) => {
      state.isOpenLoginModal = true;
    },
    onCloseLoginModal: (state) => {
      state.isOpenLoginModal = false;
    },

    
    onOpenRegisterModal: (state) => {
      state.isOpenRegisterModal = true;
    },
    onCloseRegisterModal: (state) => {
      state.isOpenRegisterModal = false;
    },


    onOpenRentModal: (state) => {
      state.isOpenRentModal = true;
    },
    onCloseRentModal: (state) => {
      state.isOpenRentModal = false;
    },
  },
});

export const {
  onOpenLoginModal,
  onCloseLoginModal,
  onOpenRegisterModal,
  onCloseRegisterModal,
  onOpenRentModal,
  onCloseRentModal
} = modalSlice.actions;

export default modalSlice.reducer;
