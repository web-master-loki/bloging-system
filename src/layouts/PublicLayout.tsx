
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useOutlet } from 'react-router-dom';

const PublicLayout = () => {
  const children = useOutlet();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
