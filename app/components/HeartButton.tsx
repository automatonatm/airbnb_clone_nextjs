'use client'

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { SafeUser } from "../types";

import useFavorite from '../hooks/useFavorite';

interface HeartButtonProps {
  currentUser?: SafeUser | null
  listingId: string
}

const HeartButton: React.FC<HeartButtonProps> = ({currentUser, listingId}) => {

  const { toggleFavorite, hasFavorited } = useFavorite({listingId, currentUser});

    return (
      <div
        onClick={toggleFavorite}
        className="relative cursor-pointer transition hover:opacity-80"
      >
        <AiOutlineHeart
          size={28}
          className="absolute -right-[2px] -top-[2px] fill-white"
        />

        <AiFillHeart
          size={24}
          className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
        />
      </div>
    );
}
 
export default HeartButton;