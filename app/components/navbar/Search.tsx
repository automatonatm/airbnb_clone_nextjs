'use client';

import {BiSearch} from 'react-icons/bi'

import { onOpenSearchModal } from '@/app/store/features/modalSlice';

import { useAppDispatch } from '@/app/store/hooks';


import { useSearchParams } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';
import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';


const Search = () => {

  const dispatch = useAppDispatch();

  const params = useSearchParams()

  const {getByValue} = useCountries()


  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')



  //
  const locationLabel = useMemo(() => {
    if(locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return "Anywhere"
  },
   [getByValue, locationValue])

   const durationLabel = useMemo(() => {
    if(startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string);

      let diff = differenceInDays(end, start)

      if(diff === 0) {
        diff = 1
      }

      return `${diff} Days`
    }

    return "Any week"
   }, [endDate, startDate])


   const guestLabel = useMemo(() => {
    if(guestCount) {
      return `${guestCount} Guests`
    }

    return "Add Guests"
   }, [guestCount])


  return (
    <div
      onClick={() => dispatch(onOpenSearchModal())}
     className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto">
      <div
        className="
      flex
      flex-row
      items-center
      justify-between
      "
      >
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>

        <div className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
          {durationLabel}
        </div>

        <div className="flex flex-row  items-center gap-3 pl-6 pr-2 text-sm text-gray-600">

          <div className="hidden sm:block">{guestLabel}</div>

          <div className="p-2 bg-rose-500 rounded-full text-white">
                <BiSearch size={18}/>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Search;
