'use client';

import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { SafeUser, SafeReservation, SafeListing } from '../types';

interface FavoritesClientProps {
  currentUser: SafeUser | null;
  listings: SafeListing[];
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="List of place your favorited" />
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
