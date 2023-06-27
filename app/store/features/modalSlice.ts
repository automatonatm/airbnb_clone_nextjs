import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  isOpenLoginModal: boolean;
  isOpenRegisterModal: boolean;
  isOpenRentModal: boolean;
  isOpenSearchModal: boolean;
}

const initialState = {
  isOpenLoginModal: false,
  isOpenRegisterModal: false,
  isOpenRentModal: false,
  isOpenSearchModal: false,
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

    onOpenSearchModal: (state) => {
      state.isOpenSearchModal = true;
    },
    onCloseSearchModal: (state) => {
      state.isOpenSearchModal = false;
    },

  },
});

export const {
  onOpenLoginModal,
  onCloseLoginModal,
  onOpenRegisterModal,
  onCloseRegisterModal,
  onOpenRentModal,
  onCloseRentModal,
  onOpenSearchModal,
  onCloseSearchModal,
} = modalSlice.actions;

export default modalSlice.reducer;
