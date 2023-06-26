import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import  getReservations  from '@/app/actions/getReservations';
import getCurrentUser from '@/app/actions/getCurrentUser';
import TripsClient from './PropertiesClient';
import getListings from '../actions/getListings';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listing found"
          subtitle="Looks like you have no listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient      
        listings={listings}
        currentUser={currentUser}
      />   
    </ClientOnly>
  );
};

export default PropertiesPage;
