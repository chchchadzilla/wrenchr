import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wrenchr - Unbiased Auto Repair Finder',
  description: 'Instant live pricing matrix, rating analysis, and verified shop locator across Yelp, Google Reviews, BBB, and CARB registries.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-zinc-100 antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
