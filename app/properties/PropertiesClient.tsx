'use client'

import { Reservation } from "@prisma/client"
import { SafeListing, SafeReservation, SafeUser } from "../types"
import Container from "../components/Container"
import Heading from "../components/Heading"

import {useRouter} from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface PropertiesClientProps {
  currentUser: SafeUser | null;
  listings: SafeListing[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      const notification = toast.loading('Deleting listing...');

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success(`Listing Deleted`, { id: notification });
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
      <Heading
        title="Properties"
        subtitle="List of our properties"
      />

      <div
        className="
        grid-10
        mt-10
        grid
        grid-cols-1
        gap-8
        sm:grid-cols-2
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
    "
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete listing"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;