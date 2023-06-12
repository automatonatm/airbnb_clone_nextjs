import bycrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(req: Request) {
  const body = await req.json();

  const { category, location, guestCount, roomCount, bathroomCount, imageSrc, price, title, description } =
    body;

    const user = await getCurrentUser()

    if(!user) {
        return NextResponse.error()
    }

    Object.keys(body).forEach((value: any) => {
        if(!body[value]) {
            return NextResponse.error()
        }
    })

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      descrption: description,
      userId: user?.id!!
    },
  });

  return NextResponse.json(listing);
}
