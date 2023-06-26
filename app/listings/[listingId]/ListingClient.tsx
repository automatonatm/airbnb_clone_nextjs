'use client';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import { categories } from '@/app/components/navbar/Categories';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ListingInfo from '@/app/components/listings/ListingInfo';

import { onOpenLoginModal } from '@/app/store/features/modalSlice';
import { useAppDispatch } from '@/app/store/hooks';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import {toast} from 'react-hot-toast';

import { ListingReservation } from '@/app/components/listings/ListingReservation';
import { Range } from 'react-date-range';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeReservation[] 
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {


  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)


  useEffect(() => {

    //Check if date Range(start and end) exist
    if(dateRange.startDate && dateRange.endDate) {

      //Get the differences in the days
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      //if difference existing recalculate the total price
      if(dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      }else { //else set total price to original listing price
        setTotalPrice(listing.price)
      }

    }


  },[dateRange.endDate, dateRange.startDate, listing.price])

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    // Loop resevations and get the dates and assign it to dates array
    reservations.forEach((reservation) => {
      //Get all the dates within a given interval
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);


  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return dispatch(onOpenLoginModal());
    }

    setIsLoading(true);

    const notification = toast.loading('Creating reservation...');

    axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success(`Listing reserved`, { id: notification });
        setDateRange(initialDateRange);
        //redirect to /trip
        router.push("/trips");
      })
      .catch(() => {
        toast.error(`Something went wrong`, { id: notification });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    dispatch,
    listing.id,
    router,
    totalPrice,
  ]);




  //Get all the categories and amd match it with this listing category
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div
            className="
                  md:gap-10
                  mt-6
                  grid
                  grid-cols-1
                  md:grid-cols-7
                 "
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.descrption}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                onChangeDate={(value) => setDateRange(value)}
                disabledDates={disabledDates}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
