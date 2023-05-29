import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

import { Providers } from '@/app/store/provider';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
        <ClientOnly>
         <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
        </Providers>
      </body>
    </html>
  );
}
