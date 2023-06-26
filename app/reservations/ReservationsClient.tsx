'use client';

import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeReservation, SafeUser } from '../types';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import ListingCard from '../components/listings/ListingCard';

interface ReservationsClientProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  currentUser,
  reservations,
}) => {

     const router = useRouter();

     const [deletingId, setDeletingId] = useState('');

     const onCancel = useCallback(
       (id: string) => {

         setDeletingId(id);

         const notification = toast.loading('Cancelling Reservation...');

         axios
           .delete(`/api/reservations/${id}`)
           .then(() => {
             toast.success(`Reservation canceled`, { id: notification });
             router.refresh();
           })
           .catch((err: any) => {
             console.log(err);
             toast.error(
               `${
                 err.response && err.response.data.message
                   ? err.response.data.message
                   : err.message
               }`,
               { id: notification }
             );
           })
           .finally(() => {
             setDeletingId('');
           });
       },
       [router]
     );


  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div
        className="
       grid-10
        xlg:grid-cols-5
        mt-10
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        2xl:grid-cols-6
    "
      >
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            reservation={reservation}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
