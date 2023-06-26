'use client';

import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';

import Modal from './Modal';
import Heading from '../Heading';


import { onCloseRegisterModal, onOpenLoginModal } from '@/app/store/features/modalSlice';



import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';

import { signIn } from 'next-auth/react';

const RegisterModal = () => {

 

  const [loading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const {isOpenRegisterModal} = useAppSelector((state) => state.modalReducer);

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
      dispatch(onCloseRegisterModal())  
      dispatch(onOpenLoginModal())
    })
    .catch((error) => {
      toast.error("Something went wrong", {id: notification})
    })
    .finally(() => {
      setIsLoading(false)
    })
    ;

  };

   const toggle = useCallback(() => {
     dispatch(onCloseRegisterModal());
     dispatch(onOpenLoginModal());
   }, [dispatch]);

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
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row justify-center gap-2 text-center">
          <div>Already have an account?</div>
          <div
            className="cursor-pointer text-neutral-500 hover:underline"
            onClick={toggle}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  

  return (
    <Modal
      disabled={loading}
      isOpen={isOpenRegisterModal}
      title="Register"
      onClose={() => dispatch(onCloseRegisterModal())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
};

export default RegisterModal;
