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
import { toast } from 'react-hot-toast';
import Button from '../Button';

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
     
     const notification = toast.loading('Creating account...');
 

    setIsLoading(true);

    axios.post('/api/register', data).then(() => {
      toast.success('Account created', { id: notification });
      dispatch(onClose())
    })
    .catch((error) => {
      toast.error("Something went wrong", {id: notification})
    })
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

      <Input
        register={register}
        id="name"
        disabled={loading}
        required
        errors={errors}
        label="Name"
      />

      <Input
        register={register}
        id="password"
        disabled={loading}
        required
        type="password"
        errors={errors}
        label="Password"
      />
    </div>
  );

  const footerContent = (
    <div className="mt-4 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center gap-2 text-center">
          <div>Already have an account?</div>
          <div className="text-neutral-500 cursor-pointer hover:underline" onClick={() => dispatch(onClose())}>Login</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={isOpen}
      title="Register"
      onClose={() => dispatch(onClose())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
};

export default RegisterModal;
