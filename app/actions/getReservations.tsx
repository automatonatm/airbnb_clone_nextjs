import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      endDate: reservation.endDate.toISOString(),
      updatedAt: reservation.updatedAt.toISOString(),
    //   user: {
    //     ...reservation.user,
    //     createdAt: reservation.user.createdAt.toISOString(),
    //     updatedAt: reservation.user.updatedAt.toISOString(),
    //     emailVerified: reservation.user.emailVerified?.toISOString() || null,
    //   },
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        updatedAt: reservation.listing.updatedAt.toISOString(),
      },
    }));
    

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
