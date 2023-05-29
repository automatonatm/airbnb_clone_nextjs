'use client';

import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';

import { useState } from 'react';

import Modal from './Modal';
import Heading from '../Heading';

import { onClose } from '@/app/store/features/registerSlice';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Input from '../inputs/Input';

const RegisterModal = () => {

 

  const [loading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const {isOpen} = useAppSelector((state) => state.registerReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {


    setIsLoading(true);

    axios.post('/api/register', data).then(() => {
      dispatch(onClose())
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      setIsLoading(false)
    })
    ;

  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        register={register}
        id="email"
        disabled={loading}
        required
        errors={errors}
        label="Email"
        
      />
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={isOpen}
      title="Register"
      onClose={() => dispatch(onClose())}
      onSubmit={() => handleSubmit(onSubmit)}
      body={bodyContent}
      actionLabel="Continue"
    />
  );
};

export default RegisterModal;
