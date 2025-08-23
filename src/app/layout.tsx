import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/layout/layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Run',
  description: 'Modern dashboard application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} scrollbar-hide`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}