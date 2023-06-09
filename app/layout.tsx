import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

import { ReduxProviders } from '@/app/providers/ReduxProvider';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import RentModal from './components/Modals/RentModal';

import { Analytics } from '@vercel/analytics/react';
import SearchModal from './components/Modals/SearchModal';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ReduxProviders>
          <ClientOnly>
            <ToasterProvider />
            <SearchModal />
            <RentModal />
            <RegisterModal />
            <LoginModal />
            <Navbar currentUser={currentUser} />
          </ClientOnly>
          <div className="pb-20 pt-28">{children}</div>
        </ReduxProviders>
        {process.env.NODE_ENV !== 'development' && <Analytics />}
      </body>
    </html>
  );
}
