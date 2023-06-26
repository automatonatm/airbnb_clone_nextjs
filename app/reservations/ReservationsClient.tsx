'use client'

import { SafeReservation, SafeUser } from "../types";

interface ReservationsClientProps {
  currentUser: SafeUser | null;
  reservations: SafeReservation[];
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
    currentUser,
    reservations
}) => {
  return (
    <div>ReservationsClient</div>
  )
}

export default ReservationsClient