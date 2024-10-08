import { CssBaseline } from '@mui/material';
import Container from '@mui/material/Container';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CssBaseline />
          <Container maxWidth="md" sx={{ marginY: 2 }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
