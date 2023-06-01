'use client';
import { User } from '@prisma/client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';

import {signOut} from "next-auth/react"

import MenuItem from './MenuItem';

import { onOpen } from '@/app/store/features/registerSlice';

import { onOpen as onOpenLogin } from '@/app/store/features/loginSlice';

import { useAppDispatch } from '@/app/store/hooks';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={() => {}}
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
                  <MenuItem onClick={() => {}} label="My trips" />
                  <MenuItem onClick={() => {}} label="My favorite" />
                  <MenuItem onClick={() => {}} label="My reservations" />
                  <MenuItem onClick={() => {}} label="My propertions" />
                  <MenuItem onClick={() => {}} label="Airbnb my home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem
                    onClick={() => dispatch(onOpenLogin())}
                    label="Login"
                  />
                  <MenuItem
                    onClick={() => dispatch(onOpen())}
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
