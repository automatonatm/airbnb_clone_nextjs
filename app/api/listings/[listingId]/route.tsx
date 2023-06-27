import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
    listingId: string
}

export async function DELETE(req: Request, {params} : {params: IParams}) {


    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.error();
    }

    const {listingId} = params



     if (!listingId || typeof listingId !== 'string') {
       throw new Error('Invalid ID');
     }


     const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: user.id
        }
     })



     return NextResponse.json(listing)


}





