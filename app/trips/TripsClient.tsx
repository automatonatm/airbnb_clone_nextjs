'use client'

import { Reservation } from "@prisma/client"
import { SafeReservation, SafeUser } from "../types"
import Container from "../components/Container"
import Heading from "../components/Heading"

import {useRouter} from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import ListingCard from "../components/listings/ListingCard"

interface TripsClientProps {
    currentUser: SafeUser | null,
    reservations: SafeReservation[]
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {

    const router = useRouter()

    const [deletingId, setDeletingId] = useState("")

    const onCancel = useCallback((id: string) => {

        setDeletingId(id)

        const notification = toast.loading('Cancelling Reservation...');

        axios.delete(`/api/reservations/${id}`)
        .then(() => {

            toast.success(`Reservation canceled`, { id: notification });
            router.refresh()

        })
        .catch((err: any) => {
        
          
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
            setDeletingId("")
        })

    }, [router])

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div
        className="
        grid
        grid-10
        mt-10
        grid-cols-1
        gap-8
        sm:grid-cols-2
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
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
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default TripsClient