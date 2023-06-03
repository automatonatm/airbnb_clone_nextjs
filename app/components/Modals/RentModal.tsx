"use client"
import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import Modal from './Modal';
import { onCloseRentModal } from '@/app/store/features/modalSlice';
import { useMemo, useState } from 'react';

enum STEPS {
  CATEGORY = 0,
  LOCATION  = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5
}

const RentModal = () => {

  const [step, setStep] = useState(STEPS.CATEGORY)

  const { isOpenRentModal } = useAppSelector((state) => state.modalReducer);

  const dispatch = useAppDispatch()


  const onBack = () => {
    setStep((value) => value - 1)
  }

  const onNext = () => {
    setStep((value) => value + 1);
  };


  const actionLabel = useMemo(() => {

    if(step === STEPS.PRICE)
     {
      return 'Create'
     }

     return "Next"

  }, [step])


  const secondaryActionLabel = useMemo(() => {

    if(step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'


  }, [step])



  return (
    <Modal
      title="Airbnb your home"
      isOpen={isOpenRentModal}
      onClose={() => {
        dispatch(onCloseRentModal());
      }}
      onSubmit={() => {
        dispatch(onCloseRentModal());
      }}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
