import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/Modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

import { ReduxProviders } from '@/app/providers/ReduxProvider';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';

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
        <ReduxProviders>
          <ClientOnly>
            <ToasterProvider/>
            <RegisterModal />
            <LoginModal />
            <Navbar />
          </ClientOnly>
          {children}
        </ReduxProviders>
      </body>
    </html>
  );
}
