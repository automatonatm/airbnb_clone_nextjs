'use client';

import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import Modal from './Modal';
import { onCloseRentModal } from '@/app/store/features/modalSlice';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  //Current step is 0
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { isOpenRentModal } = useAppSelector((state) => state.modalReducer);

  const dispatch = useAppDispatch();

  //Initialize form and it fields
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  });

  // watch the category
  const category = watch('category');
  const location = watch('location');

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [location])





  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

    

  //When back is click subtract step
  const onBack = () => {
    setStep((value) => value - 1);
  };

  //When Next is click add step
  const onNext = () => {
    setStep((value) => value + 1);
  };

  //Show this text on action label
  const actionLabel = useMemo(() => {
    //Button Label should be Creat if step = 5
    if (step === STEPS.PRICE) {
      return 'Create';
    }

    //Button Label should be Next since it not yet on close
    return 'Next';
  }, [step]);

  //set this step for secondary label
  const secondaryActionLabel = useMemo(() => {
    //Button is undefined is category = 0
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    //Button Label should be back
    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div
        className="
          grid
          max-h-[50vh]
          grid-cols-1
          gap-3
          overflow-y-auto
          md:grid-cols-2
         "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {setCustomValue('category', category)}}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );


  if(step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
          <Heading title="Where is your place?" subtitle="Help guests find you!" />

        {/* Select Input */}
       <CountrySelect
          onChange={(location) => setCustomValue('location', location)}
          value={location}
       />

       {/* Map */}
       <Map center={location?.latlng} />

      </div>
    ) 
  }



  return (
    <Modal
      title="Airbnb your home"
      isOpen={isOpenRentModal}
      body={bodyContent}
      onClose={() => {
        dispatch(onCloseRentModal());
      }}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      // If step = 0 dont show button
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
