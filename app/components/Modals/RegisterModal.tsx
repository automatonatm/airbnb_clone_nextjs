'use client';

import axios from 'axios';

import { AiFillGithub } from 'react-icons/ai';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { FcGoogle } from 'react-icons/fc';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useState } from 'react';
import Modal from './Modal';

const RegisterModal = () => {
  const registerModal = useRegisterModal();

  const [loading, setIsLoading] = useState(false);

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
      registerModal.onClose();
    })
    .catch((error) => {console.log(error)})
    .finally(() => {
      setIsLoading(false)
    })
    ;

  };

  return (
    <Modal
      disabled={loading}
      isOpen={registerModal.isOpen}
      title="Register"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
