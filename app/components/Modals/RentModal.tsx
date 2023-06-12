'use client';

import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import Modal from './Modal';
import { onCloseRentModal } from '@/app/store/features/modalSlice';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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

  const [isLoading, setIsLoading] = useState(false);

  const { isOpenRentModal } = useAppSelector((state) => state.modalReducer);

  const dispatch = useAppDispatch();

  const router = useRouter();

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
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    [location]
  );

  //Change or set the value of a form field
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //If step is not the PTICE STEP run the next function on button click
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    const notification = toast.loading('Login...');


    //submit data
    axios
      .post('/api/listings', data)
      .then((callback: any) => {

       
          toast.success(`Listing created`, { id: notification });
          router.refresh();
          reset()
          setStep(STEPS.CATEGORY);
          dispatch(onCloseRentModal());
       
      })
      .catch((error) => {
        toast.error('An unknown error has occured', { id: notification });
      })
      .finally(() => {
         setIsLoading(false);
      })
      ;
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
              onClick={(category) => {
                setCustomValue('category', category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place?"
          subtitle="Help guests find you!"
        />

        {/* Select Input */}
        <CountrySelect
          onChange={(location) => setCustomValue('location', location)}
          value={location}
        />

        {/* Map */}
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        {/* Counter */}
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />

        <hr />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />

        <hr />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms to you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you decribe your place"
          subtitle="Short are sweet works best"
        />

        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <hr />

        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set the price"
          subtitle="How much you charge per night?"
        />

        <Input
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          formatPrice
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      isOpen={isOpenRentModal}
      body={bodyContent}
      onClose={() => {
        dispatch(onCloseRentModal());
      }}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      disabled={isLoading}
      // If step = 0 dont show button
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
