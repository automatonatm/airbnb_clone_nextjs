import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { SafeUser } from '../types';

import { onOpenLoginModal } from '../store/features/modalSlice';
import { useDispatch } from 'react-redux';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavoriteHook = ({ listingId, currentUser }: IUseFavorite) => {

  const router = useRouter();
  const dispatch = useDispatch();


   //Check if user has favorited this
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);



  //Add or remove from favorite
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return dispatch(onOpenLoginModal());
      }

      try {

        let request;

        //Delete the favorite
        if(hasFavorited) {
            request = () => axios.delete(`/api/favorites/${listingId}`)
        }else {

            //Add to favorite
            request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request()
        toast.success('Succes')
        router.refresh()
      } catch (error: any) {
        toast.error("Something went wrong.")
      }
    },
    [currentUser, dispatch, hasFavorited, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite
  }

};


export default useFavoriteHook