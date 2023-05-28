import ClientOnly from './components/ClientOnly';
import Modal from './components/Modals/Modal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';

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
        <ClientOnly>
          <Modal isOpen title="Login Modal"/>
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
