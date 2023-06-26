import React from 'react'
import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import EmptyState from '../components/EmptyState';
import ClientOnly from '../components/ClientOnly';
import { FavoritesClient } from './FavoritesClient';



const FavoritePages = async  () => {

     const currentUser = await getCurrentUser();

     const listings = await getFavoriteListings()
     
    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState
            title="No favorite listing Founds"
            subtitle="Looks like you have no favorite listings"
          />
        </ClientOnly>
      );
    }

  return (
    <ClientOnly>
        <FavoritesClient
         listings={listings}
         currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default FavoritePages;