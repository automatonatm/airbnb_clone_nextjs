import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';



export async function POST(req: Request) {

    const body = await req.json();

    const { totalPrice, startDate, endDate, listingId } = body;

     const user = await getCurrentUser();

     if (!user) {
       return NextResponse.error();
     }

      Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
          return NextResponse.error();
        }
      });

    

      const listingAndReservation = await prisma.listing.update({
        where: {
          id: listingId,
        },
        data: {
          reservations: {
            create: {
              userId: user.id,
              totalPrice,
              startDate,
              endDate,
            }
          }
        },
      });


  return NextResponse.json(listingAndReservation);


}


