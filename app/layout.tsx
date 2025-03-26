import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['cyrillic'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Store',
  description: 'Store Practice',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
