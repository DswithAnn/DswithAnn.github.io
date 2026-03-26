import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { HomeIcon, AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <AlertCircleIcon className="w-16 h-16 mx-auto mb-6 text-primary-500" />
          <h1 className="text-6xl font-heading font-bold mb-4 gradient-text">404</h1>
          <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
            Page not found
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 btn-primary"
          >
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
