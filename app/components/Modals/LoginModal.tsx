'use client';

import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';

import { signIn } from 'next-auth/react';

import Modal from './Modal';
import Heading from '../Heading';




import {
  onCloseLoginModal,
  onOpenRegisterModal,
} from '@/app/store/features/modalSlice';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const [loading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const { isOpenLoginModal } = useAppSelector((state) => state.modalReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    
    const notification = toast.loading('Login...');

    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success(`You're logged in`, { id: notification });
          dispatch(onCloseLoginModal());
          router.refresh();
        }


        if (callback?.error) {
          toast.error(callback.error, { id: notification });
        }

      }).catch((error) => {
         toast.error("An unknown error has occured", { id: notification });
      })
      
  };


  const toggle = useCallback(() => {
      dispatch(onCloseLoginModal())
      dispatch(onOpenRegisterModal())
  }, [dispatch])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome  back" subtitle="Login to account!" />
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
          <div>First time using airbnb?</div>
          <div
            className="cursor-pointer text-neutral-500 hover:underline"
            onClick={toggle}
          >
            Register
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={loading}
      isOpen={isOpenLoginModal}
      title="Login"
      onClose={() => dispatch(onCloseLoginModal())}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
    />
  );
};

export default LoginModal;
