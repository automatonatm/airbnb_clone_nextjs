'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';

import { signOut } from 'next-auth/react';

import MenuItem from './MenuItem';

import { onOpenLoginModal, onOpenRegisterModal, onOpenRentModal } from '@/app/store/features/modalSlice';

import { useAppDispatch } from '@/app/store/hooks';
import { SafeUser } from '@/app/types';

import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter()

  const toggleOpen = useCallback(() => {
    
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return dispatch(onOpenLoginModal())
    }

    //Open Rent modal

    dispatch(onOpenRentModal())

    
  }, [currentUser, dispatch]);



  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={onRent}
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            <>
              {currentUser ? (
                <>
                  <MenuItem onClick={() => router.push('/trips')} label="My trips" />
                  <MenuItem onClick={() => {}} label="My favorite" />
                  <MenuItem onClick={() => router.push('/reservations')} label="My reservations" />
                  <MenuItem onClick={() => {}} label="My propertions" />
                  <MenuItem onClick={() => {dispatch(onOpenRentModal())}} label="Airbnb my home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => dispatch(onOpenLoginModal())}
                    label="Login"
                  />
                  <MenuItem
                    onClick={() => dispatch(onOpenRegisterModal())}
                    label="Sign up"
                  />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
